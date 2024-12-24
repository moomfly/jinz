<template>
  <div class="dividend-list">
    <nav-bar title="消费分红记录"></nav-bar>
    <refresh-list :freshMap="freshMap"  @refresh="onRefresh" @onLoad="onLoad" :hasList="listData.length > 0?true:false">
      <van-sticky offset-top="48">
        <div class="header-box">
          <div class="header-li">
            <div>¥{{ totalInfo?.stat_pay_amount }}</div>
            <div>消费总额</div>
          </div>
          <div class="header-li">
            <div>¥{{ totalInfo?.stat_fx_amount }}</div>
            <div>已返金额</div>
          </div>
          <div class="header-li">
            <div>{{ totalInfo?.stat_sm_amount }}</div>
            <div>扫码支付</div>
          </div>
          <div class="header-li">
            <div>{{ totalInfo?.stat_line_amount }}</div>
            <div>线上支付</div>
          </div>
        </div>
        <van-tabs @change="changeTab" title-inactive-color="#a7a7a7">
          <van-tab title="未完成" name="0"></van-tab>
          <van-tab title="已完成" name="1"></van-tab>
        </van-tabs>
      </van-sticky>
      <div class="list-box">
        <div class="cell-list p15-lr p15-tb" v-for="item in listData" :key="item.order_id">
          <div class="flexs justify-between">
            <div class="cell-order">
              <div class="compant-name">{{ item?.merchant?.name }}</div>
              <div>订单编号：{{ item.order_no }}</div>
              <div v-if="activeId == 0">当前顺位：<span class="color-per">{{ item.fx_rank }}</span></div>
              <div>订单类型：{{ item.order_type_desc }}</div>
            </div>
            <div  style="font-size: 15px">
              <span  class="color-o" v-if="activeId == 0">{{ item.fx_end_desc }}</span>
              <span class="color-blue" v-else> {{item.fx_end_desc}}</span>
            </div>
          </div>
          <div class="cell-num ">
            <div>支付金额：¥{{item.sum_pay_amount * 1}}</div>
            <div>已返金额：¥{{item.fx_sum_amount * 1}}</div>
            <div>下单时间：{{ item.create_time_desc }}</div>
          </div>
        </div>
      </div>
    </refresh-list>
  </div>
</template>
<script>
import {userFhList,userFhStat} from "@/api/wallet";

export default {
  name: "dividendList",
  data() {
    return {
      freshMap:{
        refreshLoad: false, // 是否刷新
        listLoading: false, // 是否加载中
        listFinished: false, // 是否加载完成标识
      },
      queryParams:{
        page:1,
        page_size:30,
        fx_end: '0'
      },
      listData:[],
      activeId:0,
      totalInfo:null
    };
  },
  mounted() {
    this.getData()
    this.getList()
  },
  methods: {
    getData(){
      userFhStat().then(res =>{
        if(res?.code === 200){
          this.totalInfo = res?.data
        }
      })
    },
    getList(){
      userFhList(this.queryParams).then(res =>{
        if (res?.code === 200) {
          this.listData = this.listData.concat(res.data.data);
          if(this.queryParams.page >= res.data.last_page){
            this.freshMap.listFinished = true;
          }else{
            this.freshMap.listFinished = false;
          }
        }
      })
    },
    //下拉刷新
    onRefresh(){
      console.log("刷新");
      this.freshMap.listFinished = true;
      this.freshMap.listLoading = true;
      this.freshMap.refreshLoad = true;
      this.queryParams.page=1
      this.listData=[]
      Promise.all([this.getData(),this.getList()]).then(() => {
        //this.freshMap.listLoading = false;
        this.freshMap.refreshLoad = false;
      });
    },
    // 触底加载
    onLoad(){
      console.log("触底加载");
      if(this.freshMap.listFinished){
        return
      }
      this.queryParams.page+=1
      this.freshMap.refreshLoad = true;
      Promise.all([this.getData(),this.getList()]).then(() => {
        this.freshMap.refreshLoad = false;
      });
    },
    changeTab(index){
      this.activeId=index
      this.queryParams.page=1
      this.queryParams.fx_end=index
      this.listData=[]
      this.getList()
    }
  }
};

</script>

<style scoped lang="less">

.header-box{
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #ff8f3a;
  color: #ffffff;
  padding: 20px 5px;
  .header-li{
    flex:1;
    text-align: center;
    font-size: 12px;
    div:nth-child(1){
      font-size: 16px ;
      font-weight: bold;
      margin-bottom: 5px;
    }

  }
}
.cell-list{
  margin-top: 10px;
  background: #ffffff;
  .compant-name{
    color: #232323;
    font-size: 16px;
    text-align: left;
    margin-bottom: 10px;
  }
  .cell-order{
    color: #a9a9a9;
    font-size: 14px;
    line-height: 22px;
  }
  .cell-num{
    color: #6b6b6b;
    font-size: 13px;
    line-height: 20px;
    padding-top: 10px;
  }
}

</style>