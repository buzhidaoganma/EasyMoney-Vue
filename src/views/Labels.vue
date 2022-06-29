<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
// import store from '@/store/index2'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Button from '../components/Button.vue'
// const tagHelper: any = require('@/mixins/tagHelper')
import TagHelper from '@/mixins/TagHelper'
import { mixins } from 'vue-class-component'
// tagListModel.fetch() //拿到数据

@Component({
  components: { Button },
  // mixins: [tagHelper], //新建一个createTag的方法所以注释了底下的东西用这个
  // computed: {
  //   tags() {
  //     return this.$store.state.tagList
  //   },
  // },
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList
  }
  beforeCreate() {
    this.$store.commit('fetchTags')
  }
  //tags = store.tagList //第一步知道在window上读
  // createTag() {
  //   const name = window.prompt('请输入标签名')
  //   if (!name) {
  //     return window.alert('标签名不能为空')
  //   }
  //   this.$store.commit('createTag', name)

  //   //store.createTag(name) 用VueX
  //   // const message = tagListModel.create(name) //写的时候要知道是用这个，封装一下
  //   // if (message === 'duplicated') {
  //   //  store.alert('标签重复')
  //   //   // try {
  //   //   //   tagListModel.create(name)
  //   //   // } catch (error: any) {
  //   //   //   //标签不能实现告诉用户原因
  //   //   //   if (error.message === 'duplicated') {
  //   //   //     //通过console.log找出对应的属性值通过这个来判断
  //   //   //    store.alert('标签重复')
  //   //   //   }
  //   //   // }
  //   // } else if (message === 'success') {
  //   //  store.alert('添加成功')
  //   // }
  // }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
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
