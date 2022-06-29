<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag.name) >= 0 }"
        @click="toggle(tag.name)"
      >
        <!-- v-for="tag in dataSource" -->
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// import store from '@/store/index2'
import TagHelper from '@/mixins/TagHelper'
import Vue from 'vue'
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList
    },
  },
})
export default class Tags extends mixins(TagHelper) {
  // @Prop({ required: true }) readonly tag!: string[]//| undefined //告诉Ts我的tags是字符串数组(string[])
  // //加readonly是为了说明不能直接更改外部的数据//去掉undefined,加！表明不能为空,加入{required:true}表明你必须给我传不传我就报错
  //这个prop已经用不上了，没有外面传进来的参数

  // tagList = store.fetchTags()把它放到computed里面了 //把原来Money.vue定义的tagList去掉了，在这里加
  selectedTags: string[] = []

  created() {
    this.$store.commit('fetchTags')
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag)
    if (index >= 0) {
      this.selectedTags.splice(index, 1)
    } else {
      this.selectedTags.push(tag)
    }
    this.$emit('update:value', this.selectedTags)
  }
  // create() {
  //   const name = window.prompt('请输入标签名')
  //   // if (name === '') {
  //   if (!name) {
  //     //为了应对name有可能为空的情况，！name表示name不存在,让它先走逻辑
  //     return window.alert('标签名不能为空')
  //   } else if (name) {
  //     // this.$emit('update:dataSource', [...this.dataSource, name])
  //     //太粗糙了
  //     // this.$emit('add', name)
  //     // //当用户点击新增标签的时候我们触发add事件，把用户新增的这个name传给外面，让外面去create,因为我的Tag可能不想去create
  //     // //其实我们也可以自己在内部create，因为我们的数据现在是全局管理的，任何地方都可以调用它
  //     this.$store.commit('createTag', name)
  //     // store.createTag(name)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
