<template>
  <Layout>
    <div>
      <Icon name="left" />
      <span>编辑标签</span>
    </div>
    <Notes fieldName="标签名" placeholder="请输入标签名" />
  </Layout>
</template>
<script lang="ts">
import tagListModel from '@/models/tagListModel'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Icon from '@/components/Icon.vue'
import Notes from '../components/Money_modules/Notes.vue'

@Component({ components: { Notes } })
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id
    tagListModel.fetch()
    const tags = tagListModel.data
    const tag = tags.filter((t) => t.id === id)[0]
    if (tag) {
      console.log(tag)
    } else {
      this.$router.replace('/404') //这里的replace(防止回退不了)可以用push
    }
  }
}
</script>

<style lang="scss" scoped></style>
