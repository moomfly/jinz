<!-- CitySelector.vue -->
<template>
  <div>
    <van-field
        readonly
        clickable
        :value="displayValue"
        :label="label"
        :placeholder="placeholder"
        :rules="rules"
        :required="required"
        is-link
        @click="showCascader = true"
    />
    <van-popup v-model="showCascader" position="bottom">
      <van-cascader
          v-model="selectedValue"
          :options="cityData"
          :title="placeholder"
          active-color="#f78542"
          @close="showCascader = false"
          @finish="onFinish"
      />
    </van-popup>
  </div>
</template>

<script>


export default {
  name: "CitySelector",
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    required: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    listData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      showCascader: false,
      selectedValue: '',
      cityData: []
    };
  },
  mounted() {
    this.selectedValue = this.value; // 确保初始化时 selectedValue 和 value 一致
    this.cityData=this.listData
  },
  computed: {
    displayValue() {
      const values = this.selectedValue.split(',');
      return values.map(value => {
        const item = this.findItemByValue(this.cityData, value);
        return item ? item.text : '';
      }).join(' ');
    }
  },
  watch: {
    listData: {
      handler(newVal) {
        this.cityData=newVal
      },
      immediate: true,
      deep:true
    },
    value: {
      handler(newVal) {
        this.selectedValue = newVal;
      },
      immediate: true
    },
    selectedValue: {
      handler(newVal) {
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    findItemByValue(options, value) {
      for (const option of options) {
        if (option.value === value) {
          return option;
        }
        if (option.children) {
          const result = this.findItemByValue(option.children, value);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
    onFinish({ selectedOptions }) {
      this.selectedValue = selectedOptions.map(option => option.value).join(',');
      this.showCascader = false;
    }
  }
};
</script>

<style scoped>
/* 添加任何需要的样式 */
</style>
