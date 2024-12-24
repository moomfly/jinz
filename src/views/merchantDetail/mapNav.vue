<template>
  <div class="map-container">
    <nav-bar title="商家导航"></nav-bar>
    <div id="container" class="map"></div>
    <div>
      <van-button type="info" block @click="showMapOptions">点击导航</van-button>
      <van-action-sheet v-model:show="showActionSheet" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showActionSheet: false,
      actions: [
        { name: '高德地图' },
        { name: '腾讯地图' },
        { name: '百度地图' },
      ],
      paramsRow:{},
      maps:null,
      startLocation: [116.397428, 39.90923], // 起点坐标
      endLocation:[], // 终点坐标
    };
  },
  mounted() {
    this.paramsRow=JSON.parse(this.$route.query.data)
    this.getInit()
    this.endLocation=[Number(this.paramsRow.map_lng),Number(this.paramsRow.map_lat)]
  },
  methods: {
    getInit(){
      let center=new qq.maps.LatLng(Number(this.paramsRow.map_lat), Number(this.paramsRow.map_lng))
      // 创建地图实例
      this.map = new qq.maps.Map(document.getElementById("container"), {
        center: center, // 地图中心点坐标
        zoom: 16, // 地图缩放级别
      });

      // 在地图上添加标记
      const marker = new qq.maps.Marker({
        position: center, // 标记位置坐标
        map: this.map,
      });
      // 创建信息窗口
     let infoWindow = new qq.maps.InfoWindow({
        map: this.map,
        content: `<div><strong>${this.paramsRow.name}</strong><br>${this.paramsRow.adder}</div>`,
        position: center,
      });
      // 打开信息窗口
      infoWindow.open();
      // 绑定点击事件
      qq.maps.event.addListener(marker, 'click', () => {
        infoWindow.open();
      });
    },
    showMapOptions() {
      this.showActionSheet = true;
    },
    onSelect(action) {
      this.showActionSheet = false;
      switch (action.name) {
        case '高德地图':
          this.openAmap();
          break;
        case '腾讯地图':
          this.openTencentMap();
          break;
        case '百度地图':
          this.openBaiduMap();
          break;
        default:
          break;
      }
    },
    openAmap() {
      const url = `https://uri.amap.com/marker?position=${this.endLocation[0]},${this.endLocation[1]}&name=${encodeURIComponent(this.paramsRow.name)}&src=mypage&coordinate=gcj02`;
      window.location.href = url;
    },
    openTencentMap() {
      const url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${this.endLocation[1]},${this.endLocation[0]};title=${encodeURIComponent(this.paramsRow.name)}&referer=YourReferer`;
      window.location.href = url;
    },
    openBaiduMap() {
      // 将终点位置从 GCJ-02 转换为 BD-09
      // 将终点位置从 GCJ-02 转换为 BD-09
      const bdEndLocation = this.gcj02_to_bd09(this.endLocation[0], this.endLocation[1]);
      /* // 将起点位置从 GCJ-02 转换为 BD-09
       const bdStartLocation = this.gcj02ToBd09(this.startLocation[0], this.startLocation[1]);

       const url = `http://api.map.baidu.com/direction?origin=${bdStartLocation.lat},${bdStartLocation.lng}&destination=${bdEndLocation.lat},${bdEndLocation.lng}&mode=driving&output=html&src=YourReferer`;
       window.location.href = url;*/
      const url = `http://api.map.baidu.com/direction?destination=${bdEndLocation.latitude},${bdEndLocation.longitude}&mode=driving&output=html&src=YourReferer`;
       window.location.href = url;
    },
    gcj02_to_bd09(gcjLat, gcjLng) {
      // 定义π
      const PI = 3.14159265358979324;
      // 定义x和y的偏移量
      const xPi = PI * 3000.0 / 180.0;
      let z = Math.sqrt(gcjLat * gcjLat + gcjLng * gcjLng) + 0.00002 * Math.sin(gcjLat * xPi);
      let theta = Math.atan2(gcjLat, gcjLng) + 0.000003 * Math.cos(gcjLng * xPi);
      let bdLat = z * Math.sin(theta) + 0.006; let bdLng = z * Math.cos(theta) + 0.0065;
      return { latitude: bdLat, longitude: bdLng };
    }

  },
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.map {
  width: 100%;
  height: calc(100%  - 90px);
}

::v-deep .van-button {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
</style>
