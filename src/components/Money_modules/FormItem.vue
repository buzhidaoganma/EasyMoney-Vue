<template>
  <div>
    <label class="notes">
      <span class="name">{{ fieldName }}</span>
      <input
        type="text"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class FormItem extends Vue {
  @Prop({ default: '' }) readonly value!: string //!表示不用给我检查了，是否存在了，因为在Prop的括号里有默认值了
  //value只做中转不会对value进行赋值操作
  @Prop({ required: true }) fieldName!: string //自定义备注，{required: true}表示必填
  @Prop() placeholder?: string //?表示有可能不存在
  //我输出这个两个变量fieldName和placeholder他们才能在Money.vue里的FormItem里面使用
  onValueChanged(value: string) {
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
