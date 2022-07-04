<template>
  <Layout>
    <!-- <Types class-prefix="zzz" :value.sync="yyy" />可以直接用Tabs表示 -->
    <Tabs classPrefix="types" :dataSource="recordTypeList" :value.sync="type" />
    <!-- <Tabs
      classPrefix="interval"
      :dataSource="intervalList"
      :value.sync="interval"
    /> 这个没必要按周按月了-->
    <!-- 就是靠:dataSource="array"把Prop关联起来的 -->
    <!-- <div>
      type:{{ type }}
      <br />
      interval:{{ interval }}
    </div> -->
    <div>
      <ol>
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }}</h3>
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
import clone from '@/lib/clone'
import dayjs from 'dayjs'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
// import Types from '../components/Money_modules/Types.vue'
import Tabs from '../components/Tabs.vue'

const oneDay = 86400 * 1000

@Component({ components: { Tabs } })
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',')
  }

  beautify(string: string) {
    const day = dayjs(string)
    const now = dayjs()
    if (day.isSame(now, 'day')) {
      return '今天'
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天'
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天'
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日')
    } else {
      return day.format('YYYY年MM月D日')
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList
  } //先拿到这个recordList//添加RootState所以将它放入全局，
  get groupedList() {
    const { recordList } = this
    if (recordList.length === 0) {
      return []
    }
    // const hashTable: { [key: string]: RecordItem[] } = {} //很典型的如何声明一个空对象的类型
    // const hashTable: { [key: string]: { title: string; items: RecordItem[] } } =
    //   {}
    // for (let i = 0; i < recordList.length; i++) {
    //   const [date, time] = recordList[i].createdAt!.split('T')
    //   console.log(date)
    //   hashTable[date] = hashTable[date] || { title: date, items: [] } //这一步叫做初始化
    //   hashTable[date].items.push(recordList[i])
    // }
    // console.log(hashTable)
    // return hashTable
    //把hashTable变成数组进行排序
    // type HashTableValue = { title: string; items: RecordItem[] }
    // const hashTable: { title: string; items: RecordItem[] }
    console.log(recordList.map((i) => i.createdAt))
    const newList = clone(recordList).sort(
      //clone里的每一项类型可以根据recordList推出来，sort里面的每一项也就可以推出来
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
    ) //sort就是把这个里面的项相减，valueOf就是取他们的number，但是有个问题sort之后recordList被修改了，所以先clone它再使用

    console.log(newList.map((i) => i.createdAt)) //map就是遍历这个数组项的东西
    const result = [
      {
        title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),
        items: [newList[0]],
      },
    ]
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i]
      const last = result[result.length - 1]
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current)
      } else {
        result.push({
          title: dayjs(current.createdAt).format('YYYY-MM-DD'),
          items: [current],
        })
      }
    }
    console.log(result)
    return result
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
  background: #c4c4c4;

  &.selected {
    background: white;
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
