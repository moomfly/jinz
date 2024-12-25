<template>
    <van-pull-refresh
      v-model="dataRow.freshData.refreshLoad"
      @refresh="onRefresh"
      :class="classMap?.refreshClass"
      @scroll="scrollHander"
      :disabled="disabled"
      ref="refReshList"
    >
      <van-list
        class="lodding_card"
        v-model="dataRow.freshData.listLoading"
        :finished="dataRow?.freshData?.listFinished"
        :immediate-check="true"
        :finished-text="hasList?finishedText:''"
        @load="onLoad"
        :offset="1"
      >
        <slot></slot>
        <van-empty description="暂无数据" v-if="!hasList"/>
      </van-list>

    </van-pull-refresh>
  </template>
  
  <script>
  export default {
    name: "refreshList",
    props:{
      freshMap: {
        type: Object,
        default: () => {
          return {
            refreshLoad: false,
            listLoading: false,
            listFinished: false,
          };
        },
      },
      classMap: {
        type: Object,
        default: () => {
          return {
            refreshClass: "",
          };
        },
      },
      resetScroll: {
        type: Number,
        default: 0,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      hasList: {
        type: Boolean,
        default: true,
      },
      finishedText: {
        type: String,
        default: "没有更多了",
      },
    },
    data() {
      return {
        dataRow:{
          freshData : this.freshMap
        },
      }
    },
    watch:{
      'freshMap.refreshLoad':{
        deep:true,
        handler(){
          this.dataRow={
            freshData : this.freshMap
          }
          this.dataRow.freshData.listLoading = false;
        }
      },
      'freshMap.listFinished':{
        deep:true,
        handler(){
          this.dataRow={
            freshData : this.freshMap
          }
        }
      },
      'freshMap.listLoading':{
        deep:true,
        handler(){
          this.dataRow={
            freshData : this.freshMap
          }
        }
      }
    },
    methods:{
      //下拉刷新
      onRefresh(){
        this.$emit("refresh");
      },
      // 触底加载
      onLoad(){
        if(this.freshMap.listFinished){
          return
        }
        this.$emit("onLoad");
      },
      //重置滚动距离
      resetScrolls(){
        this.$refs.$refReshList.$el.scrollTop = 0;
      },
      //滚动监听
      scrollHander(){
        if(this.resetScroll){
          this.resetScrolls();
        }
      }
    },
  }
  </script>
  
  <style lang="less" scoped>
  .classify_refresh_box {
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  ::v-deep .lodding_card {
    height: 100%;
    min-height: calc(100vh - 60px);
    .van-list__finished-text{
      padding-bottom: 30px;
    }
  }
  </style>
  