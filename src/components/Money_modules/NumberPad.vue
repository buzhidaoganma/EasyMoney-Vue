<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component
export default class NumberPad extends Vue {
  //@Prop(Number) readonly value!:number;
  //output=this.value.toString()
  output: string = '0'

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement //强制执行类型，把他定义为button
    const input = button.textContent as string //等同于button.textContent!
    if (this.output.length === 16) {
      return
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input
        return
      } else {
        this.output += input
      }
      return
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return
    }
    this.output += input
  }
  remove() {
    const x = this.output.slice(0, -1)
    if (this.output.length === 1) {
      this.output = '0'
    } else {
      this.output = x
    }
  }
  clear() {
    this.output = '0'
  }
  ok() {
    this.$emit('update:value', this.output)
    this.$emit('submit', this.output)
    this.output = '0' //点击OK后重置为0
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace; //这个是引入系统字体
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }
  .buttons {
    @extend %clearFix; //我复制了%x这个选择器
    button {
      width: 25%;
      height: 64px; //7.9vh整个屏幕的高度的7.9%
      float: left; //左边搞一列
      background: transparent; //干掉背景色
      border: none; //干掉border
      &.ok {
        height: 64 * 2px;
        float: right; //右边搞一列
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>
