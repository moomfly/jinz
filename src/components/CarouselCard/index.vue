
<template>
    <div class="carousel" ref="article-carousel">
      <van-swipe :autoplay="3000" lazy-render :show-indicators="showIndicators" >
        <van-swipe-item v-for="(image, index) in dataRow" :key="index">
          <van-image class="img-box" lazy-load  :src="image.url" @click="openImage(image,index)"></van-image>
        </van-swipe-item>
      </van-swipe>
    </div>
  </template>
  
  <script >
  import { ImagePreview } from 'vant'
  export default {
    name: "Carousel",
    props:{
      carouselList: {
        type: Array,
        default: () => {
          return [];
        },
      },
      //是否显示指示器
      showIndicators:{
        type: Boolean,
        default: true
      },
      isOpen:{
        type: Boolean,
        default: true
      }
    },
    data(){
      return{
        dataRow:this.carouselList,
        imageRow:this.carouselList.map(item =>{return item.url})
      }
    },
    watch:{
      carouselList:{
        deep:true,
        handler(){
          this.dataRow=this.carouselList
          this.imageRow= this.carouselList.map(item =>{return item.url})
        }
      }
    },
    methods:{
      openImage(row,index){
        if(!this.isOpen)return
        if(row.jump_url){
          if(row.jump_url.indexOf("http") > -1){
            window.location.href=row.jump_url
          }else{
            this.$router.push({
              path: row.jump_url,
            });
          }

        }else{
          ImagePreview({
            images: this.imageRow,
            startPosition: index,
          });
        }
       /* */
      }
    }
  }
  </script>
  <style lang="less">
  .carousel {
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    .van-swipe{
      height: 100%;
    }
    .img-box {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
    }
  }
  </style>