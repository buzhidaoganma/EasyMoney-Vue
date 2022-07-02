<template>
  <Layout>
    <!-- <Types class-prefix="zzz" :value.sync="yyy" />可以直接用Tabs表示 -->
    <Tabs classPrefix="types" :dataSource="typeList" :value.sync="type" />
    <Tabs
      classPrefix="interval"
      :dataSource="intervalList"
      :value.sync="interval"
    />
    <!-- 就是靠:dataSource="array"把Prop关联起来的 -->
    <div>
      type:{{ type }}
      <br />
      interval:{{ interval }}
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Types from '../components/Money_modules/Types.vue'
import Tabs from '../components/Tabs.vue'

@Component({ components: { Types, Tabs } })
export default class Statistics extends Vue {
  type = '-'
  interval = 'day'
  intervalList = [
    { text: '按天', value: 'day' },
    { text: '按周', value: 'week' },
    { text: '按月', value: 'month' },
  ]
  typeList = [
    { text: '支出', value: '-' },
    { text: '收入', value: '+' },
  ]
}
</script>

<style lang="scss" scoped>
::v-deep .types-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none; //去掉下划线
    }
  }
}
</style>
