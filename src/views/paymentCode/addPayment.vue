<template>
<div>
  <nav-bar :title="form?.merchant_device_id?'修改收款码':'新增收款码'"></nav-bar>
  <van-form @submit="onSubmit" style="margin-top: 10px">
    <div class="color-gray font13 m15-l p10-b">收款码信息</div>
    <van-field
        v-model="form.device_name"
        name="device_name "
        label="名称"
        placeholder="如：xxx店，xxx门"
        :rules="[{ required: true, message: '' }]"
    />
    <van-field
        v-if="form?.merchant_device_id"
        v-model="form.device_no"
        name="device_no "
        label="编号" disabled
        placeholder=" "
    />

    <div style="margin:50px 16px;">
      <van-button round block type="danger" native-type="submit" :loading="loading" color="#f78542">
        提交
      </van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import {deviceEdit, deviceAdd} from "@/api/user";
import {set} from "vue";

export default {
  name: "addPayment",
  data(){
    return{
      form:{},
      loading:false,
    }
  },
  mounted() {
    this.form=this.$route.query?JSON.parse(this.$route.query.data):{}
    console.log(this.form);
  },
  methods:{
    async onSubmit(values) {
      try {
        this.loading=true
        await new Promise((resolve) => {
          let urlApi=this.form.merchant_device_id?deviceEdit:deviceAdd
          urlApi(this.form).then(res =>{
            if(res?.code == 200){
              resolve()
            }
          })
        });
        // 这里可以调用实际的提交表单接口
        this.$toastSuccess('提交成功').then(() =>{
          history.back();
        })
      } catch (error) {
        this.$toast.fail('提交成功，请重试');
        this.loading=false
      }
    }
  }
}
</script>


<style scoped lang="less">

</style>