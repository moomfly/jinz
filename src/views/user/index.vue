<template>
  <div class="user-center">
    <div class="user-header">
      <div>
        <van-icon name="revoke" style="float: right;margin-right: 15px;" color=" #ffffff" size="20" @click="getOut"/>
        <router-link :to="{ path: '/editUserInfo' }">
          <van-icon name="setting-o" style="float: right;margin-right: 15px;" color=" #ffffff" size="20"/>
        </router-link>
      </div>
      <div class="user-info">
        <van-image
            round
            width="60"
            height="60"
            :src="infoData?.avatar"
        />
        <div class="user-details">
          <h2>{{ infoData?.name }}</h2>
          <p>
            <span>{{  infoData?.level_id_desc }}</span>
          </p>
        </div>
      </div>
      <div class="user-cent">
        <router-link to="/balanceList" class="cent-li">
          <div>{{ infoData?.balance }}</div>
          <span>余额</span>
        </router-link>
        <div class="divider"></div>
        <router-link to="/dividendList" class="cent-li" style="flex:1.2">
          <div>{{stat_dfx_amount}}</div>
          <span>待分红</span>
        </router-link>
        <div class="divider"></div>
        <router-link to="/pointsList" class="cent-li">
          <div>{{ infoData?.score }}</div>
          <span>积分</span>
        </router-link>
      </div>
    </div>

    <div class="user-list" style="margin-top: -40px">
      <!-- 判断是否有店铺，有则能看到商家中心--->
      <van-cell-group inset  :border="false" v-if="infoData?.merchant">
        <template #title>
          <div class="flexs justify-between">
            <div>商家中心</div>
            <router-link to="/incomeList">
              <div  class="color-per font14">佣金：{{infoData?.income}}元</div>
            </router-link>
          </div>
        </template>
        <van-grid :column-num="4"  :border="false" class="grid-box">
          <template v-if="infoData?.merchant">
            <van-grid-item  :text="item.name" v-for="(item) in merchCoreList" :key="item.name" :to="item.path" >
              <van-image :src="item.img"  lazy-render slot="icon" width="35" height="35"/>
            </van-grid-item>
          </template>
        </van-grid>
      </van-cell-group>
    </div>
    <div class="user-list">
      <!--level_id 大于等于30时才能看到推广中心--->
      <van-cell-group inset title="推广中心" :border="false" v-if=" infoData?.level_id >= 30">
        <template #title>
          <div class="flexs justify-between">
            <div>推广中心</div>
            <router-link to="/incomeList">
              <div  class="color-per font14">佣金：{{infoData?.income}}元</div>
            </router-link>
          </div>
        </template>
        <van-grid :column-num="4"  :border="false" class="grid-box">
          <van-grid-item  :text="item.name" v-for="(item) in extenCoreList" :key="item.name" :to="item.path">
            <van-image :src="item.img"  lazy-render slot="icon" width="35" height="35"/>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>
    <div class="user-list">
      <van-cell-group inset title="个人中心" :border="false">
        <van-grid :column-num="4"  :border="false" class="grid-box">
          <!---商家等级是否是20并且未有店铺才能去申请商家入驻-->
          <van-grid-item  text="商家入驻" v-if=" infoData?.level_id === 20 && !infoData?.merchant" to="/merchantJoin">
            <van-image :src="require('@/assets/icon5.png')"  lazy-render slot="icon" width="35" height="35"/>
          </van-grid-item>
          <van-grid-item  :text="item.name" v-for="(item) in userCoreList" :key="item.name" @click="gotoOpen(item)" :to="item.path?item.path:''">
            <van-image :src="item.img"  lazy-render slot="icon" width="35" height="35"/>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import {fhStatWait} from "@/api/user";
import {Dialog} from "vant";
import {getUserLocation} from "@/utils";
/**
 * 权限： level_id 商家中心 等于20
 *
 * */

export default {
  name: "User",

  data() {
    return {
      userCoreList:[{
        img:require('@/assets/icon1.png'),
        name:'客服',
        type:1
      },{
        img:require('@/assets/icon2.png'),
        name:'关于我们',
        path:'/aboutAs'
      }],
      extenCoreList:[{
        img:require('@/assets/icon3.png'),
        name:'我的粉丝',
        path:'/fansList'
      },{
        img:require('@/assets/icon4.png'),
        name:'软件中心',
        path:'/softwareCore'
      },{
        img:require('@/assets/icon8.png'),
        name:'邀请粉丝',
        path:'/inviteFans'
      }],
      merchCoreList:[{
        img:require('@/assets/icon5.png'),
        name:'店铺信息',
        path:'/merchantEdit'
      },/*{
        img:require('@/assets/icon5.png'),
        name:'分红比例'
      },*/{
        img:require('@/assets/icon6.png'),
        name:'收款码',
        path: this.getPath()
      },{
        img:require('@/assets/icon7.png'),
        name:'收款记录',
        path: '/paymentList'
      },{
        img:require('@/assets/icon3.png'),
        name:'我的粉丝',
        path:'/fansList'
      },{
        img:require('@/assets/icon8.png'),
        name:'邀请粉丝',
        path:'/inviteFans'
      }],
      infoData:null,
      stat_dfx_amount:0
    };
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getPath(){
      let userInfo=this.$store.state.user.userInfo
      return '/paymentCode?merchant_id='+ userInfo?.merchant?.merchant_id
    },
    getInfo(){
      this.$store.dispatch('user/GetInfo').then(res =>{
        this.infoData = res.data
      })
      //查询待分红
      fhStatWait().then(res =>{
        this.stat_dfx_amount=res.data.stat_dfx_amount
      })
    },
    getOut(){
      Dialog.alert({
        title: '提示',
        message: "是否确认退出登录",
        showCancelButton:true,
      }).then(() => {
        this.$store.dispatch('user/LogOut').then(() => {
          this.$router.push({ path: '/login' });
          localStorage.setItem("goPath",this.$route.path)
        });
      }).catch(er =>{

      });

    },
    gotoOpen(item){
      if(item?.type === 1){
        //使用Dialog 打开弹窗，内容放图片
        Dialog.alert({
          title: '客服微信',
          message: `<img src="${require('@/assets/kf.png')}" style="width: 60%;height: 60%;"/><div>长按识别二维码</div>`,
          showCancelButton:false,
          confirmButtonColor:'#1989fa'
        });

      }
    }
  },
};
</script>

<style lang="less" scoped>
.user-center {
  .user-header{
    background:linear-gradient(to bottom, #ff8f3a, #fb9445, #ffa55f,#ffebdb);
    color: #ffffff;
    padding:20px 0px 60px;
  }
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 0 15px;
    .van-image {
      margin-right: 20px;
    }

    .user-details {
      h2 {
        margin: 0;
        font-size: 20px;
      }

      p {
        margin: 5px 0 0;
        font-size: 14px;
      }
    }
  }
  .user-cent{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .cent-li{
      flex:1;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 22px;
      color: #ffffff;
      span{
        font-size: 14px;
        margin-top: 5px;
      }
    }
    .divider{
      width: 1px;
      height: 36px;
      background: #ffffff;
      opacity: 0.6;
    }
  }
  .user-list{
    background: #ffffff;
    margin: 15px 15px 0px;
    border-radius: 15px;
    box-shadow: 0px 0px 3px 0px #f1f1f1;
    ::v-deep .van-cell-group__title{
      color: #000000;
      font-weight: bold;
      font-size: 18px;
      padding: 20px 18px 0px;
    }
    ::v-deep .van-cell-group--inset{
      margin:0;
    }
    ::v-deep .van-grid-item__text{
      color: #575757;
    }
  }
}
</style>
