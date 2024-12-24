import axios from "axios";
import qs from "qs";
import {Dialog, Toast} from "vant";
import {getToken, removeToken, setToken} from "@/utils/auth";
import {getWxLogin, getZfbLogin} from "@/utils";
import errorCode from "@/utils/errorCode";
var isFrist=false
// 重复请求/失败重连
// TODO: 抽离功能函数 目标是可拔插 缺少请求缓存功能

// 创建 Axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
});

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 防重复提交功能
const pending = new Map();
let lastRequestTimestamp = null; // 上次请求时间戳
const THROTTLE_INTERVAL = 100; // 重复提交的间隔时间(ms)
let requestKey;

function generateReqKey(config, i) {
  const { method, url, params = {}, data = {} } = { ...config };
    let d = typeof data === "string" ? JSON.parse(data) : qs.stringify(data);
  return [method, url, qs.stringify(params), i ? qs.stringify(d) : d].join("&");
}

function removePendingReq(config = {}, msg) {
  requestKey = generateReqKey(config, true);

  if (config.__retryCount) {
    return pending.delete(requestKey);
  }

  if (pending.has(requestKey)) {
    const cancelToken = pending.get(requestKey);
    cancelToken(requestKey);
    pending.delete(requestKey);
  }
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const { method, header = {}, loading = true } = config;
    // console.log("当前接口重连次数", config.__retryCount);
    // 是否需要设置 token
    const isToken = header.isToken === false;
      if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      isWxZfb()
    //
    if (method === "post" || method === "put") {
      // 移除任务
      removePendingReq(config, "请求移除");

      requestKey = generateReqKey(config);
      const currentTimestamp = new Date().getTime();
      // 如果上次请求的时间戳距离当前时间不到THROTTLE_INTERVAL(默认1秒)，则取消该请求
        if (lastRequestTimestamp && currentTimestamp - lastRequestTimestamp < THROTTLE_INTERVAL && !header.allowRepeat) {
            const message = "请勿频繁操作！";
            return Promise.reject(new Error(message));
        }
      lastRequestTimestamp = currentTimestamp;

      config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
          if (!pending.has(requestKey)) {
            pending.set(requestKey, cancel);
          }
        });
    }

    if (loading) {
      // 显示加载动画
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, // 不自动关闭
      });
    }
    // console.log("请求拦截return config", config);
    return config;
  },
  (error) => {
    Toast.fail(error);
    // console.log("请求拦截错误", error);
    Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  ({ request, data, config }) => {
    // 隐藏加载动画
    Toast.clear();

    // 二进制数据则直接返回
    let responseType = ["blob", "arraybuffer"];
    if (responseType.includes(request.responseType)) {
      return data;
    }

    // 移除任务
    removePendingReq(config, "响应移除");

    // 未设置状态码则默认成功状态
    const code = data.code || 200;

    // 特殊状态码处理
    const msg = data.msg || errorCode["default"];
      if (errorCode[code] ) {
        if (code === 401 ){
            //return Promise.reject(error)
            return isWxZfb(code)
        }
      Toast.fail(errorCode[code]);
      return Promise.reject(errorCode[code]);
    }
    if(code === 500 &&  data?.msg === "请求参数缺token"){
          isWxZfb(code)
      return Promise.reject(msg);
    }
    if (code !== 200) {
      Toast.fail(msg);
      return Promise.reject(msg);
    }


    return Promise.resolve(data);
  },
  (error) => {
    const { message = "", config } = error;

    let msg = message;
    removePendingReq("响应错误移除", config);

    // console.log("响应拦截错误", error);

    // 网络错误不重连
    if (message === "Network Error") {
      Toast.fail("网络错误");
      return Promise.reject(error);
    }

    // 接口404错误不重连
    if (message.includes("404")) {
      Toast.fail(errorCode["404"]);
      return Promise.reject(error);
    }
      if (message.includes("timeout")) msg = "系统接口请求超时";

    Toast.fail(msg);

    // 失败重试功能
    if (!config || !config.retry) {
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
      // console.log(`总次数:${config.__retryCount},重连次数:${config.retry}`);
      return Promise.reject(error);
    }
    Toast.clear();
    config.__retryCount++;
    // 返回一个 Promise，在延迟后进行重试
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(request(config));
      }, 1000);
    });

    // const backOff = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, config.retryDelay || 2000);
    // });

    // return backOff.then(() => {
    //   console.log("准备重连接口", config);
    //   request(config);
    // });
  }
);
export function isPaymentApp() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('micromessenger')) {
        return 'WeChat';
    } else if (userAgent.includes('alipayclient')) {
        return 'Alipay';
    }
    return false;
}

//判断是支付打开还是微信打开还是浏览器打开
export function isWxZfb(code){
    let isWeChatBrowser =isPaymentApp()
    //判断是否是在支付里打开

    if(!isFrist && ((!code && !getToken()) || code)){
        //只有第一次且没有token且在微信端打开
        if( isWeChatBrowser === 'WeChat'){ // 微信
            isFrist=true
            getWxLogin('snsapi_base')
            return  true
        }else if(  isWeChatBrowser === 'Alipay'){ //支付宝
            isFrist=true
            getZfbLogin()
            return  true
        }else{
            if(code){
                isFrist=true
                Dialog.alert({
                    title: '提示',
                    message: getToken()?errorCode[code]:'你还没登录，请登录',
                    showCancelButton:true,
                }).then(() => {
                    console.log(window.location);
                    removeToken()
                    window.vm.$router.push({ path: '/login' });
                    isFrist=false
                }).catch(er =>{
                    // window.location.href= '/web/'
                    //   Vue.$router.replace('/web/login')
                    window.vm.$router.push({ path: '/' });
                    isFrist=false
                });
                return  true
            }
        }
    }

    return false
}

export default request;
