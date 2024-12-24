<template>
<div>
  <nav-bar title="收款码"></nav-bar>
  <refresh-list :freshMap="freshMap"  @refresh="onRefresh" @onLoad="onLoad" :hasList="listData.length > 0?true:false">
    <div class="  m10 p5-tb p15-lr cell-list" v-for="item in listData" :key="item.merchant_device_id">
      <div class="flexs align-center justify-between van-hairline--bottom p10-b">
        <div class="p5-lr">
          <div class="font16 van-ellipsis">{{ item.device_name }}</div>
          <div class="font14 color-grey m10-t">{{ item.device_no }}</div>
        </div>
       <div class="imgs ">
         <img src="@/assets/code_demo.png" alt="" style="width: 50%;height: 70%;margin-top: 10px">
       </div>
     </div>
      <div class="flexs justify-end align-center p5-tb color-per font14">
        <!--编辑，查看收款码-->
        <div @click="gotoAdd(item)">
          <van-icon name="edit" />
          <span>编辑</span>
        </div>
        <div class="m25-l " @click="openImg(item)">
          <van-icon name="apps-o" />
          <span>查看收款码</span>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 60px"></div>
   <div class="cell-btn">
     <van-button type="info" @click="gotoAdd">新增收款码</van-button>
   </div>
  </refresh-list>
</div>
</template>

<script>
import {deviceList,deviceCodeUrl} from "@/api/user";
import {Dialog} from "vant";

export default {
  name: "index",
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
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.queryParams.merchant_id = this.$route.query.merchant_id
    this.getList()
  },
  methods:{
    getList(){
      deviceList( this.queryParams).then(res =>{
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
      Promise.all([this.getList()]).then(() => {
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
      Promise.all([this.getList()]).then(() => {
        this.freshMap.refreshLoad = false;
      });
    },
    openImg(row){
      deviceCodeUrl({device_no:row.device_no}).then(res =>{
        if(res.code === 200){
          Dialog.alert({
            title: '',
            message: `<img src="${res.data}" style="width: 60%;height: 60%;"/><div>长按图片保存</div>`,
            showCancelButton:false,
            confirmButtonColor:'#1989fa',
            confirmButtonText:'关闭'
          });
        }
      })

    },
    gotoAdd(row){
      let data=Object.assign({merchant_id:this.$route.query.merchant_id},row || {})
      this.$router.push({path:'/addPayment',query:{data:JSON.stringify(data)}})
    }
  }
}
</script>
<style scoped lang="less">
.cell-list{
  background: #ffffff;
  .imgs{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #dbdbdb;
    text-align: center;
    box-sizing: border-box;
  }
}
.cell-btn{
  text-align: center;
  width: 100%;
  position:fixed;
  bottom:10px;
  ::v-deep .van-button{
    width: 90%;
    margin: 0 auto;
  }
}
</style>