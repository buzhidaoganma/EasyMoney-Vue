<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import tagListModel from '@/models/tagListModel'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

tagListModel.fetch() //拿到数据

@Component
export default class Labels extends Vue {
  tags = tagListModel.data
  createTag() {
    const name = window.prompt('请输入标签名')
    if (name) {
      const message = tagListModel.create(name)
      if (message === 'duplicated') {
        window.alert('标签重复')
        // try {
        //   tagListModel.create(name)
        // } catch (error: any) {
        //   //标签不能实现告诉用户原因
        //   if (error.message === 'duplicated') {
        //     //通过console.log找出对应的属性值通过这个来判断
        //     window.alert('标签重复')
        //   }
        // }
      } else if (message === 'success') {
        window.alert('添加成功')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e7;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
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
