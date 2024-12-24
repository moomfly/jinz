<template>
  <div style="background: #ffffff">

    <refresh-list :freshMap="freshMap" :disabled="isDropdownOpen" @refresh="clearList" @onLoad="onLoad" :hasList="dataList.length > 0?true:false">
      <van-sticky>
        <van-search
            v-model="queryParams.keyword"
            shape="round"
            @search="onSearch"
            show-action
            background="#fd875f"
            placeholder="输入关键词..."
        >
          <template #action>
            <span class="btns" @click="onSearch">搜索</span>
          </template>
        </van-search>
      </van-sticky>
      <van-grid :column-num="5"  :border="false" class="grid-box">
        <van-grid-item  :text="item.name" v-for="(item) in getLen()" :key="item.merchant_cate_id" @click="clickType(item,'grid')">
          <van-image :src="item.logo"  lazy-render  slot="icon" width="57" height="57"/>
        </van-grid-item>
        <van-grid-item  text="更多"   @click="showPopup=true" v-if="typeChildData.length >10">
          <van-image :src="require('../../assets/more.png')"  lazy-render  slot="icon" width="57" height="57"/>
        </van-grid-item>
      </van-grid>
      <van-sticky :offset-top="56">
        <div style="display:flex;padding: 10px 10px 10px 5px;background: #fff">
          <van-dropdown-menu  active-color="#ff5e28">
            <van-dropdown-item v-model="queryParams.in_meter" :options="option1" @change="clearList"  @open="onDropdownOpen" @close="onDropdownClose">
              <div slot="title" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                <van-icon name="location-o" />{{queryParams.in_meter==0?'附近':queryParams.in_meter+'米'}}</div>
            </van-dropdown-item>

            <van-dropdown-item  ref="itemType"  @open="onDropdownOpen" @close="onDropdownClose">
              <div slot="title" style="color: rgb(255, 94, 40)">{{typeName}}</div>
              <van-tree-select
                  :items="typeData"
                  @click-nav="onNavClick"
                  style="width: 100%"
                  :active-id.sync="queryParams.merchant_cate_id"
                  :main-active-index.sync="activeIndex"
              >
                <template slot="content">
                  <div v-for="item in tableSelect" :key="item.id" style="display: flex;;margin-left: 10px;padding:8px 0" @click="clickType(item)">
                    <!-- 插入图片，这里的 item.imageUrl 是假设你的数据中有图片的 URL -->
                    <img :src="item.logo" alt="图片" style="width: 25px; height: 25px; margin-right: 5px;">
                    <!-- 显示文本内容 -->
                    <span :style="{color:queryParams.merchant_cate_id == item.id ?'#ff5e28':''}"> {{ item.text }}</span>
                  </div>
                </template>
              </van-tree-select>
            </van-dropdown-item>
          </van-dropdown-menu>
          <div class="btn-box" @click="clearList">
            <span>距离优先</span>
            <van-icon name="down"  style="transform: rotate(180deg);"/>
          </div>
        </div>
      </van-sticky>
      <div v-for="item in dataList" :key="item.merchant_id" class="list-box" @click="gotoDetail(item)">
        <van-image lazy-load  :src="item.avatar" fit="cover" width="80px" height="80px" radius="10px"></van-image>
        <div class="list-right">
          <div>{{ item.name }}</div>
          <div class="bus">主营：{{ item.business }}</div>
          <div class="price-num">
            <span>{{ item.cate.name }} ¥{{item.per_price}}/人</span>
            <span style="color: #ff6000">{{item.distance}}</span>
          </div>
        </div>
      </div>
    </refresh-list>
    <van-popup v-model="showPopup" round  class="popup-box" :style="{ top: '0' }">
      <van-search
          v-model="queryParams.keyword"
          shape="round"
          @search="onSearch"
          show-action
          background="#fd875f"
          placeholder="输入关键词..."
      >
        <template #action>
          <span class="btns" @click="onSearch">搜索</span>
        </template>
      </van-search>
      <van-grid :column-num="5"  :border="false" class="grid-box">
        <van-grid-item  :text="item.name" v-for="(item) in typeChildData" :key="item.merchant_cate_id" @click="clickType(item,'grid')">
          <van-image :src="item.logo"  lazy-render  slot="icon" width="57" height="57"/>
        </van-grid-item>
      </van-grid>
      <div class="show-open" @click="showPopup=false">
        <span>点击收起</span>
        <van-icon name="arrow-up" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {homeCateChild, } from "@/api/home";
import {merchantList} from '@/api/merchant'
import {getLatLng} from "@/utils";
export default {
  name: "Institution",

  data() {
    return {
      showPopup:false,
      isDropdownOpen:false,// 控制下拉菜单是否打开
      freshMap:{
        refreshLoad: false, // 是否刷新
        listLoading: false, // 是否加载中
        listFinished: false, // 是否加载完成标识
      },
      queryParams:{
        keyword:'',
        in_meter:0,//距离
        merchant_cate_id:0, //小类
        page:0,
        page_size:10,
        sort_type:1
      },
      option1:[
        { text: '附近', value: 0 },
        { text: '500米', value: 500 },
        { text: '1000米', value: 1000 },
        { text: '2000米', value: 2000},
        { text: '5000米', value: 5000 },
      ],
      typeName:'全部分类',
      typeData:[],
      typeChildData:[],
      activeIndex:0,
      tableSelect:[],
      dataList:[],
      lastPage:0
    };
  },
  computed: {
    merchantId() {
      return this.$store.state.merchantId;
    },
  },
  mounted() {

    if(!sessionStorage.getItem('newCity')){
      this.getData()
      getLatLng().then(res =>{
        if(res){
          this.queryParams.lat=res.lat
          this.queryParams.lng=res.lng
        }
        this.clearList()
      })
    }else{
      this.getData()
    }
  },
  methods: {
    getData(){
      //获取分类
      homeCateChild().then(res =>{
        if (res?.code === 200) {
          this.typeData = res?.data;
          let ids=[]
          if(this.merchantId){
            ids=this.merchantId.split(',')
          }
          this.typeData.map((item,index) =>{
            item.text=item.name
            item.id=item.merchant_cate_id
            if(item.children.length > 0 ){
              item.children.unshift({
                name:item.name,
                merchant_cate_id:item.merchant_cate_id,
                logo:item.logo
              })
              item.children.map((child,index) =>{
                child.text=index===0?'全部'+child.name:child.name
                child.id=child.merchant_cate_id
              })
            }
            //代表从上一页面传过来的值(有可能是二级，所以要根据父级来定位),第一级为0就取第二个做对比
            if(ids.length > 0 && ids[0] == 0 && ids[1] == item.merchant_cate_id){
              this.activeIndex=index+1
              this.queryParams.merchant_cate_id=item.merchant_cate_id
              this.typeName=item.name
              this.$forceUpdate()
            }else if(ids.length > 0 && ids[0] != 0 && ids[0] == item.merchant_cate_id){ //第一个不为0就取第一个做对比
              let ind=item.children.map(ite => ite.merchant_cate_id+'').indexOf(ids[1])
              this.activeIndex=index+1
              this.queryParams.merchant_cate_id=item.children[ind].merchant_cate_id
              this.typeName=item.children[ind].name
            }
          })
          let typeData=JSON.parse(JSON.stringify(this.typeData))
          this.typeData.unshift({
            name:'全部分类',
            text:'全部分类',
            id:0,
            merchant_cate_id:0,
            children:typeData
          })
          this.onNavClick(this.activeIndex,'in')
          this.getType()
          this.onLoad()
        }
      })
    },
    getType(){
      let ind=this.activeIndex
      //当选择全部分类的时候页面的九宫格需要现在美食大类的子类
      if(this.activeIndex === 0){
        let index=this.typeData.map(item =>item.name).indexOf("美食")
        if(index === -1){
          index=1
        }
        ind=index
      }
      let list = this.typeData[ind].children
      list=JSON.parse(JSON.stringify(list)).slice(1)
      this.typeChildData=list
    },
    //右侧选中分类
    clickType(row,type){
      this.queryParams.merchant_cate_id=row.id
      this.typeName=row.name
      this.getType()
      this.clearList()
      //关闭下拉菜单
       this.$refs.itemType.toggle(false);
      //代表选择的是全部分类
      if(this.activeIndex === 0 && type !== 'grid'){
        let index = this.typeData.map(item =>item.id).indexOf(row.id)
        this.activeIndex=index
        this.tableSelect = this.typeData[index].children
        this.getType()
      }
      if(this.activeIndex === 0 && type === 'grid'){
        let index=this.typeData.map(item =>item.name).indexOf("美食")
        if(index === -1){
          index=1
        }
        this.activeIndex=index
        let list = this.typeData[index].children
        list=JSON.parse(JSON.stringify(list)).slice(1)
        this.tableSelect=list
      }
      if(this.showPopup){
        this.showPopup=false
      }
    },
    //选择左侧
    onNavClick(index,type){
      if(index === 0 && type !== 'in'){
        this.clickType(this.typeData[index])
      }
      this.tableSelect = this.typeData[index].children
    },
    getList(){
      let latlng=sessionStorage.getItem('newCity')
      if(latlng){
        latlng= JSON.parse(latlng)
        this.queryParams.lat=latlng.lat
        this.queryParams.lng=latlng.lng
      }
      //获取商家列表
      merchantList(this.queryParams).then(res =>{
        if (res?.code === 200) {
          this.dataList = this.dataList.concat(res.data.data);
          if(this.queryParams.page >= res.data.last_page){
            this.freshMap.listFinished = true;
          }else{
            this.freshMap.listFinished = false;
          }
        }
      })
    },
    onSearch(){
      this.queryParams.merchant_cate_id=0
      this.queryParams.in_meter=0
      this.activeIndex=0
      this.typeName='全部分类'
      this.clearList()
     // this.onNavClick(this.activeIndex)

      //this.clearList()
    //  Toast('提示内容')
    },
    //初始化列表后加载数据
    clearList(){
      this.dataList=[]
      this.queryParams.page=1
      this.onRefresh()
    },
    //下拉刷新
    onRefresh(){
      console.log("刷新");
      this.freshMap.listFinished = true;
      this.freshMap.listLoading = true;
      this.freshMap.refreshLoad = true;
      let that=this
      Promise.all([this.getList()]).then(() => {
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
      Promise.all([this.getList()]).then(() => {
        this.freshMap.refreshLoad = false;
      });
    },
    //判断数组typeChildData是否超过10个，如果超过只返回前9条，反之返回全部数据
    getLen(){
      if(this.typeChildData.length > 10){
        return this.typeChildData.slice(0,9)
      }else{
        return this.typeChildData
      }
    },
    onDropdownOpen() {
      console.log("打开");
      this.isDropdownOpen = true;
    },
    onDropdownClose() {
      this.isDropdownOpen = false;
    },
    //跳转到商家详情页面
    gotoDetail(row){
      this.$router.push({path: '/merchantDetail',query:{merchant_id:row.merchant_id}})
    }
  },
  destroyed() {
    this.$store.dispatch('updateMerchantId', null);
  }
};
</script>

<style lang="less" scoped>
.btns{
  color: #ffffff;background: #fd875f;
  outline: none; /* 去掉默认的焦点边框 */
  &:focus,
  &:active {
    background: #fd875f; /* 保持与正常状态相同的背景色 */
    outline: none; /* 去掉默认的焦点边框 */
  }
  -webkit-tap-highlight-color: transparent !important; /* 去除触摸高亮 */
}
.grid-box{
  overflow: hidden;
  padding-bottom:10px;
  ::v-deep .van-grid-item__content{
    padding: 15px 0 0;
  }
  ::v-deep .van-grid-item__text{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  ::v-deep .van-grid-item{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
::v-deep .van-dropdown-menu{
  flex:2;
  .van-dropdown-menu__bar{
    box-shadow:none;
    height: 40px;
  }
  .van-dropdown-menu__item{
    background: #f7f7f9;
    border-radius: 10px;
    margin-left: 5px;
    height: 40px;
  }
  .van-dropdown-menu__title{
    padding-left: 0;
    max-width: 78%;
  }
  .van-dropdown-menu__title::after{
    border-color: transparent transparent #000000 #000000;
  }
}
::v-deep .van-dropdown-item--down{
  .van-dropdown-item__content{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 5px;
  }
  .van-dropdown-item__option{
    width: 100px;
    text-align: center;
    background: #f7f7f9;
    border-radius: 10px;
    margin:  5px;
    font-size: 12px;
    padding: 5px;
  }
  .van-cell__value{
    display: none;
  }
}
.btn-box{
  flex:1;
  background: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  font-size: 15px;
}
::v-deep .van-tree-select__item--active{
  color: #ff5e28;
}
::v-deep .van-sidebar-item--select::before{
  background-color: #ff5e28;
}

.list-box{
  display: flex;
  background: #ffffff;
  margin-bottom: 10px;
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
.show-open{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 14px;
  border-top: 1px #ababab solid;
}
.popup-box{
  width: 100%;
  left: 0;
  right: 0;
  transform: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
