<template>
  <van-empty :description="desc" class="custom-image" :image="imageSrc">
    <van-button round type="danger" class="bottom-button">
      {{ btnContent }}
    </van-button>
  </van-empty>
</template>

<script>
export default {
  name: "Empty",
  props: {
    desc: {
      type: String,
    },
    imageSrc: {
      type: String,
    },
    btnContent: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
