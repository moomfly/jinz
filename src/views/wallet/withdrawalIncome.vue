<template>
  <div>
    <nav-bar title="佣金提现"></nav-bar>
    <div class="withdrawal-balance">
      <van-form  ref="form" @submit="onSubmit">
        <van-field v-model="form.income" name="income" label="余额"  readonly>
          <template #button>
            <van-button size="small" type="info" @click="gotoAll">全部</van-button>
          </template>
        </van-field>
        <van-field v-model="form.cash_amount" name="cash_amount" label="提现余额"
                   placeholder="填写提现余额"
                   :rules="[{ required: true, message: '' },
                   { validator: validateCashAmount, message: '提现金额不能大于余额' },
                   { validator: minCashAmount, message: '提现金额不能为0' }]"
                   type="digit"
                   @input="changeAmount"
        />
        <van-field v-model="form.get_amount" name="get_amount" label="实际到账"  readonly/>
        <van-field v-model="form.cash_name" name="cash_name" label="收款人"  placeholder="请填写"
                   :rules="[{ required: true, message: '' }]" @input="()=>{$forceUpdate()}"/>
        <van-field v-model="form.bank_no" name="bank_no" label="银行卡号"  placeholder="请填写"
                   :rules="[{ required: true, message: '' }]"  @input="()=>{$forceUpdate()}"/>
        <form-selector
            v-model="form.bank_id"
            name="bank_id"
            label="银行名称"
            placeholder="请选择银行"
            displayKey="bank_name"
            valueKey="bank_id"
            :rules="[{ required: true, message: '' }]"
            :columns="bankOptions"
        />
        <div class="tip-box">
          <div>填写提现信息</div>
          <div>1、请仔细核对收款人及账号</div>
          <div>2、提现手续费{{user_income_cash_cate}}%</div>
          <div>3、最少提现金额为{{form.min_cash_amount}}元</div>
          <div>4、提现金额必须是整数</div>
        </div>
        <div style="margin:50px 16px;">
          <van-button round block type="danger" native-type="submit" :loading="loading"  color="#f78542">
            提交申请
          </van-button>
        </div>
      </van-form>

    </div>
  </div>
</template>

<script>
import FormSelector from "@/components/FormSelector/index.vue";
import { bankList, cacheInfo, incomeCash, incomeCashInfo} from "@/api/wallet";
export default {
  name: "withdrawalBalance",
  components: {FormSelector},
  data(){
    return{
      loading:false,
      bankOptions:[],
      form:{

      },
      user_income_cash_cate:1
    }
  },
  mounted() {
    this.getData()
  },
  methods:{
    getData(){
      //获取所有银行
      bankList().then(res =>{
        if(res?.code ===  200){
          this.bankOptions = res?.data

        }
        //获取上次选择的银行卡信息
        cacheInfo().then(res =>{
          if(res?.code ===  200){
            this.form.bank_id=res.data?.bank_id
            this.form.bank_no=res.data?.bank_no
            this.form.cash_name=res.data?.cash_name
            this.$forceUpdate()
          }
        })
      })
      //获取用户余额和手续费
      incomeCashInfo().then(res =>{
        if(res?.code ===  200){
          this.form.income=res.data.income
          this.form.min_cash_amount=res.data.min_cash_amount
          this.user_income_cash_cate=res.data.user_income_cash_cate
          this.$forceUpdate()
        }
      })
    },
    onSubmit(){
      this.loading=true
      console.log('submit', this.form);
      incomeCash(this.form).then(res =>{
        if (res?.code === 200) {
          this.$toastSuccess('申请成功').then(() =>{
            history.back();
          })
        }
      }).catch(er =>{
        this.loading=false
      })
    },
    changeAmount(val){
      let lixi=(val* (this.user_income_cash_cate / 100)).toFixed(2)
      this.form.service_amount=lixi
      this.form.get_amount = this.form.cash_amount - lixi
    },
    gotoAll(){
      //只能取整数 不要四舍五入
      this.form.cash_amount =parseInt(Number(this.form.income))
      this.$forceUpdate()
    },
    validateCashAmount(val) {
      return val <= Number(this.form.income);
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
}
</style>