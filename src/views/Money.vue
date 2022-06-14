<template>
  <Layout classPrefix="layout">
    <!-- classPrefix是这个标签的输出的属性，可以让这个class的名字有class-wrapper和class-content的类，比如这个就有了layout-content -->
    {{ record }}
    <NumberPad @update:value="onUpdateAmount" />
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
import { Component } from 'vue-property-decorator'

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}

@Component({ components: { Tags, Notes, Types, NumberPad } })
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行']
  record: Record = { tags: [], notes: '', type: '', amount: 0 }

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
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse; //直接调整div的位置
}
</style>

<style lang="scss" scoped></style>
