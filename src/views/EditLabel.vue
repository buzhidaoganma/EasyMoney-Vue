<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <!-- Icon组件并没有触发click -->
      <span class="title">编辑标签</span>
      <span class="rightIcon" />
      <!-- 这个多余的标签是为了布局需要 -->
    </div>
    <div class="form-wrapper">
      <FormItem
        :value="tag.name"
        @update:value="update"
        fieldName="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import FormItem from '../components/Money_modules/FormItem.vue'
import Button from '../components/Button.vue'
// import store from '@/store/index2'  用Vuex来代替store

@Component({
  components: { FormItem, Button },
  // computed: {
  //   tag() {
  //     return this.$store.state.currentTag
  //   },
  // },不能使用换成get tag（）{}方法
})
export default class EditLabel extends Vue {
  // tag?: { id: string; name: string } = undefined //?的意思是他可以为空
  //tag = store.findTag(this.$route.params.id)用Vuex
  // tag?: Tag = undefined
  get tag() {
    return this.$store.state.currentTag
  }
  created() {
    const id = this.$route.params.id
    // // const id = this.$route.params.id
    // // // tagListModel.fetch()
    // // // const tags = tagListModel.data
    // // const tag = store.findTag(id)
    // // // const tags = store.tagList
    // // // const tag = tags.filter((t) => t.id === id)[0]
    // // //然后我们去获取页面里面的id,通过这个id在所有的tags里面找到这个tag，然后把函数里面的tag 赋值到我定义的tag上
    // // // if (tag) {
    // // //   this.tag = tag
    // // // } else {
    // // //   this.$router.replace('/404') //这里的replace(防止回退不了)可以用push
    // // // }

    // this.tag = this.$store.commit('findTag', this.$route.params.id)这个不能用是因为类型的问题，重新声明了一个currentTag
    this.$store.commit('fetchTags') //如果不写这一步，直接在标签页面刷新会直接报错，因为它没有获取tag数据
    this.$store.commit('setCurrentTag', id)
    if (!this.tag) {
      this.$router.replace('/404')
    }
    //代码简化，用了一遍的变量直接写就好了，不用定义
  }
  update(name: string) {
    if (this.tag) {
      //如果这个tag存在再运行
      // store.updateTag(this.tag.id, name)
      this.$store.commit('updateTag', { id: this.tag.id, name })
    }
  }
  remove() {
    // if (this.tag) {
    //   if (store.removeTag(this.tag.id)) {
    //     this.$router.back()
    //   } else {
    //     window.alert('删除失败')
    //   }
    // }
    if (this.tag) {
      this.$store.commit('removeTag', this.tag.id)
    }
  }
  goBack() {
    this.$router.back()
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
