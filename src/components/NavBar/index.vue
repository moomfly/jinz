<template>
 <div>
   <div style="height: 48px;width: 100%"></div>
   <van-nav-bar :title="title" left-arrow safe-area-inset-top @click-left="onClickLeft" :fixed="true"/>
 </div>
</template>

<script>
export default {
  name: "NavBar",
  props:{
    title: {
      type: String,
      default: "标题",
    },
  },
  data() {
    return {

    };
  },
  methods:{
    onClickLeft() {
      history.back();
    }
  }
};
</script>
<style lang="less" scoped>
::v-deep .van-nav-bar .van-icon{
  color: #1a1a1a
}
</style>
