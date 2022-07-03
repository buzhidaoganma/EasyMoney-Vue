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
    <!-- <div>
      type:{{ type }}
      <br />
      interval:{{ interval }}
    </div> -->
    <div>
      <ol>
        <li v-for="(group, index) in result" :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li v-for="(item, id) in group.items" :key="id" class="record">
              <!-- {{ item.amount }}
              {{ item.createdAt }} -->
              <!-- ground没有key只能给他定义一个index作为key，然后我的group还是一个数组，我要拿到它里面的数据还要遍历一次 -->
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>¥{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<style lang="scss">
%item {
  padding: 8px 16px; //上下0左右16
  /* min-height: 40px; 不用这个来表示高度8x2+24*/
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center; //这三步是为了他们居中
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item; //继承里面的属性
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>

<script lang="ts">
import intervalList from '@/constants/intervalList'
import recordTypeList from '@/constants/recordTypeList'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
// import Types from '../components/Money_modules/Types.vue'
import Tabs from '../components/Tabs.vue'

@Component({ components: { Tabs } })
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }
  get recordList() {
    return (this.$store.state as RootState).recordList
  } //先拿到这个recordList//添加RootState所以将它放入全局，
  get result() {
    const { recordList } = this
    // const hashTable: { [key: string]: RecordItem[] } = {} //很典型的如何声明一个空对象的类型
    const hashTable: { [key: string]: { title: string; items: RecordItem[] } } =
      {}
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T')
      console.log(date)
      hashTable[date] = hashTable[date] || { title: date, items: [] } //这一步叫做初始化
      hashTable[date].items.push(recordList[i])
    }
    console.log(hashTable)
    return hashTable
  } //再拿到这个结果

  beforeCreate() {
    this.$store.commit('fetchRecords')
  } //我最开始就fetch就不会是空数据了而是我拿到的数据

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
