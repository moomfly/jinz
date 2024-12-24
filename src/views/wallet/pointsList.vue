<template>
  <div class="balance-list">
    <nav-bar title="积分记录"></nav-bar>
    <refresh-list :freshMap="freshMap"  @refresh="onRefresh" @onLoad="onLoad" :hasList="listData.length > 0?true:false">
      <div class="header-box">
        <div class="money">{{ infoData?.score }}</div>
        <div style="font-size: 12px;">积分</div>
      </div>
      <div class="cell-list" >
        <van-cell v-for="item in listData" :key="item.balance_record_id"
                  :title="item.remark" :label="item.create_time_desc" >
          <template  #default>
            <span :style="{color:item.change_type === '+' ?'#ffa51e':''}">{{item.change_type}}{{ item.change_num }}</span>
          </template>
        </van-cell>
      </div>
    </refresh-list>
  </div>
</template>

<script>
import {scoreRecord} from "@/api/wallet";

export default {
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
        wallet_type:1
      },
      infoData:null,
      listData:[],
      activeId:1
    };
  },
  mounted() {
    this.getData()
    this.getList()
  },
  methods:{
    getData(){
      this.$store.dispatch('user/GetInfo').then(res =>{
        this.infoData = res.data
      })
    },
    getList(){
      scoreRecord(this.queryParams).then(res =>{
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
      this.freshMap.listLoading = false;
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
      this.listData=[]
      this.getList()
    }
  }
};
</script>

<style scoped lang="less">
.balance-list {
  background: linear-gradient(to bottom, #ffcda8,100px,#f5f5f5, #f5f5f5);
  padding: 10px 0;
  .header-box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px 0;
    border-radius: 10px;
    margin:10px 10px 20px;
    background: linear-gradient(to right,#fba66a, #f9a062, #ff7c55);
    color: #ffffff;
    .money{
      margin: 0px 10px 3px;
      font-size: 32px;
    }
    .header-btn{
      width: 80%;
      border:none;
      border-radius: 10px;
      margin-top: 20px;
      font-weight: bold;
    }
  }

  ::v-deep .van-tabs__wrap{
    padding-bottom: 10px;
  }
  ::v-deep .cell-list{
    background: #ffffff;
    .van-cell__title{
      margin-left: 10px;
      span{
        color: #333333;
        font-weight: bold;
      }
      .van-cell__label{
        color: #b5b5b5;
        margin-top: 0;
      }
    }
    .van-cell__value{
      margin-right: 10px;
      font-size: 16px;
      color: #333333;
    }
  }
  ::v-deep .cell-list2{
    background: #ffffff;
    .van-cell__title{
      margin-left: 10px;
      font-size: 16px;
      flex:1.5;
      color: #333333;
      .van-cell__label{
        color: #b5b5b5;
      }
    }
    .van-cell__value{
      margin-right: 10px;
      font-size: 14px;
      color: #333333;
    }
  }
  .err-box{
    font-size: 14px
  }
}
</style>
