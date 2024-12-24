import router from "./router";
import { getToken } from "@/utils/auth";
import { Dialog } from 'vant';
import {getUserLocation, goFidId} from "@/utils";

const whiteList = [ "/user"];
const locadUrl=['/','/merchantDetail','/merchant']

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title || "";
  // has token
  if (getToken()) {
    if (to.path === "/login") {
      next({ path: "/" });
    }else{
      next();
    }
    //只有在白名单内的页面，需要传经纬度
    if (locadUrl.indexOf(to.path) > -1) {
      getUserLocation()
    }

  } else {

    // no token or no white list or white list doesn't contain current path
    // a whitelist is a path that can be accessed without logging in. For example: ['/login', '/404']
    next();
    /*if (whiteList.indexOf(to.path) === -1) {
      next();
    } else {
      Dialog.alert({
        title: '提示',
        message: '请先登录',
        showCancelButton:true,
      }).then(() => {
        // on close
        localStorage.setItem("goPath",to.path)
        next("/login");
      }).catch(er =>{
        next(false);
      });
      /!*next("/login");*!/
    }*/
  }
});

export default router;
