<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource"
      :key="item.value"
      :class="liClass(item)"
      @click="select(item)"
    >
      <!-- 封装了liClass -->
      {{ item.text }}
    </li>
    <!-- 写v-for一定要写key -->
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

type DataSourceItem = { text: string; value: string } //这个重复了我们就给他定义一下不用写这么长了

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[]
  @Prop(String) readonly value!: string
  @Prop(String) classPrefix?: string
  //{required:true}表示你必须传，类型是个数组，dataSource表示你传进来的东西是支出和收入还有对应的‘+’-号,!表示不需要初始化
  //那么这个Tabs就接受一个数据源

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value,
    }
  } //这个箭头函数是放在对象本身上面，底下这个是放在原型上的，所以优先使用正常的函数

  select(item: { text: string; value: string }) {
    this.$emit('update:value', item.value)
    //触发这个事件，事件就是update:value，它的值是item.value
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      //这个符号&表示当前的li里面的selected
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: #333;
    }
  }
}
</style>
