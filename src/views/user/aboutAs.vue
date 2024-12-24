<template>
  <div style="height: calc(100% - 80px)">
    <nav-bar title="关于我们"></nav-bar>
    <div class="about-as-content">
      <div>
        <p class="t-center">
          <van-image :src="require('@/assets/logo.png')"  lazy-render slot="icon" width="80" height="80"/>
        </p>
        <div class="t-center color-gray">晋展平台</div>
        <div class="t-center color-gray m5-t">版本号v1.0</div>
        <van-cell-group style="margin-top: 30px">
          <van-cell title="用户交易纠纷处理机制" value=""  is-link to="/aboutDispute"/>
          <van-cell title="平台服务协议" value=""  is-link  to="/aboutService"/>
          <van-cell title="商家入驻协议" value=""  is-link  to="/aboutMerchant"/>
          <van-cell title="消费者权益保障措施说明" value=""  is-link  to="/aboutBz"/>
        </van-cell-group>
      </div>
      <div class="t-center m25-t">
        <div class="color-per">版权信息</div>
        <div class="color-grey font12" style="line-height: 20px">
          <div>jz.jinzancn.com</div>
          <div>上海利磊科技发展有限责任公司</div>
          <div> 广东初善文化科技有限公司</div>
          <div> 上海初善人文化科技有限公司</div>
          <div> 阿里云计算有限公司提供云计算服务</div>
          <div> Copyright 2022 备案号:沪ICP备2022027671号</div>
          <div> 增值电信业务证书:沪B2-20221082</div>
          <div> 中国支付清算协会备案:W2401220847243543</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "aboutAs"
}
</script>

<style scoped lang="less">
.about-as-content{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>