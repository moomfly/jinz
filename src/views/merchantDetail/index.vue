<template>
  <div class="shop-detail">
    <nav-bar title="商家详情"></nav-bar>
    <refresh-list :freshMap="freshMap"  @refresh="onRefresh" @onLoad="onLoad" :hasList="imgList.length > 0?true:false">
      <div style="background: #ffffff;padding-bottom: 10px">
        <van-image
            width="100%"
            height="200"
            fit="cover"
            lazy-load
            :src="detailRow?.avatar"
        />

        <van-cell-group :title="detailRow?.name" :border="false">

          <van-cell title=""  :border="false" class="adder">
            <template #default>
              <div style=" color: #ababab;">
                <span>{{ detailRow?.cate?.name }}</span>
                <span class="m10-l">¥{{detailRow.per_price}}/人</span>
                <span class=" color-per" style="float: right">{{detailRow?.distance}}</span>
              </div>

            </template>
          </van-cell>
          <van-cell title="商家简介：" :value="detailRow?.blurb" :border="false"/>
          <van-cell title="主营业务：" :value="detailRow?.business" :border="false"/>
          <van-cell title="营业时间："  :border="false">
            <template #default>
              <div style="display:flex;align-items: center;justify-content: space-between;">
                <span class="custom-title">{{ detailRow?.open_time }} - {{detailRow?.close_time}}</span>
                <van-tag  type="primary" size="large" v-if="detailRow && detailRow.mer_phone">
                  <a :href="'tel:' + detailRow.mer_phone" style="color: white; text-decoration: none;">电话</a>
                </van-tag>
              </div>
            </template>
          </van-cell>
          <van-cell title=""  :border="false" class="adder p5-t " style="min-height: 40px;">
            <template #default>
              <div style="display:flex;align-items: center;justify-content: space-between;">
                <span class="custom-title">{{detailRow?.addr_city}}{{detailRow?.addr_area}}{{ detailRow?.addr_detail }}</span>
                <van-tag plain type="primary"  size="large" @click="gotoMap" class="m5-t">导航</van-tag>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
     <div style="margin-top: 10px;">
       <van-sticky offset-top="48">
         <van-tabs  title-active-color="#ee490a" line-width="0" @change="changeTab">
           <van-tab title="全部" name="0"></van-tab>
           <van-tab title="门面" name="1"></van-tab>
           <van-tab title="大堂" name="2"></van-tab>
           <van-tab title="店面" name="3"></van-tab>
         </van-tabs>
       </van-sticky>
       <div style="display: flex; justify-content: space-between;flex-wrap: wrap;padding:0 20px 20px;background: #ffffff">
         <div  v-for="(item,index) in imgList" class="imgs">
           <van-image :src="item.url" @click="showImagePreview(index)"
                      fit="cover" width="100%" height="100%"/>
         </div>
       </div>
     </div>
    </refresh-list>
  </div>
</template>

<script>
import {merchantDetail, merchantImg} from "@/api/merchant";
import {getLatLng} from "@/utils";

export default {
  data() {
    return {
      freshMap:{
        refreshLoad: false, // 是否刷新
        listLoading: false, // 是否加载中
        listFinished: false, // 是否加载完成标识
      },
      detailRow:{},
      imgList:[],
      queryParams:{
        page:1,
        page_size:10,
        type_id:0
      },
      queryData:{

      },
      merchantId:''
    };
  },
  mounted() {
    this.merchantId=this.$route.query.merchant_id
    this.queryParams.merchant_id=this.merchantId
    this.queryData.merchant_id=this.merchantId
    this.getImgs()
    if(!sessionStorage.getItem('newCity')){
      this.getData()
    }
    getLatLng().then(res =>{
      if(res){
        this.queryData.lat=res.lat
        this.queryData.lng=res.lng
        this.getData()
      }
    })
  },
  methods: {
    getData(){
      merchantDetail(this.queryData).then(res =>{
        this.detailRow=res.data
      })
    },
    //下拉刷新
    onRefresh(){
      console.log("刷新");
      this.freshMap.listFinished = true;
      this.freshMap.listLoading = true;
      this.freshMap.refreshLoad = true;
      this.queryParams.page=1
      this.imgList=[]
      let that=this
      Promise.all([this.getData(),this.getImgs()]).then(() => {
        //this.freshMap.listLoading = false;
        that.freshMap.refreshLoad = false;
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
      Promise.all([this.getData(),this.getImgs()]).then(() => {
        this.freshMap.refreshLoad = false;
      });
    },
    changeTab(val){
      console.log(val);
      this.queryParams.type_id=val
      this.queryParams.page=1
      this.imgList=[]
      this.getImgs()
    },
    getImgs(){
      merchantImg(this.queryParams).then(res =>{
        if (res?.code === 200) {
          this.imgList = this.imgList.concat(res.data.data);
          if(this.queryParams.page >= res.data.last_page){
            this.freshMap.listFinished = true;
          }else{
            this.freshMap.listFinished = false;
          }
        }
      })
    },
    showImagePreview(index) {
      let imageUrl=this.imgList.map(item =>{return item.url})
      this.$imagePreview({
        images: imageUrl,
        startPosition: index,
      });
    },
    gotoMap(){
      let data={
        map_lat:this.detailRow.map_lat,
        map_lng:this.detailRow.map_lng,
        name:this.detailRow.name,
        adder:this.detailRow.addr_city+this.detailRow.addr_area+this.detailRow.addr_detail
      }
      this.$router.push({path:'/mapNav',query:{data:JSON.stringify(data)}})
    }
  },
};
</script>

<style scoped lang="less">
::v-deep .van-cell-group__title{
  color: #000000;
  font-size: 16px;
  font-weight: bold;
}
.imgs{
  width: 48.5%;
  height: 120px;
  margin-top: 10px;
}
::v-deep .van-cell-group{
  .van-cell{
    padding: 3px 15px 0;
  }
  .van-cell__title{
    flex:none;
    color: #4f4f4f;
    margin-right: 5px;
  }
  .van-cell__value{
    color: #4f4f4f;
    text-align: left;
  }
}
.adder{
  ::v-deep .van-cell__title{
    margin-right: 0;
  }
}
.custom-title{
  flex:1;
  margin-right: 40px;
}
::v-deep .van-tabs--line .van-tabs__wrap{
  height: 40px;
  margin-bottom: 5px;
}
::v-deep .van-list__finished-text{
  background: #ffffff;
}
</style>
