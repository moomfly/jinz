<template>
  <div>
    <van-field
        readonly
        clickable
        :value="displayValue"
        :name="name"
        :label="label"
        :placeholder="placeholder"
        :rules="rules"
        :required="required"
        @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="columnTexts"
          @confirm="onConfirm"
          @cancel="showPicker = false"
          :value-key="valueKey"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String,Number],
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    rules: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      required: true
    },
    displayKey: {
      type: String,
      default:'name'
    },
    valueKey: {
      type: String,
      default:'id'
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showPicker: false,
      selectedValue: this.value,
      displayValue:   ''
    };
  },
  computed: {
    columnTexts() {
      return this.columns.map(column => column[this.displayKey]);
    }
  },
  mounted() {
    if(this.value){
      let index=this.columns.map(item =>(item[this.valueKey])+'').indexOf(this.value+'')
      console.log(index);
      let row=this.columns[index]
      this.selectedValue = this.value;
      this.displayValue = row[this.displayKey] || '';
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if(newValue){
          let index=this.columns.map(item =>(item[this.valueKey])+'').indexOf(newValue+'')
          let row=this.columns[index]
          this.selectedValue = newValue;
          this.displayValue = row[this.displayKey] || '';
        }
      },
      deep: true
    },
  },
  methods: {
    onConfirm(values,index) {
      const selectedColumn = this.columns[index];
      this.selectedValue = selectedColumn[this.valueKey];
      this.displayValue = values
      this.showPicker = false;
      this.$emit('input', this.selectedValue);
    }
  }
};
</script>

<style scoped>
/* 添加任何需要的样式 */
</style>
