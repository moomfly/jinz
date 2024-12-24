<template>
  <div>
    <van-uploader v-model="fileList" :multiple="multiple" :max-count="maxNum" @delete="deleteImg" :after-read="afterRead" @change="getUpdate"></van-uploader>
  </div>
</template>

<script>
import { uploadFile } from "@/api";
import {Toast} from "vant";

export default {
  name: "index",
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    maxNum: {
      type: [Number, String],
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      fileList: [],
      listData:[],
      uploadQueue: [] ,// 用于存储待上传的文件
      toastLoading:null
    };
  },
  mounted() {
    this.listData = this.value;
    this.fileList = this.value.map(item =>{ return {url:item}});
  },
  watch: {
    value(val) {
      this.fileList = val.map(item =>{ return {url:item}});
      this.listData = val
    }
  },
  methods: {
    afterRead(fileList) {
      let isArray = fileList instanceof Array;
      try {
        // 是多选
        if (isArray) {
          this.uploadQueue = [...this.uploadQueue, ...fileList]; // 将文件加入上传队列
        } else {
          this.uploadQueue.push(fileList); // 将文件加入上传队列
        }
        this.uploadNextImage(); // 开始上传队列中的第一张图片
      } catch (error) {
        console.error('文件读取失败:', error);
        // 可以在这里显示错误提示
      }
    },
    uploadNextImage() {
      if (this.uploadQueue.length === 0) {
        return; // 如果上传队列为空，则结束上传
      }

      const file = this.uploadQueue.shift(); // 获取队列中的第一个文件
      this.getImgs(file);
    },
    getImgs(file) {
      // 验证文件类型和大小
      if (!file.file.type.startsWith('image/')) {
        this.$toastMsg('仅支持图片文件');
        this.uploadNextImage(); // 继续上传下一个文件
        return;
      }
      if (file.file.size > 5 * 1024 * 1024) { // 限制为5MB
        this.$toastMsg('文件大小超过5MB');
        this.uploadNextImage(); // 继续上传下一个文件
        return;
      }

      let formData = new FormData();
      formData.append('file_object', file.file);
      formData.append('file_type', 'userAvatar');

      uploadFile(formData).then(res => {
        if (res?.code === 200) {
          this.listData.push(res.data.url)
          // 处理文件读取成功的情况
          this.$emit('input', this.listData);
          let that=this
         setTimeout(()=>{
           that.uploadNextImage(); // 上传下一个文件
         },100)
        }
      }).catch(err => {
        this.uploadNextImage(); // 上传下一个文件，即使当前上传失败
      });
    },
    getUpdate(event) {
      console.log(event);
      try {
        // 处理文件选择事件
        const files = event.target.files;
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.afterRead({file, content: URL.createObjectURL(file)});
          }
        }
      } catch (error) {
        console.error('文件选择失败:', error);
        // 可以在这里显示错误提示
      }
    },
    deleteImg(file,data){
      this.listData.splice(data.index,1)
      this.$emit('input', this.listData);
    }
  }
};
</script>

<style scoped lang="less">
::v-deep .van-uploader__preview-image,
::v-deep .van-uploader__upload {
  width: 60px;
  height: 60px;
}
</style>
