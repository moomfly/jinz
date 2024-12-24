<template>
  <div>
    <div style="height: 48px;width: 100%"></div>
    <van-tabbar v-model="active" active-color="#ff6633" route>
      <van-tabbar-item
          replace
          v-for="bar in tabBarList"
          :key="bar.meta.title"
          :to="bar.path"
          :icon="bar.meta.icon"
      >
        {{ bar.meta.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { tabBarRoutes } from "@/router";
export default {
  name: "TabBar",
  data() {
    return {
      active: "",
      tabBarList: tabBarRoutes,
    };
  },
};
</script>

<style></style>
