import { v4 as uuidv4 } from 'uuid';
import {zfbLogin, wxlogin} from "@/api/login";
import {setToken} from "@/utils/auth";
import {Toast} from "vant";
import {uploadFid,reportLocation} from "@/api";
import {configureWxJsSdk} from "@/utils/wx-sdk";
import wx from "weixin-js-sdk"; // 引入 uuid 库生成随机 state
export function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== "undefined") {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}
//微信登录
export function getWxLogin(type){
  try {
    return new Promise((resolve, reject) => {
      let url =window.location.href
      console.log(url);
      //判断链接上是否有code
      if(url.indexOf('code=') === -1){
        //没有code就重定向wx中去获取
        const appId = process.env.VUE_APP_WX_ID; // 从环境变量中获取 appId
        const redirectUri = encodeURIComponent(url);
        const scope =  encodeURIComponent(type);
        const state =  encodeURIComponent(getState()); // 生成随机 state
        const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        console.log(redirectUri);
        window.location.href = authUrl;
       resolve()
      } else{
        let code = url.split('code=')[1].split('&')[0];
        if(type === 'snsapi_base'){
          let fidId = sessionStorage.getItem('fid')
          wxlogin({code :code,parent_user_id:fidId || 0}).then(res =>{
            if(res?.code === 200){
              setToken(res.data.token)
              goFidId()
              window.location.href =url.split("?")[0]
              resolve()
            }
          }).catch(err =>{
            reject()
          })
        }else{
          resolve(code)
        }
      }
    });
  }catch (error){
    console.error('Error in getWxLogin:', error);
  }
}
//支付宝登录
export function getZfbLogin(){
  try {
    return new Promise((resolve, reject) => {
      let url = window.location.href
      console.log(url);

      //判断链接上是否有code
      if(url.indexOf('auth_code=') === -1){
        //没有code就重定向wx中去获取
        const appId = process.env.VUE_APP_ZFB_ID; // 从环境变量中获取 appId
        const redirectUri = encodeURIComponent(url);
        const scope =  encodeURIComponent('auth_base');
        const state =  encodeURIComponent(getState()); // 生成随机 state
        const authUrl =
            `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${appId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`
        console.log(redirectUri);
        window.location.href = authUrl;
       resolve()
      } else{
        let code = url.split('auth_code=')[1].split('&')[0];
        let fidId = sessionStorage.getItem('fid')
        zfbLogin({auth_code :code,parent_user_id:fidId || 0}).then(res =>{
          if(res?.code === 200){
            setToken(res.data.token)
            window.location.href =url.split("?")[0]
            resolve()
          }
        }).catch(err =>{
          reject()
        })
      }
    });
  }catch (error){
    console.error('Error in getWxLogin:', error);
  }
}

export function getState() {
  return uuidv4(); // 生成随机 state
}

//获取当前定位
export function getUserLocation() {
  console.log("进来",sessionStorage.getItem("newCity"));
  if(sessionStorage.getItem("newCity")){
    return;
  }
  configureWxJsSdk().then(res =>{
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        console.log(res);
        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        let data={
          lat:latitude,
          lng:longitude
        }
        reportLocation(data).then(res =>{
          sessionStorage.setItem("newCity",JSON.stringify(data))
        })
      }
    })
  })

}
export function getLatLng(){
  try {
    return new Promise((resolve, reject) => {
      if(!sessionStorage.getItem('newCity')){
        let latlng=sessionStorage.getItem('newCity')
        let times=null
        times = setInterval(()=>{
          latlng=sessionStorage.getItem('newCity')
          if(latlng){
            if(times){
              clearInterval(times)
              times=null
            }
            resolve(JSON.parse(sessionStorage.getItem('newCity')))
          }
        },500)
      }else{
        resolve(JSON.parse(sessionStorage.getItem('newCity')))
      }
    })
  }catch (r){

  }
}
//上传上级id
export function goFidId(){
  let fidId = sessionStorage.getItem('fid')
  if(fidId){
    uploadFid({parent_user_id:fidId}).then(res =>{
     // Toast.success('上传成功')
    }).catch(err =>{
      //Toast.fail('上传失败')
    })
  }

}