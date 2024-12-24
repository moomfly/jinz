<template>
  <div class="home-body">
    <!-- 中间 -->
    <div class="warp_body">
      <div class="carousel_box">
        <carousel-card v-if="carouselList.length" :carouselList="carouselList"></carousel-card>
      </div>
      <van-grid :column-num="5"  :border="false" class="grid-box">
        <van-grid-item  :text="item.name" v-for="(item) in typeData" :key="item.merchant_cate_id" @click="gotoList(item)">
          <van-image :src="item.logo"  lazy-render  slot="icon" width="57" height="57"/>
        </van-grid-item>
      </van-grid>
      <div class="title-box" @click="gotoList('')">
        <div class="title-left">
          <van-icon name="shop" size="20px"/>
          <span style="margin-left: 5px">附近商家</span>
        </div>
        <div class="title-more">更多<van-icon name="arrow" /></div>
      </div>
      <div>
<!--        <refresh-list :freshMap="freshMap" @refresh="onRefresh" @onLoad="onLoad">-->
        <van-list
            class="lodding_card"
            :finished="true"
            :immediate-check="true"
            finished-text="没有更多了"
        >
          <div v-for="item in dataList" :key="item.merchant_id" class="list-box" @click="gotoDetail(item)">
            <van-image lazy-load fit="cover" :src="item.avatar" width="80px" height="80px" radius="10px"></van-image>
            <div class="list-right">
              <div>{{ item.name }}</div>
              <div class="bus">主营：{{ item.business }}</div>
              <div class="price-num">
                <span>{{ item.cate.name }} ¥{{item.per_price}}/人</span>
                <span style="color: #ff6000">{{item.distance}}</span>
              </div>
            </div>
          </div>
        </van-list>

<!--        </refresh-list>-->
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {bannerList, homeCateAll, } from '@/api/home'
import {merchantList} from '@/api/merchant'
import {getLatLng} from "@/utils";
export default {
  name: "Home",

  data() {
    return {
      freshMap:{
        refreshLoad: false, // 是否刷新
        listLoading: false, // 是否加载中
        listFinished: false, // 是否加载完成标识
      },
      carouselList:[],
      typeData:[],
      queryParams:{
        page:1,
        page_size:10,
      },
      dataList:[],
      latlng:null,
      times:null
    };
  },
  mounted() {
    if(!sessionStorage.getItem('newCity')){
      this.gethomeList()
    }
    getLatLng().then(res =>{
      if(res){
        this.queryParams.lat=res.lat
        this.queryParams.lng=res.lng
        this.gethomeList()
      }
    })
    this.getCarousel()
  },
  methods: {
    ...mapActions(['updateMerchantId']),
    getCarousel(){
      //获取轮播图
      bannerList({place_id:1}).then(res =>{
        if (res?.code === 200) {
          this.carouselList = res?.data;
        }
      })
      //获取分类
      homeCateAll().then(res =>{
        if (res?.code === 200) {
          this.typeData = res?.data;
        }
      })
    },
    gethomeList(){
      //获取商家列表
      merchantList(this.queryParams).then(res =>{
        if (res?.code === 200) {
          this.dataList = res?.data.data;
        }
      })
    },
    //跳转到商家页面
    gotoList(row){
      this.$store.dispatch('updateMerchantId', row?row.fid+','+row.merchant_cate_id:null);
      //this.updateMerchantId(row?row.fid+','+row.merchant_cate_id:null);
      this.$router.push({path: '/merchant'})
    },
    //跳转到商家详情页面
    gotoDetail(row){
      this.$router.push({path: '/merchantDetail',query:{merchant_id:row.merchant_id}})
    }

  },
};
</script>

<style lang="less" scoped>
.home-body{
  background: linear-gradient(to bottom, #ffcda8,59px,#f5f5f5, #f5f5f5);
  padding: 10px;
  box-sizing: border-box;
}
.warp_body {
  height: 100%;
  .carousel_box {
    height: 170px;
    width: 100%;
    padding-bottom: 10px;
  }
}
.grid-box{
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 11px 10px -9px rgba(177, 177, 177 ,0.5);
  margin-bottom: 15px;
  padding-bottom:20px;
  ::v-deep .van-grid-item__content{
    padding-bottom: 0;
  }
}
.title-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 4px 10px;
  .title-left{
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .title-more{
    color: #929292;
  }
}
.list-box{
  display: flex;
  background: #ffffff;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 11px 10px -9px rgba(216, 215, 215, 0.5);
  .list-right{
    flex:1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bus{
    color: #838080;
    font-size: 12px;
    margin: 4px 0;
  }
  .price-num{
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: space-between;
    color: #ababab;
    font-size: 12px;

  }
}
::v-deep .lodding_card {
  .van-list__finished-text{
    padding-bottom: 30px;
  }
}
</style>
