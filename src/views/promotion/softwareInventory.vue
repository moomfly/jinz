<template>
  <div>
    <nav-bar title="软件中心"></nav-bar>
    <div class="withdrawal-balance">
      <van-form  ref="form" @submit="onSubmit">
        <van-field :value="userInfo?.level_id_desc" label="级别"  readonly />
        <van-field :value="userInfo?.activate_num"  label="剩余库存"  readonly />
        <van-field v-model="form.mobile" name="mobile" label="手机号" required placeholder="填写手机号"
                   :rules="[{ required: true, message: '' }]" type="tel" @blur="getUser"/>
        <van-field v-model="form.name" name="name" label="账号信息"  required readonly  :rules="[{ required: true, message: '请输入正确的手机号' }]"/>
        <form-selector
            v-model="form.goal_type"
            name="goal_type"
            label="用途"
            placeholder="请选择"
            :rules="[{ required: true, message: '' }]"
            :columns="bankOptions"
        />
        <van-field v-model="form.use_num" name="use_num" label="使用数量" v-if="form.goal_type == 2"
                   placeholder="填写使用数量" required
                   :rules="[{ required: true, message: '' },
                   { validator: validateCashAmount, message: '使用数量不能大于剩余库存' },
                   { validator: minCashAmount, message: '使用数量最少有1个' }]"
                   type="digit"
                   @input="changeAmount"
        />

        <div class="tip-box">
          <div>温馨提示：</div>
          <div>1、服务商，只能给自己粉丝里的会员出售软件。给粉丝/会员出售10套，对方可升级客户经理，并获得10套商家库存:给粉丝出售1套，对方可升级商家，不会获得库存。客户经理可找服务商补库存;</div>
          <div>2、客户经理，只能给自己团队里的会员出售软件。给粉丝出售1套，对方可升级商家，不会获得库存。商家可找客户经理复购，增加年限。</div>
        </div>
        <div style="margin:50px 16px;">
          <van-button round block type="danger" native-type="submit" :loading="loading"  color="#f78542">
            提交
          </van-button>
        </div>
      </van-form>

    </div>
  </div>
</template>

<script>
import FormSelector from "@/components/FormSelector/index.vue";
import {applyCash, balanceCashInfo, bankList, cacheInfo} from "@/api/wallet";
import {useActivate, userInfoByMobile} from "@/api/promotion";
export default {
  name: "withdrawalBalance",
  components: {FormSelector},
  data(){
    return{
      loading:false,
      bankOptions:[{id:1,name:'激活商家'},{id:2,name:'出售给客户经理'}],
      form:{
        name:'',
        target_user_id:''
      },
      user_balance_cash_cate:1,
      userInfo:null
    }
  },
  mounted() {
    this.userInfo=this.$store.state.user.userInfo
    this.getData()
  },
  methods:{
    getData(){
      //获取用户余额和手续费
      balanceCashInfo().then(res =>{
        if(res?.code ===  200){
          this.form.balance=res.data.balance
          this.form.min_cash_amount=res.data.min_cash_amount
          this.user_balance_cash_cate=res.data.user_balance_cash_cate
          this.$forceUpdate()
        }
      })
    },
    //根据手机号查询客户信息
    getUser(){
      if(!this.form.mobile){
        return
      }
      userInfoByMobile({mobile:this.form.mobile}).then(res =>{
        if(res?.code ===  200){
          if(res.data){
            this.form.target_user_id=res.data.user_id
            this.form.name=res.data.name
          }else{
            this.$toastMsg("手机号输入不正确")
            this.form.name=''
            this.form.target_user_id=''
          }
        }else{
          this.form.name=''
          this.form.target_user_id=''
        }
      })
    },
    onSubmit(){
      this.loading=true
      console.log('submit', this.form);
      if(this.form.goal_type == 1){
        this.form.use_num =1
      }
      useActivate(this.form).then(res =>{
        if (res?.code === 200) {
          this.$toastSuccess('提交成功').then(() =>{
            history.back();
          })
        }
      }).catch(er =>{
        this.loading=false
      })
    },
    changeAmount(val){
      let lixi=(val* (this.user_balance_cash_cate / 100)).toFixed(2)
      this.form.service_amount=lixi
      this.form.get_amount = this.form.cash_amount - lixi
    },
    gotoAll(){
      //只能取整数 不要四舍五入
      this.form.cash_amount =parseInt(Number(this.form.balance))
      this.$forceUpdate()
    },
    validateCashAmount(val) {
      return val <= Number(this.userInfo.activate_num);
    },
    minCashAmount(val) {
      return val > 0
    }
  }
}
</script>


<style scoped lang="less">
.tip-box{
  padding:10px 16px;
  color: #929292;
  line-height: 26px;
  font-size: 14px;
  background: #ffffff;
  margin-top: 10px;
}
</style>