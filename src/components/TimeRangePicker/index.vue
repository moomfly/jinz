<!-- TimeRangePicker.vue -->
<template>
  <div>
    <van-field
        readonly
        clickable
        :value="timeRangeDisplay"
        :label="label"
        :placeholder="placeholder"
        :rules="rules"
        :required="required"
        @click="showStartTimePicker = true"
    >
      <template #input>
        <div style="display: flex; align-items: center; width: 100%">
          <div @click.stop="showStartTimePicker = true" style="width: 40%; text-align: center">
            <span v-if="!startTime" style="color: #929292">开始时间</span>
            <span v-else>{{ startTime }}</span>
          </div>
          <span>-</span>
          <div @click.stop="showEndTimePicker = true" style="width: 40%; text-align: center">
            <span v-if="!endTime" style="color: #929292">结束时间</span>
            <span v-else>{{ endTime }}</span>
          </div>
        </div>
      </template>
    </van-field>

    <van-popup v-model="showStartTimePicker" position="bottom">
      <van-datetime-picker
          v-model="startTime"
          type="time"
          :min-hour="0"
          :max-hour="23"
          :min-minute="0"
          :max-minute="59"
          :formatter="formatter"
          :filter="filter"
          @confirm="onStartTimeConfirm"
          @cancel="showStartTimePicker = false"
      />
    </van-popup>

    <van-popup v-model="showEndTimePicker" position="bottom">
      <van-datetime-picker
          v-model="endTime"
          type="time"
          :min-hour="0"
          :max-hour="23"
          :min-minute="0"
          :max-minute="59"
          :formatter="formatter"
          @confirm="onEndTimeConfirm"
          :filter="filter"
          @cancel="showEndTimePicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "TimeRangePicker",
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
  },
  data() {
    return {
      showStartTimePicker: false,
      showEndTimePicker: false,
      startTime: null,
      endTime: null,
    };
  },
  computed: {
    startTimeDisplay() {
      return this.startTime ? this.formatTime(this.startTime) : '';
    },
    endTimeDisplay() {
      return this.endTime ? this.formatTime(this.endTime) : '';
    },
    timeRangeDisplay() {
      return `${this.startTimeDisplay || '开始时间'} - ${this.endTimeDisplay || '结束时间'}`;
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          const [start, end] = newVal.split('-');
          this.startTime = start || null;
          this.endTime = end || null;
        } else {
          this.startTime = null;
          this.endTime = null;
        }
      },
      immediate: true
    },
    startTime(newVal) {
      /*if (newVal && this.endTime && newVal >= this.endTime) {
        this.endTime = new Date(newVal.getTime());
        this.endTime.setMinutes(this.endTime.getMinutes() + 1);
      }*/
      this.updateValue();
    },
    endTime(newVal) {
      /*if (newVal && this.startTime && newVal <= this.startTime) {
        const startTimeDate = new Date(this.startTime);
        this.endTime = new Date(startTimeDate.getTime());
        this.endTime.setMinutes(startTimeDate.getMinutes() + 1);
      }*/
      this.updateValue();
    }
  },
  methods: {
    formatter(type, value) {
      if (type === 'hour') {
        return `${value}时`;
      }
      if (type === 'minute') {
        return `${value}分`;
      }
      return value;
    },
    formatTime(date) {
      if (!(date instanceof Date)) {
        return date;
      }
      if( isNaN(date)){
        return  ''
      }
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    onStartTimeConfirm(value) {
      this.startTime = value;
      this.showStartTimePicker = false;
      this.$forceUpdate()
    },
    onEndTimeConfirm(value) {
      this.endTime = value;
      this.showEndTimePicker = false;
      this.$forceUpdate()
    },
    updateValue() {
      const start = this.startTime ? this.formatTime(this.startTime) : '';
      const end = this.endTime ? this.formatTime(this.endTime) : '';
      this.$emit('input', start && end ? `${start} - ${end}` : '');
    },
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 15 === 0);
      }
      return options;
    },
  }
};
</script>

<style scoped>
/* 添加任何需要的样式 */
</style>
