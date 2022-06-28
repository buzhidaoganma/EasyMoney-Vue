<template>
  <Layout classPrefix="layout">
    <!-- classPrefix是这个标签的输出的属性，可以让这个class的名字有class-wrapper和class-content的类，比如这个就有了layout-content -->
    <!-- {{record}}可以显示获取到数据 -->
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <!--@update:value="onUpdateType"  因为修饰符sync不要了-->
    <div class="notes">
      <FormItem
        fieldName="备注"
        placeholder="在这里输入备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Tags />
    <!-- :dataSource.sync="tags"在Tags里面已经做好了传输所以不需要了-->
    <!-- @update:value="onUpdateTags"被换成add事件了 -->
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import NumberPad from '@/components/Money_modules/NumberPad.vue'
import FormItem from '@/components/Money_modules/FormItem.vue'
import Types from '@/components/Money_modules/Types.vue'
import Tags from '@/components/Money_modules/Tags.vue'
import { Component, Watch } from 'vue-property-decorator'
// import store from '@/store/index2'
import store2 from '@/store/index'

// const tagList = tagListModel.fetch()
// const recordList: RecordItem[] = recordListModel.fetch() //可以把：RecordItem[]删除了
// //JSON.parse(window.localStorage.getItem('recordList') || '[]',
// // ) 这里解决每次刷新页面数组为空的情况，特别注意“【】”空数组字符串//引入了model封装，用到封装的API来过去数据

// // const version = window.localStorage.getItem('version') || '0'
// // const recordList: Record[] = JSON.parse(
// //   window.localStorage.getItem('recordList') || '[]',
// // )
// // window.localStorage.setItem('version', '0.0.1')
// // if (version === '0.0.1') {
// //   //数据库升级，数据迁移
// //   recordList.forEach((record) => {
// //     record.createdAt = new Date(2022, 0, 1)
// //   })
// //   window.localStorage.setItem('recordList', JSON.stringify(recordList))
// //   //保存数据
// // }
// // window.localStorage.setItem('version', '0.0.2')

@Component({
  components: { Tags, FormItem, Types, NumberPad },
  computed: {
    //读的时候用这个，写的时候就用$store2代码无非就是用到读和写
    //功能：当它里面的值变化的时候他就会更新外面的
    recordList() {
      return this.$store.state.recordList
    },
    // count() {
    //   return store2.state.count //这里也可以不引用import store2可以直接写成this.$store2
    // },
  },
})
export default class Money extends Vue {
  // tags = store.tagList
  // recordList = store.recordList这个直接写在了computed了，这样可以防止数据不同步（值和地址）
  record: RecordItem = { tags: [], notes: '', type: '', amount: 0 }

  // onUpdateTags(value: string[]) {
  //   this.record.tags = value
  // }
  created() {
    this.$store.commit('fetchRecords')
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
    this.$store.commit('createRecord', this.record)
    // store.createRecord(this.record)
    // // const record2: RecordItem = recordListModel.clone(this.record)
    // // record2.createdAt = new Date()
    // // this.recordList.push(record2)
    // // localStorage.set('recordList',JSON.stringify(this.recordList))
  }

  // @Watch('recordList')
  // onRecordListChange() {
  //   // window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
  //   //上面的代码被拿去封装了再model.ts
  //   recordListModel.save()
  // }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse; //直接调整div的位置
}
.notes {
  padding: 12px 0; //前面改了FormItem的高24px，所以上下隔个12px
}
</style>
