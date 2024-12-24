<template>
  <div class="bind-phone-form">
    <nav-bar title="商家申请入驻"></nav-bar>
    <van-form  ref="form">
      <div v-if="form.examine_status == 2 || form.examine_status == 0">
        <van-field  label="申请状态"  placeholder="">
          <template #input>
            <span style="color: red" v-if="form.examine_status == 2">审核失败</span>
            <span style="color: #009dff" v-else>审核中</span>
          </template>
        </van-field>
        <van-field  label="审核备注"  placeholder="" v-if="form.examine_status == 2 ">
          <template #input>
            <span style="color: red">{{form.examine_msg }}</span>
          </template>
        </van-field>
      </div>
      <van-field v-model="form.name" name="name" label="商户名称" required placeholder="填写商户简称"
          :rules="[{ required: true, message: '' }]"/>
      <city-selector v-model="form.merchant_cate_id"
                     name="merchant_cate_id"
                     label="所属分类"
                     :list-data="typeData"
                     placeholder="选择主营分类"
                     :rules="[{ required: true, message: '' }]"/>
      <van-field v-model="form.business" name="business" label="主营项目" required placeholder="填写主要产品或服务内容"
                 :rules="[{ required: true, message: '' }]"/>
      <van-field v-model="form.per_price" name="per_price" type="digit" label="人均消费" required placeholder="例如100"
                 :rules="[{ required: true, message: '' }]"/>
      <van-field v-model="form.blurb" name="blurb" label="简单介绍" rows="2" type="textarea" autosize required placeholder="简单介绍下商户"
                 :rules="[{ required: true, message: '' }]"/>
      <van-field v-model="form.cont_name" name="cont_name" label="联系人" required placeholder="填写本人姓名" style="margin-top: 10px"
                 :rules="[{ required: true, message: '' }]"/>
      <van-field v-model="form.cont_mobile" name="cont_mobile" type="tel" label="联系电话" required placeholder="填写本人实名的手机号" :maxlength1="11"
                 :rules="[{ required: true, message: '' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]"/>
      <van-field v-model="form.mer_phone" name="mer_phone" label="店铺电话" required placeholder="填写店铺电话"
                 :rules="[{ required: true, message: '' }]"/>
      <div class="form-tip">请仔细填写联系方式，保证我们能尽快联系到您~ </div>
      <div class="form-name" style="margin-top: 10px">推广比例 =5%  </div>
      <form-selector
          v-model="form.m_rate"
          name="m_rate"
          label="商家福利"
          placeholder="请选择商家福利"
          :rules="[{ required: true, message: '' }]"
          :columns="benefitOptions"
      />
      <van-field   name="legal_id_card_front_img" label="身份证-正面" required :rules="[{ required: true, message: '上传身份证正面照' }]">
        <template #input>
          <uploader-img v-model="form.legal_id_card_front_img"  :maxNum="1" :multiple="false" ></uploader-img>
        </template>
      </van-field>
      <van-field   name="legal_id_card_back_img" label="身份证-反面" required  :rules="[{ required: true, message: '上传身份证反面照' }]">
        <template #input>
          <uploader-img v-model="form.legal_id_card_back_img"  :maxNum="1" :multiple="false"></uploader-img>
        </template>
      </van-field>
      <van-field v-model="form.legal_id_card" name="legal_id_card" label="身份证" type="number" required placeholder="填写法人身份证"
                 :rules="[{ required: true, message: '' }, { pattern: idCardPattern, message: '身份证号码格式不正确' }]"/>
      <van-field   name="business_license_img" label="营业执照" required  :rules="[{ required: true, message: '上传营业执照' }]">
        <template #input>
          <uploader-img v-model="form.business_license_img"  :maxNum="1" :multiple="false" ></uploader-img>
        </template>
      </van-field>
      <van-field   name="avatar" label="LOGO" required   :rules="[{ required: true, message: '上传店铺LOGO或门头照' }]">
        <template #input>
          <uploader-img v-model="form.avatar" :maxNum="1" :multiple="false"  ></uploader-img>
        </template>
      </van-field>
      <div class="form-name">店面照片至少上传5张</div>

      <van-field   name="img_dn" label="店面照片" required :rules="[{ required: true, message: '上传5张不同的店内环境照' }]">
        <template #input>
          <uploader-img v-model="form.img_dn" ></uploader-img>
        </template>
      </van-field>
      <city-selector v-model="form.city"
                     name="city"
                     label="店面地址"
                     :list-data="cascaderAreaData"
                     placeholder="选择店铺所在省市区"
                     :rules="[{ required: true, message: '' }]"/>
      <van-field v-model="form.addr_detail" name="addr_detail" label="店面详细 地址" rows="1" type="textarea" autosize required placeholder="填写店铺详细地址"
                 :rules="[{ required: true, message: '' }]"/>

      <van-field v-model="form.map_lng" name="map_lng" label="获取定位" is-link  required placeholder="去获取" readonly
                 :rules="[{ required: true, message: '' }]">
        <template #input>
            <div style="text-align: right;width: 100%" @click="gotoPath">{{form.map_lng?'去修改': '去获取'}}</div>
        </template>
      </van-field>
      <van-field   name="img_mm" label="门面" required :rules="[{ required: true, message: '上传店铺门面' }]">
        <template #input>
          <uploader-img v-model="form.img_mm" ></uploader-img>
        </template>
      </van-field>
      <van-field   name="img_dt" label="大堂" required :rules="[{ required: true, message: '上传店铺大堂' }]">
        <template #input>
          <uploader-img v-model="form.img_dt" ></uploader-img>
        </template>
      </van-field>
      <TimeRangePicker v-model="form.timeRange" name="timeRange"
                       label="营业时间"
                       placeholder="填写营业时间"
                       :rules="[{ required: true, message: '' }]"/>
<!--      <van-field v-model="form.mobile" name="mobile" label="营业时间"  placeholder="填写营业时间"
                 :rules="[{ required: true, message: '' }]">-->
      <div style="padding:30px 16px;display: flex">
        <van-button  block plain  type="info" native-type="button" :loading="loading"  @click="handleButtonClick('save', false)"
                     color="#f78542"  style="border-top-left-radius:10px ;border-bottom-left-radius:10px ;">
          暂存
        </van-button>
        <van-button block type="danger" native-type="submit" :loading="loading"   @click="handleButtonClick('apply', true)"
                    color="#f78542" style="border-top-right-radius:10px ;border-bottom-right-radius:10px ;">
          立即申请入驻
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import FormSelector from '@/components/FormSelector/index.vue';
import UploaderImg from '@/components/UploaderImg/index.vue';
import CitySelector from '@/components/CitySelector/index.vue';
import TimeRangePicker from '@/components/TimeRangePicker/index.vue';
import {merchantApply, merchantApplyDetail,merchantApplyEdit} from "@/api/merchant";
import {homeCateChild} from "@/api/home";
import cityArea from '@/utils/area'

export default {
  name:'MerchantJoin',
  components: {
    FormSelector,UploaderImg,CitySelector,TimeRangePicker
  },
  data() {
    return {
      cascaderAreaData:[],
      loading:false,
      isSendingCode: false,
      loadingCode: false,
      countdown: 60,
      form:{
        city: '',
        timeRange: '',
        map_lng:'',
      },
      typeData:[],
      benefitOptions: [ { id: '5', name: '5%' }, { id: '10', name: '10%' },{ id: '15', name: '15%' },{ id: '20', name: '20%' },{ id: '25', name: '25%' },],
      idCardPattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/,
      lnglat:null
    };
  },
  beforeRouteEnter(to, from, next) {
    // 从本地存储中恢复数据
    next(vm => {
      const mapParams = JSON.parse(localStorage.getItem('mapParams'));
      if (mapParams && mapParams.lng) {
        vm.lnglat = mapParams;
      }
    });
  },
  activated() {
    this.getDetail()
  },
  mounted() {
    this.cascaderAreaData=cityArea
    this.getData()
  },
  methods: {
    getDetail(){
      merchantApplyDetail().then(res =>{
        if (res?.code === 200  && res.data) {
          this.form=res?.data
          this.form.legal_id_card_front_img = this.getImgs(this.form.legal_id_card_front_img)
          this.form.legal_id_card_back_img = this.getImgs(this.form.legal_id_card_back_img)
          this.form.business_license_img = this.getImgs(this.form.business_license_img)
          this.form.avatar = this.getImgs(this.form.avatar)
          this.form.merchant_cate_id = this.form.merchant_cate_id+''
          this.form.timeRange=this.form.open_time?this.form.open_time+'-'+this.form.close_time:''
          this.form.city=this.form.addr_province_id?this.form.addr_province_id+','+this.form.addr_city_id+','+this.form.addr_area_id:''

          if(this.lnglat){
            this.form.map_lng = this.lnglat.lng;
            this.form.map_lat = this.lnglat.lat;
          }
        }
      })
    },
    getData(){

      homeCateChild().then(res =>{
        if (res?.code === 200) {
          this.typeData = res?this.transformData(res.data):[];
        }
      })
    },
    getImgs(imgs){
      if(!imgs){
        return []
      }
      return [imgs]
    },
    transformData(data) {
      return data.map(item => {
        const transformedItem = {
          value: item.merchant_cate_id+'',
          text: item.name
        };
        if (item.children && item.children.length > 0) {
          transformedItem.children = this.transformData(item.children);
        }
        return transformedItem;
      });
    },
    handleButtonClick(buttonType, ) {
      if (buttonType === 'save') { // 暂存
        this.onSubmit('10', false);
      } else if (buttonType === 'apply') { // 申请
        this.onSubmit('0', true);
      }
    },
    async onSubmit(type, validate) {
      if (validate) {
        // 进行表单校验
        this.$refs.form.validate().then(() => {
          if( this.form.img_dn && this.form.img_dn.length < 4 ){
            this.$toast('请至少上传5张店内环境照');
            return
          }
          this.submitForm(type);
        }).catch(() => {
          // 校验失败
          this.$toast.fail('还有必填项未填');
        });
      } else {
        // 不进行表单校验，直接提交
        this.submitForm(type);
      }
    },
    async submitForm(type,valid) {
      this.loading=true
      let data=JSON.parse(JSON.stringify(this.form))
      let citys=data.city?.split(",")
      data.addr_province_id = citys[0] || 0
      data.addr_city_id = citys[1] || 0
      data.addr_area_id = (citys.length > 2?citys[2]:'') || 0
      let timeRange=data.timeRange.split("-")
      data.open_time = timeRange[0]?timeRange[0].trim():''
      data.close_time = timeRange[1]?timeRange[1].trim() : ''
      data.legal_id_card_front_img=this.getUrl(this.form.legal_id_card_front_img)
      data.legal_id_card_back_img=this.getUrl(this.form.legal_id_card_back_img)
      data.avatar=this.getUrl(this.form.avatar)
      data.business_license_img=this.getUrl(this.form.business_license_img)
      console.log('submit',this.form, type);
      let merchant_cate_id=this.form?.merchant_cate_id?.split(",") || []
      data.merchant_cate_id=merchant_cate_id[merchant_cate_id.length - 1] || 0
      data.examine_status=type
      // 模拟提交表单请求
      try {
        await new Promise((resolve) => {
          let urlApi=this.form.merchant_id?merchantApplyEdit:merchantApply
          urlApi(data).then(res =>{
            if(res?.code == 200){
              resolve()
            }
          }).catch(()=>{
            this.loading=false
          })
        });
        if(!valid){
          // 这里可以调用实际的提交表单接口
          this.$toastSuccess(type == 10?'保存成功':'申请入驻成功').then(() =>{
            this.loading=false
            this.$router.replace({path: '/user'})
          })
        }else{
          this.loading=false
        }

      } catch (error) {
        this.loading=false
        this.$toast.fail('申请失败，请重试');
      }
    },
    getUrl(list){
      if(!list || list.length == 0){
        return ''
      }
      return list[0]
    },
    gotoPath(){
      this.submitForm(10,true);
      this.$router.push({path: '/merchantMap'})
    }
  },
};
</script>

<style scoped lang="less">

::v-deep .van-cell{
  align-items: flex-start;
  .van-field__label{
    width: 70px;
  }
}
::v-deep .van-cell--required::before{
  top: 11px;
}
.form-tip{
  background: #ffffff;
  font-size: 11px;
  color: #adadad;
  padding: 6px 10px;
}
.form-name{
  background: #ffffff;
  padding: 10px 15px;
  color: #8f3600;
  font-size: 13px;
  border-bottom: 1px #f9f9f9 solid;

}
</style>
