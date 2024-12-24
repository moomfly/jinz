# vant2-mobile-cli

### 介绍
基于vue2+vant3搭建的mobile脚手架

### 技术栈
+ [Vue.js](https://v2.cn.vuejs.org/): 前端框架
+ [Vue Router](https://v3.router.vuejs.org/zh/)：路由管理
+ [Vant2](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/)：UI 组件库
+ [Vuex](https://v3.vuex.vuejs.org/zh/)：状态管理
+ [Vuex Persistedstate](https://www.npmjs.com/package/vuex-persistedstate): 状态管理持久化工具
+ [Axios](https://axios-http.com/)：HTTP 客户端
+ [ESLint](https://eslint.org/docs/latest/)：代码风格检查工具
+ [Less](http://lesscss.org/)：预编译动态样式语言

### 项目结构
目录结构简述，主要包括：
```
    ├── dist/                   // 构建配置文件夹
    ├── public/                 // 静态资源文件夹
    ├── src/                    // 源代码文件夹
    │   ├── assets/             // 图片、样式等资源文件
    │   ├── components/         // 可复用的 Vue 组件
    │   ├── plugins/            // 插件配置
    │   ├── router/             // Vue Router 的配置文件
    │   ├── store/              // Vuex 的配置文件
    │   ├── utils/              // 工具函数
    │   ├── views/              // 页面级组件
    │   ├── App.vue             // 根组件
    │   └── main.js             // 入口文件
    ├── .env.development        // 环境配置文件（仅使用开发环境）
    ├── .env.production         // 环境配置文件（仅使用生产环境）
    ├── .env.stage              // 环境配置文件（仅使用测试环境）
    ├── .eslintrc.js            // ESLint 配置文件
    ├── .gitignore              // Git 忽略文件配置
    ├── .postcssrc.js           // postcss配置文件（仅在编译时运行）
    ├── .babel.config.js        // babel配置文件（仅使用开发环境）
    ├── package-lock.json       // npm 自动记录的依赖项锁定文件
    └── package.json            // 项目信息描述文件
    ├── README.en.md            // 项目多语言文档信息
    ├── README.md               // 项目文档信息
    ├── vue.config.js           // 配置文件
```


### 使用说明

```
1.  npm clone https://gitee.com/menchw/vue2-mobile-cli.git
2.  cd vue2-mobile-cli
3.  npm install
4.  npm run dev
```

### 安装依赖
```
npm install
```
### 启动本地服务器
```
npm run dev
```
### 打包构建
```
npm run build:stage
npm run build:prod
```

### Vant UI
#### 组件注册
项目中使用[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)插件将 import 语句自动转换为按需加载的形式，从而减小打包后的文件体积。
#### @/plugins/vant.js
```
import {
  Tabbar,
  TabbarItem,
  Search,
} from "vant";

let vantPlugins = [
  Tabbar,
  TabbarItem,
  Search,
];
// 批量将vant组件注入vue中
export default (Vue) => {
  vantPlugins.forEach((plugin) => {
    Vue.use(plugin);
  });
};
```

#### 移动端适配方案
本项目遵循vant中提供的[Viewport 布局](https://vant-contrib.gitee.io/vant/v2/#/zh-CN/advanced-usage#liu-lan-qi-gua-pei)用于将 px 单位转化为 vw/vh 单位方案。默认同vant设计稿大小375一致。如果需要使用其他大小的设计稿可自行修改。使用 `ignore` 开头的类名都不会进行转行。
配置参考：.postcssrc.js
```
const path = require("path");

const postcssPxToViewport = require("postcss-px-to-viewport");

module.exports = ({ file }) => {
  const viewportWidth = file.dirname.includes(path.join("node_modules", "vant")) ? 375 : 375; // 设计稿的视口宽度
  return {
    plugins: [
      postcssPxToViewport({
        unitToConvert: "px", // 需要转换的单位，默认为"px"
        viewportWidth,
        // viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度
        propList: ["*"], // 能转化为vw的属性列表
        viewportUnit: "vw", // 希望使用的视口单位
        fontViewportUnit: "vw", // 字体使用的视口单位
        selectorBlackList: ["ignore"], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, // 是否直接更换属性值，而不添加备用属性
        // exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      }),
    ],
  };
};

```

### Vue Router
#### 路由配置
项目路由区分tabBar页面和路由页面组件同时也配置了404页面
其中tabBar路由页面组件使用了[命名视图规则](https://v3.router.vuejs.org/zh/guide/essentials/named-views.html#%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE)，tabBarRoutes同时也是`@/components/TabBar`组件的渲染数据源。

```
export const tabBarRoutes = [
  {
    path: "/",
    components: {
      default: () => import("@/views/home"),
      TabBar,
    },
    meta: {
      title: "首页",
      icon: "wap-home",
    },
  },
];

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
  },
  { path: "*", redirect: "404" },
];

```

#### 路由守卫
permission.js
通过判断token是否存在进行放行，不存在token则判断白名单`whiteList`是否存在当前路由地址反之跳转到登录页面。
```
import router from "./router";
import { getToken } from "@/utils/auth";

const whiteList = ["/login", "/404", "/", "/institution", "/task", "/user"];

router.beforeEach((to, from, next) => {
  // has token
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
    }
    next();
  } else {
    // no token or no white list or white list doesn't contain current path
    // a whitelist is a path that can be accessed without logging in. For example: ['/login', '/404']
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
```

### Vuex

使用vuex进行状态化管理，通过入口文件将模块引入并放入`modules`中，模块设置命名空间`namespaced`为`true`形成模块化。
同时`getter`为单一模块放置如
#### vuex-persistedstate
使用该插件进行状态持久化管理。

```
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
Vue.use(Vuex);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // './user.js' => 'user'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState({
      key: "TOKEN",
      storage: window.localStorage,
      reducer: (state) => state.user.token,
    }),
  ],
});

export default store;
```
user.js
```
import { login } from "@/api/login";
import { setToken } from "@/utils/auth";
const user = {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((res) => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
  },
};

export default user;

```
### Axios
使用axios作为本项目的HTTP 客户端管理工具。
包含了以上功能
- 实例化baseURL和timeout
- 请求头部统一token
- 请求拦截处理
- 响应拦截处理
- 参数序列化
- 对于post和put方法请求进行重复请求判断
- 统一errorCode码错误提示和code码自定义处理
- 阻止请求重复(1000ms)
- 失败重连(待优化)

TODO:
- 阻止请求重复目前采用的是直接拦截而不是发送出去在取消(方案待定)
- 失败重连目前采用的是定时器直接重连,api封装文件要多一步不然页面调用会拿不到数据(方案待定)
- ~~<font color="red">缺少接口请求响应缓存功能</font>~~
- 抽离上诉功能方法做到可拔插

```
// @/utils/request.js

import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
import { getToken } from "@/utils/auth";
import errorCode from "@/utils/errorCode";
// 重复请求/失败重连
// TODO: 抽离功能函数 目标是可拔插 缺少请求缓存功能

// 创建 Axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000,
});

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

// 防重复提交功能
const pending = new Map();
let lastRequestTimestamp = null; // 上次请求时间戳
const THROTTLE_INTERVAL = 1000; // 重复提交的间隔时间(ms)
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
    const { method, headers = {}, loading = true } = config;
    // console.log("当前接口重连次数", config.__retryCount);
    // 是否需要设置 token
    const isToken = headers.isToken === false;
    if (getToken() && !isToken) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    //
    if (method === "post" || method === "put") {
      // 移除任务
      removePendingReq(config, "请求移除");

      requestKey = generateReqKey(config);
      const currentTimestamp = new Date().getTime();
      // 如果上次请求的时间戳距离当前时间不到THROTTLE_INTERVAL(默认1秒)，则取消该请求

      if (
        lastRequestTimestamp &&
        currentTimestamp - lastRequestTimestamp < THROTTLE_INTERVAL
      ) {
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
    if (errorCode[code]) {
      Toast.fail(errorCode[code]);
      return Promise.reject(errorCode[code]);
    }

    if (code === 500) {
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

    config.__retryCount++;
    // 返回一个 Promise，在延迟后进行重试
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(request(config));
      }, 2000);
    });
  }
);

export default request;

```
#### API封装
```
import request from "@/utils/request.js";

export function getTestApi() {
  return request({
    url: "/test",
    method: "get",
    header:{},
    retry: 3, // 设置最大重试次数
  }).then((res) => res);  // 失败重连返回数据给页面调用
}

```

### vConsole
一个轻量、可拓展、针对手机网页的前端开发者调试面板。
vConsole 是框架无关的，可以在 Vue、React 或其他任何框架中使用。
本项目已在生产环境禁用该插件。

#### @/plugins/vConsole.js
```
import VConsole from "vconsole";

export default (Vue) => {
  const vConsole = new VConsole();
  Vue.use(vConsole);
};

```


### License
[MIT](https://opensource.org/license/mit/)
