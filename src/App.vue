<template>
  <div id="app">
    <transition name="slide-left">
      <keep-alive :include="keepAliveNameList">
        <router-view />
      </keep-alive>
    </transition>
    <router-view name="TabBar"></router-view>


  </div>
</template>

<script>

import {getToken} from "@/utils/auth";
import {goFidId} from "@/utils";

export default {
  name: "App",
  data(){
    return{
      keepAliveNameList:['MerchantJoin','MerchantEdit']
    }
  },
  mounted() {
    let href=window.location.href
    if(href.indexOf('fid=')>-1){
      let fidId=href.split('fid=')[1].split('&')[0]
      sessionStorage.setItem("fid", fidId)
      if(getToken()){
        goFidId()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.view-enter-active,
.view-leave-active {
  transition: all 0.3s ease;
}

.view-enter {
  transform: translateX(100%);
  opacity: 0;
}

.view-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
