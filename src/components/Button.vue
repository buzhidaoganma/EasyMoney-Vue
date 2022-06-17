<template>
  <button class="button" @click="$emit('click', $event)">
    <!-- 你想要什么时间就把组件的 -->
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    //&-表示外面的父元素
    text-align: center;
    padding: 44px;
    margin-top: 0px;
  }
}
</style>
