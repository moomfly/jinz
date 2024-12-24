<template>
  <div class="login-page">
    <div class="login-content">
      <van-nav-bar>
        <template #title>
          <div class="title">
            登录
          </div>
        </template>
      </van-nav-bar>
      <van-form @submit="onSubmit">
        <van-field v-model="form.login_no" name="login_no" label="账号" placeholder="请输入账号"
                   :rules="[{ required: true, message: '' }]" />
        <van-field v-model="form.login_pwd" type="password" name="login_pwd" label="密码" placeholder="请输入密码"
                   :rules="[{ required: true, message: '' }]"  />
        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit">登录</van-button>
        </div>
      </van-form>
      <router-link to="/register" class="link">还没有账号,去注册</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      form:{
        login_no:null,
        login_pwd:null
      }
    };
  },
  methods: {
     onSubmit() {

       let fidId = sessionStorage.getItem('fid')
       this.form.parent_user_id = fidId || 0
       this.$store.dispatch('user/Login', this.form).then(res => {
         console.log(res);
        //this.$store.dispatch('user/GetInfo').then(ress =>{})
         let path=localStorage.getItem("goPath")
         path=path==='null'?'':path
         console.log(path);
        this.$router.replace({path: path || history.back()});
         setTimeout( ()=>{
           localStorage.setItem("goPath",null)
         },1000)
       }).catch(error => {
         console.error('登录失败', error);
         // 处理登录失败后的逻辑
       });
     /*  this.$store.state.Login(this.form).then(res =>{
         if (res?.code === 200) {

          // this.$router.replace({path: "/"});
         }
       })*/
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  background-image: url("~@/assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.9;

  .login-content {
    margin: auto;
    padding: 10px 10px 20px 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    opacity: 0.9;

    .title {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .link {
    font-size: 12px;
    color: #069;
    float: right;
    margin-right: 15px;
  }
}
</style>
