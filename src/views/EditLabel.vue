<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
      <!-- 这个多余的标签是为了布局需要 -->
    </div>
    <div class="form-wrapper">
      <FormItem fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>
<script lang="ts">
import tagListModel from '@/models/tagListModel'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FormItem from '../components/Money_modules/FormItem.vue'
import Button from '../components/Button.vue'

@Component({ components: { FormItem, Button } })
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

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px; //上下12，左右16
  background: white;
  display: flex; //用flex布局
  /* position: relative; //绝对定位 */
  align-items: center; //居中对齐
  justify-content: space-between; //所有的空隙放在中间
  > .title {
    border: 1px solid red;
  }
  > .leftIcon {
    border: 1px solid red;
    width: 24px;
    height: 24px;
    /* //绝对定位
    position: absolute;
    left: 16px; 不好让这个图标居中，所以不用绝对定位，用flex布局 */
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
    border: 1px solid red;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px; //要有空隙
}
.button-wrapper {
  text-align: center; //居中
  padding: 16px;
  margin-top: 44-16px;
}
</style>
