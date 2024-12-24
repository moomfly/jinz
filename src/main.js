import Vue from "vue";
import App from "./App.vue";
import plugins from "./plugins";
import store from "./store";
import "./assets/css/global.css";
import router from "./permission"; // permission control
import RefreshList from "./components/RefreshList";
import Empty from "./components/Empty";
import CarouselCard from "./components/CarouselCard";
import NavBar from "./components/NavBar";
import { ImagePreview ,Toast} from 'vant'
import TlbsMap from 'tlbs-map-vue';
import {getWxLogin} from "@/utils";

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 注册全局组件
Vue.use(VueQuillEditor)
Vue.use(plugins);
Vue.use(TlbsMap);
Vue.component("refresh-list",RefreshList)
Vue.component("empty-list",Empty)
Vue.component("carousel-card",CarouselCard)
Vue.component("nav-bar",NavBar)
Vue.config.productionTip = false;
Vue.prototype.$imagePreview = ImagePreview;
Vue.prototype.getWxLogin = getWxLogin;
Vue.prototype.$toastMsg = (res)=>{
  Toast(res)

};

Vue.prototype.$toastSuccess = (res)=>{
  try {
  return  new Promise((resolve, reject) => {
      Toast.success(res)
      setTimeout(function (){
        resolve()
      },1000)
    })
  }catch(r){

  }
};
window.vm = new Vue({
  router,
  store,

  render: (h) => h(App),
}).$mount("#app");
