<template>
  <div class="edit-user-info">
    <nav-bar title="会员资料"></nav-bar>
    <!---->
    <div class="du-wx" v-if="isWeChatBrowser"  @click="loginWithWeChat">读取微信资料</div>
    <van-form @submit="onSubmit">
      <van-field name="avatar" label="头像" input-align="right" is-link placeholder="请选择头像">
        <template #input>
          <van-uploader  :max-count="1"  :after-read="afterRead" @change="getUpdate" >
            <van-image round width="40" height="40" :src="userInfo.avatar"/>
          </van-uploader>
        </template>
      </van-field>
      <van-field v-model="userInfo.name" name="name" label="名称" :rules="[{ required: true, message: '' }]" placeholder="请输入名称" />
<!--      <van-field v-model="userInfo.mobile" name="phone" label="手机号" placeholder="请输入手机号" type="tel" right-icon="arrow"/>-->
      <van-cell title="手机号" is-link :value="userInfo.mobile || '未绑定手机号'" to="/bindPhone">
        <template #right-icon>
          <div style="color: #929292;display: flex;align-items: center">
            <span>绑定</span>
            <van-icon name="arrow" class="search-icon" />
          </div>
        </template>
      </van-cell>
      <div style="margin:50px 16px;">
        <van-button round block type="danger" native-type="submit" :loading="loading"  color="#f78542">
          保存
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import {editUserInfo, wxUserInfo} from "@/api/user";
import {uploadFile} from "@/api";

export default {
  name: "editUserInfo",
  data() {
    return {
      userInfo: {
        avatar: '',
        nickname: '',
        phone: '',
        name: '',
      },
      currentDate: new Date(),
      fileList:[],
      isWeChatBrowser:false,
      loading:false,
    };
  },
  created() {
    this.userInfo=this.$store.state.user.userInfo
    this.fileList=[{url:this.userInfo.avatar}] 
    // 检测是否在微信浏览器中打开
    this.isWeChatBrowser = /MicroMessenger/i.test(navigator.userAgent);
    //从链接中获取code
    let url =window.location.href
    if(url.indexOf("code=") > -1){
      let code = url.split('code=')[1].split('&')[0];
      if(code){
        wxUserInfo({code:code}).then(res =>{
          if (res?.code === 200) {
            this.userInfo.name=res.data.name
            this.userInfo.avatar=res.data.avatar
          }
        })
      }
    }
  },
  methods: {

    loginWithWeChat() {
      this.getWxLogin("snsapi_userinfo")
    },
    onSubmit(values) {
      this.loading=true
      console.log('submit', values);
      editUserInfo(this.userInfo).then(res =>{
        if (res?.code === 200) {
          this.$toastSuccess('保存成功').then(() =>{
            this.$router.replace({path: '/user'})
          })
        }
      }).catch(er =>{
        this.loading=false
      })
      // 这里可以添加保存用户资料的逻辑
    },
    afterRead(file){
      try {
        // 验证文件类型和大小
        if (!file.file.type.startsWith('image/')) {
          this.$toastMsg('仅支持图片文件');
          return
        }
        if (file.file.size > 5 * 1024 * 1024) { // 限制为5MB
          this.$toastMsg('文件大小超过5MB');
          return;
        }
        let formData = new FormData();
        formData.append('file_object', file.file);
        formData.append('file_type', 'userAvatar');
        uploadFile(formData).then(res =>{
          if(res?.code===200){
            // 处理文件读取成功的情况
            this.userInfo.avatar = res.data.url;
          }
        })

      } catch (error) {
        console.error('文件读取失败:', error);
        // 可以在这里显示错误提示
      }
    },
    getUpdate(event){
      console.log(event);
      try {
        // 处理文件选择事件
        const file = event.target.files[0];
        if (file) {
          this.afterRead({ file, content: URL.createObjectURL(file) });
        }
      } catch (error) {
        console.error('文件选择失败:', error);
        // 可以在这里显示错误提示
      }
    },
  },
};
</script>

<style scoped lang="less">
.edit-user-info {
  .van-field__label {
    width: 80px;
  }
  ::v-deep .van-cell{
    align-items: center;
    margin-top: 10px;
  }
  ::v-deep .van-cell__value{
    flex: 2;
    text-align: left;
    color: #323233;
  }
}
.du-wx{
  color: #fd4241;
  padding: 10px 10px 0;
  text-align: right;
  text-decoration: underline;
  font-size: 15px;
}
</style>
