<template>
<div class="p5-lr">
  <nav-bar title="充值中心"></nav-bar>
  <div class="flexs list-box m10-t">
    <div class="list-li " :class="form?.num === item.num?'active-li':''" v-for="(item,index) in listData" :key="index" @click="changeTab(item)">
      <div class="font16">{{item.num }}套</div>
      <div class="font14 color-gray m5-t">¥{{item.amount}}元</div>
    </div>
  </div>
  <!--我已阅读并同意《用户购买协议》,协议可跳转-->

  <div class="m25-t font14 m5-l ">
    <van-checkbox-group v-model="checkedList">
      <van-checkbox name="1">
        我已阅读并同意
        <router-link to="/buyAgreement"><span class="color-blue">《用户购买协议》</span></router-link>
      </van-checkbox>
    </van-checkbox-group>
  </div>

  <div style="margin:50px 16px;">
    <van-button round block type="danger" native-type="submit" :loading="loading"  @click="submitForm" color="#f78542">
      提交
    </van-button>
  </div>
</div>
</template>

<script>
import {activateSetOrder, buyList} from "@/api/promotion";
import {Dialog} from "vant";
import {isPaymentApp} from "@/utils/request";

export default {
  name: "softwareAdd",
  data(){
    return{
      listData:[],
      checkedList:[],
      loading:false,
      form:{
        num:''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      buyList().then(res =>{
        if (res?.code === 200) {
          this.listData = res.data;
        }
      })
    },
    changeTab(row){
      this.form.num = row.num
    },
    submitForm(){
      console.log(this.checkedList);
      if(!this.form.num){
        this.$toast('请选择充值套数')
        return
      }
      if(this.checkedList.length === 0){
        this.$toast('请勾选协议')
        Dialog.confirm({
          title: '温馨提示',
          message: '我已阅读并同意《用户购买协议》',
        }).then(() => {
              // on confirm
          this.checkedList=['1']
          this.goPay()
        }).catch(() => {
              // on cancel
        });
        return;
      }

      this.goPay()
    },
    goPay(){
      this.loading=true
      const userAgent = isPaymentApp()
      this.form.pay_method = userAgent === 'WeChat' ? 1:2
      activateSetOrder(this.form).then(res =>{
        this.loading=false
        if( userAgent === 'WeChat'){
          //微信支付
          WeixinJSBridge.invoke('getBrandWCPayRequest', res.data.pay_info,
            function(res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                this.$toast("支付成功")
                //window.location.href = "https://csr.jinzancn.com/index/index/paySuccess?opid=" + res.opid;
              }
            });
        }else{
          //支付宝支付
          window.location.href = res['data']['pay_info'];
        }
      }).catch(err =>{
        this.loading=false
      })
    }
  }
}
</script>

<style scoped lang="less">
.list-box{
  flex-wrap: wrap;
}
.list-li{
  background: #ffffff;
  border-radius: 10px;
  width: 30%;
  margin:  5px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
}
.active-li{
  border:1px #f78542 solid;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0px;
    border-bottom: 20px solid #f78542;
    border-left: 20px solid transparent;
  }

  /* 三角形勾 */
  &::before {
    content: '';
    position: absolute;
    width: 7px;
    height: 4px;
    background: transparent;
    bottom: 6px;
    right: 1px;
    border: 1px solid #ffffff;
    border-top: none;
    border-right: none;
    transform: rotate(-55deg);
    z-index: 9;
  }
}
</style>