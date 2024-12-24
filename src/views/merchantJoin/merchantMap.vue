<template>
  <div style="width: 100%; height: 100%">
    <iframe
        id="mapPage"
        width="100%"
        height="100%"
        frameborder="0"
        :src="mapUrl">
    </iframe>
  </div>
</template>

<script>
export default {
  name: "merchantMap",
  data() {
    return {
      latlng: {},
      messageHandler: null,
    };
  },
  computed: {
    mapUrl() {

       return `https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=MDOBZ-JTI3L-ODLPU-M5442-EM5P2-7CF3Q&referer=myapp&center=${this.defaultLat},${this.defaultLng}&init=${this.defaultLat},${this.defaultLng}`;
    }
  },
  mounted() {
    let that = this;
    this.messageHandler = function (event) {
      // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
      var loc = event.data;
      if (loc && loc.module == 'locationPicker') { // 防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        that.latlng = loc.latlng;
        that.$router.replace({path: '/merchantJoin'});
      }
    };
    window.addEventListener('message', this.messageHandler, false);
  },
  beforeDestroy() {
    // 移除事件监听器
    window.removeEventListener('message', this.messageHandler, false);
  },
  beforeRouteLeave(to, from, next) {
    // 将数据保存到本地存储
    localStorage.setItem('mapParams', JSON.stringify(this.latlng));
    next();
  }
};
</script>

<style scoped lang="less">
</style>
