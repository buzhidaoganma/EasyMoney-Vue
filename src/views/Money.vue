<template>
  <Layout classPrefix="layout">
    <!-- classPrefix是这个标签的输出的属性，可以让这个class的名字有class-wrapper和class-content的类，比如这个就有了layout-content -->
    {{ record }}
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <!--@update:value="onUpdateType"  因为修饰符sync不要了-->
    <Notes @update:value="onUpdateNotes" />
    <Tags :dataSource.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/Money_modules/NumberPad.vue'
import Notes from '@/components/Money_modules/Notes.vue'
import Types from '@/components/Money_modules/Types.vue'
import Tags from '@/components/Money_modules/Tags.vue'
import { Component, Watch } from 'vue-property-decorator'
import model from '@/model'

const recordList: RecordItem[] = model.fetch() //可以把：RecordItem[]删除了
//JSON.parse(window.localStorage.getItem('recordList') || '[]',
// ) 这里解决每次刷新页面数组为空的情况，特别注意“【】”空数组字符串//引入了model封装，用到封装的API来过去数据

// const version = window.localStorage.getItem('version') || '0'
// const recordList: Record[] = JSON.parse(
//   window.localStorage.getItem('recordList') || '[]',
// )
// window.localStorage.setItem('version', '0.0.1')
// if (version === '0.0.1') {
//   //数据库升级，数据迁移
//   recordList.forEach((record) => {
//     record.createdAt = new Date(2022, 0, 1)
//   })
//   window.localStorage.setItem('recordList', JSON.stringify(recordList))
//   //保存数据
// }
// window.localStorage.setItem('version', '0.0.2')

@Component({ components: { Tags, Notes, Types, NumberPad } })
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行']
  recordList: RecordItem[] = recordList
  record: RecordItem = { tags: [], notes: '', type: '', amount: 0 }

  onUpdateTags(value: string[]) {
    this.record.tags = value
  }
  onUpdateNotes(value: string) {
    this.record.notes = value
  }
  // onUpdateType(value: string) {
  //   this.record.type = value
  // }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value)
  }
  saveRecord() {
    const record2: RecordItem = model.clone(this.record)
    record2.createdAt = new Date()
    this.recordList.push(record2)
    console.log(this.recordList)
    // localStorage.set('recordList',JSON.stringify(this.recordList))
  }

  @Watch('recordList')
  onRecordListChange() {
    // window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
    //上面的代码被拿去封装了再model.ts
    model.save(this.recordList)
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse; //直接调整div的位置
}
</style>

<style lang="scss" scoped></style>
