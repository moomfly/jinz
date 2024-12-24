<template>
<div>
  <nav-bar :title="'我的粉丝('+(infoData?.numSum || 0)+')'"></nav-bar>
  <refresh-list :freshMap="freshMap"  @refresh="onRefresh" @onLoad="onLoad" :hasList="listData.length > 0?true:false">
    <van-sticky offset-top="48">
      <van-tabs @change="changeTab" title-inactive-color="#a7a7a7" >
        <van-tab :title="'一级粉丝('+(infoData?.numZT || 0 )+')'" name="1"></van-tab>
        <van-tab :title="'二级粉丝('+(infoData?.numJT || 0) +')'" name="2"></van-tab>
      </van-tabs>
    </van-sticky>
    <div class="cell-list p15" v-for="item in listData " :key="item.user_id">
       <div class="flexs justify-between align-center">
         <div class="flexs align-center  " style="width: 80%;">
           <van-image lazy-load  :src="item.avatar" width="55px" height="55px" round></van-image>
           <div class="cell-left " >
             <div class="cell-name">{{item.name}}</div>
             <div class="color-gray font13 cell-num">{{ item.mobile }}</div>
             <div class="color-gray font12">邀请时间：{{item.parent_bind_time_desc}}</div>
           </div>
         </div>
         <div class="color-o " style="width: 20%;text-align: center">{{ item.level_id_desc }}</div>
       </div>
      <div class="flexs justify-between p15-t ">
        <div class="flex1 cell-li">
          <div class="color-grey font13">粉丝</div>
          <div class="color-red font16 m5-t">{{item.team_jt_num}}个</div>
        </div>
        <div class="flex1 cell-li">
          <div class="color-grey font13">消费</div>
          <div class="color-red font16 m5-t">{{ item.sum_pay_amount }}元</div>
        </div>
        <div class="flex1 cell-li">
          <div class="color-grey font13">订单</div>
          <div class="color-red font16 m5-t">{{ item.sum_order_num }}个</div>
        </div>
      </div>
    </div>
  </refresh-list>
</div>
</template>

<script>
//会员身份 0自来客 10普通用户 20商家 30客户经理 40服务商 50区域代理
//客户经理，商家，没有二级,服务商。区代有二级 等级id大于等于40就有二级
import { agentTeamList, agentTeamNum} from "@/api/promotion";

export default {
  name: "fansList",
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
        level_num:1
      },
      infoData:null,
      listData:[],
      activeId:1
    }
  },
  mounted() {
    this.getData()
    this.getList()
  },
  methods:{
    getData(){
      agentTeamNum().then(res =>{
        this.infoData=res.data
      })
    },
    getList(){
      agentTeamList(this.queryParams).then(res =>{
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
      this.queryParams.level_num = index
      this.listData=[]
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
.cell-list{
  background: #ffffff;
  margin-top: 10px;
  .cell-left{
    width: 70%;
    margin-left: 10px;
  }
  .cell-name{
    margin-bottom: 5px;
    //超出长度显示省略号
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cell-num{
    margin-bottom: 3px;
  }
  .cell-li{
    text-align: center;
  }
}
</style>