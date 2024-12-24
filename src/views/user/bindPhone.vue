<template>
  <div class="bind-phone-form">
    <nav-bar title="绑定手机号"></nav-bar>
    <van-form @submit="onSubmit" style="margin-top: 10px">
      <van-field
          v-model="form.mobile"
          name="mobile"
          label="手机号"
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          :rules="[{ required: true, message: '' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]"
      />
      <van-field
          v-model="form.sms_code"
          name="sms_code"
          label="短信验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '' }]"
      >
        <template #button>
          <van-button size="small" type="primary" :loading="loadingCode" plain color="#f78542" @click="sendVerificationCode">
            {{ isSendingCode ? `${countdown}秒后重新发送` : '发送验证码' }}
          </van-button>
        </template>
      </van-field>
      <div style="margin:50px 16px;">
        <van-button round block type="danger" native-type="submit" :loading="loading" color="#f78542">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {bindPhone, sendCode} from "@/api/user";

export default {
  data() {
    return {
      loading:false,
      isSendingCode: false,
      loadingCode: false,
      countdown: 60,
      form:{
        mobile: '',
        sms_code:''
      }
    };
  },
  mounted() {

    let userInfo=this.$store.state.user.userInfo
    this.form.mobile = userInfo.mobile
  },
  methods: {
    async sendVerificationCode() {
      if (this.isSendingCode || this.loadingCode) return;

      // 验证手机号格式
      const regex = /^1[3-9]\d{9}$/;
      if (!regex.test(this.form.mobile)) {
        this.$toast.fail('手机号格式不正确');
        return;
      }
      this.loadingCode=true
      this.countdown = 60;
      // 模拟发送验证码请求
      try {
        await new Promise((resolve) =>{
          sendCode({mobile:this.form.mobile}).then(res =>{
            if(res?.code == 200){
              resolve()
            }
          })
        });
       // await new Promise((resolve) => setTimeout(resolve, 1000));
        // 这里可以调用实际的发送验证码接口
        this.$toast.success('验证码已发送');
      } catch (error) {
        this.$toast.fail('发送失败，请重试');
      } finally {
        this.loadingCode = false;
        this.isSendingCode = true;
        let that=this
        const interval = setInterval(() => {
          if (that.countdown > 0) {
            that.countdown--;
          } else {
            clearInterval(interval);
            that.isSendingCode = false;
          }
        }, 1000);
      }
    },
    async onSubmit(values) {
      console.log('submit', values);

      // 模拟提交表单请求
      try {
        await new Promise((resolve) => {
          bindPhone(this.form).then(res =>{
            if(res?.code == 200){
              resolve()
            }
          })
        });
        // 这里可以调用实际的提交表单接口
        this.$toast.success('绑定成功');
        this.$store.dispatch('user/GetInfo').then(res =>{

          history.back()
          // 清空表单
          this.form = {
            mobile:'',
            sms_code:''
          };
        })
      } catch (error) {
        this.$toast.fail('绑定失败，请重试');
      }
    },
  },
};
</script>

<style scoped lang="less">
.bind-phone-form {

}
::v-deep .van-cell{
  align-items: center;
}
</style>
