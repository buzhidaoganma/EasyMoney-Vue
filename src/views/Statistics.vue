<template>
  <Layout>
    <!-- <Types class-prefix="zzz" :value.sync="yyy" />可以直接用Tabs表示 -->
    <Tabs classPrefix="types" :dataSource="recordTypeList" :value.sync="type" />
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
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
// import Types from '../components/Money_modules/Types.vue'
import Tabs from '../components/Tabs.vue'

@Component({ components: { Tabs } })
export default class Statistics extends Vue {
  type = '-'
  interval = 'day'
  intervalList = intervalList
  recordTypeList = recordTypeList
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
::v-deep .interval-tabs-item {
  height: 48px;
} //刚写这个48的时候没有反应，可以写48px!important强制生效，不过一般不写
//原因是由于外边的li优先级比较高，所以48没有生效，所以写li.interval,这是一种方法提高里面的优先级
//第二种降低外面的优先级
</style>
