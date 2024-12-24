<template>
<div style="background: #ffffff;min-height: 100vh">
  <nav-bar title="邀请粉丝"></nav-bar>
  <div class="carousel_box">
    <carousel-card  :carouselList="carouselList" :showIndicators="true" :isOpen="false"></carousel-card>
  </div>
  <div class="m25-tb m15-lr">
    <div><span class="color-red">*</span>海报二维码和邀请平台链接均有锁定效果，好友注册过程无需填写邀请码</div>
    <div class="m5-t"><span class="color-red">*</span>锁定后，你可获得团员出单贡献收益!</div>
  </div>
  <div class="flexs justify-between p5-lr">
    <div class="img-li" @click="openImg">
      <img src="../../assets/promotion.png" alt="" class="imgs">
      <div>保存海报</div>
    </div>
    <div class="img-li"  @click="copyLine">
      <img src="../../assets/link.png" alt="" class="imgs">
      <div>锁员链接</div>
    </div>
    <div class="img-li" @click="openCode">
      <img src="../../assets/qrcode.png" alt="" class="imgs">
      <div>纯二维码</div>
    </div>
  </div>
</div>
</template>

<script>
import {posterBanner, posterQrcode, promotionLink, promotionQrcode} from "@/api/promotion";
import {Dialog} from "vant";

export default {
  name: "inviteFans",
  data(){
    return{
      carouselList:[]
    }
  },
  mounted() {
    this.getCarousel()
  },
  methods:{
    getCarousel(){
      posterBanner({place_id:1}).then(res =>{
        if (res?.code === 200) {
          this.carouselList = res?.data;
        }
      })
    },
    //保存海报
    openImg(){
      posterQrcode().then(res =>{
        Dialog.alert({
          title: '',
          message: `<img src="${res.data.url}" style="width: 60%;height: 60%;"/><div>长按图片保存</div>`,
          showCancelButton:false,
          confirmButtonColor:'#1989fa',
          confirmButtonText:'关闭'
        });
      })
    },
    async  copyLine(){
      try {
        await promotionLink().then(res =>{
          navigator.clipboard.writeText(res.data.url);
        })
        this.$toast("复制成功")
        console.log("内容已复制到剪贴板");
      } catch (error) {
        console.error("复制到剪贴板失败:", error);
      }
    },
    openCode(){
      promotionQrcode().then(res =>{
        Dialog.alert({
          title: '',
          message: `<img src="${res.data.url}" style="width: 60%;height: 60%;"/><div>长按图片保存</div>`,
          showCancelButton:false,
          confirmButtonColor:'#1989fa',
          confirmButtonText:'关闭'
        });
      })
    }
  }
}
</script>

<style scoped lang="less">
.carousel_box{
  width: 90%;
  height:400px;
  margin: 10px auto 0;
}
.img-li{
  text-align: center;
  flex:1;
}
.imgs{
  width: 40px;

}
</style>