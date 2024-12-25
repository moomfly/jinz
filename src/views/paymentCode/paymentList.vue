<template>
  <div>
    <nav-bar title="收款记录"></nav-bar>
    <refresh-list :freshMap="freshMap"  @refresh="onRefresh" @onLoad="onLoad" :hasList="listData.length > 0?true:false">
      <van-sticky offset-top="48">
        <van-tabs @change="changeTab" title-inactive-color="#a7a7a7" v-model="activeId">
          <van-tab title="收款记录" name="1"></van-tab>
          <van-tab title="退款记录" name="2"></van-tab>
        </van-tabs>
      </van-sticky>
      <div class="cell-list m10-t" v-if="activeId == 1">
        <van-cell v-for="(item,index) in listData" :key="index">
          <template  #title>
            <div class="flexs align-center">
              <van-image round width="40" height="40" :src="require('@/assets/wxzf.png')" lazy-load v-if="item.pay_method == 1"/>
              <van-image round width="40" height="40" :src="require('@/assets/zfbzf.png')" lazy-load v-else/>
              <div class="m5-l" style="width: 80%">
                <div class="font16 van-ellipsis font-wb">{{ item?.device?.device_name }}</div>
                <div class="color-gray font12">{{ item.order_no }}</div>
                <div class="color-grey font13   " style="line-height: 1">{{ item.pay_time_desc }}</div>
              </div>
            </div>
          </template>
          <template  #default>
            <div class=" font13" :class="[item.order_status == 50?'color-o':item.order_status == 60?'color-red':'color-green']">{{item.order_status_desc}}</div>
            <div class="color-red font15">付款¥{{item.sum_pay_amount}}</div>
            <div class="color-green font15">实收¥{{item.sum_get_amount}}</div>
            <van-button type="warning" size="mini" @click="outPay(item)"
                        v-if="item.fz_state == 0 && item.order_status == 30">申请退款</van-button>
          </template>
        </van-cell>
      </div>
      <div class="cell-list m10-t" v-else>
        <van-cell v-for="(item,index) in listData" :key="index" style="    flex-wrap: wrap;">
          <template  #title>
            <div class="flexs align-center">
              <van-image round width="40" height="40" :src="require('@/assets/wxzf.png')" lazy-load v-if="item.order.pay_method == 1"/>
              <van-image round width="40" height="40" :src="require('@/assets/zfbzf.png')" lazy-load v-else/>
              <div class="m5-l" style="width: 80%">
                <div class="font16 van-ellipsis font-wb">{{ item?.device?.device_name }}</div>
                <div class="color-gray font12">{{ item.order_no }}</div>
                <div class="color-grey font13   " style="line-height: 1">{{ item.create_time_desc }}</div>
              </div>
            </div>
          </template>
          <template  #default>
            <div class=" font13"  :class="[item.refund_job_status == 2?'color-red':item.refund_job_status == 1?'color-green':'color-o']">{{item.refund_job_status_desc }}</div>
            <div class="color-red font15">付款¥{{item.order.sum_pay_amount}}</div>
            <div class="color-green font15">实收¥{{item.order.sum_get_amount}}</div>
          </template>
          <template #extra>
            <div class="color-red" v-if="item.refund_msg" style="width: 100%;text-align: right">{{item.refund_msg}}</div>
          </template>
        </van-cell>
      </div>
    </refresh-list>
  </div>
</template>

<script>
import {deviceRefund, orderScanList, smRefundList} from "@/api/user";
import {Dialog} from "vant";

export default {
  name: "paymentList",
  data(){
    return{
      freshMap:{
        refreshLoad: false, // 是否刷新
        listLoading: false, // 是否加载中
        listFinished: false, // 是否加载完成标识
      },
      queryParams:{
        page:1,
        page_size:30,
      },
      listData:[],
      activeId: '1',
    }
  },
  mounted() {
    let userInfo = this.$store.state.user.userInfo
    this.queryParams.merchant_id = userInfo?.merchant?.merchant_id
    this.getList()
  },
  methods: {
    getList() {
      let urlAPI= this.activeId ==1?orderScanList:smRefundList
      urlAPI(this.queryParams).then(res => {
        if (res?.code === 200) {
          this.listData = this.listData.concat(res.data.data);
          if (this.queryParams.page >= res.data.last_page) {
            this.freshMap.listFinished = true;
          }else{
            this.freshMap.listFinished = false;
          }

        }
      })
    },
    //下拉刷新
    onRefresh() {
      console.log("刷新");
      this.freshMap.listFinished = true;
      this.freshMap.listLoading = false;
      this.freshMap.refreshLoad = true;
      this.queryParams.page = 1
      this.listData = []
      Promise.all([this.getList()]).then(() => {
        this.freshMap.refreshLoad = false;
      });
    },
    // 触底加载
    onLoad() {
      console.log("触底加载");
      if (this.freshMap.listFinished) {
        return
      }
      this.queryParams.page += 1
      this.freshMap.refreshLoad = true;
      Promise.all([this.getList()]).then(() => {
        this.freshMap.refreshLoad = false;
      });
    },
    changeTab(index){
      this.activeId=index
      this.queryParams.page=1
      this.listData=[]
      this.getList()
    },
    //申请退款 弹窗提问是否需要退款
    outPay(row){
      Dialog.confirm({
        title: '退款提示',
        message: '是否申请退款',
        confirmButtonColor:'#ff6034'
      }).then(() => {
            // on confirm
        deviceRefund({order_no:row.order_no}).then(res =>{
          if(res?.code === 200){
            this.$toastSuccess('申请退款成功').then(() =>{
              this.changeTab('2')
            })
          }
        })
      }).catch(() => {
            // on cancel
      });


    }
  }
}
</script>
<style scoped lang="less">
::v-deep .van-cell__title{
  flex:1.8;
  width: 74%;
}
</style>