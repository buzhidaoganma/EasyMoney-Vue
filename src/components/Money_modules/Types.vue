<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  props: {
    propMessage: String,
  },
})
export default class Types extends Vue {
  type = '-'
  selectType(type: string) {
    //唯一的Ts 语法
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown')
    }
    this.type = type
  }
  created() {}
  mounted() {}
}
// export default {
//   name: 'Types',
//   props:['xxx'],
//   data(){//保存当前选中的类型
//    return{
//     type:'-'//’-‘号表示支出，“+”号表示收入
//   }
// },
// mounted(){
//   console.log(this.xxx)
// },
//   methods:{//用来切换这个type
//   selectType(type){//type只能是-和+中的一个
// if(type!=="-"&&type!=="+"){
//   throw new Error("type is unknown")
// }
//     this.type=type
//   }
// }
// }
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      //这个符号&表示当前的li里面的selected
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4px;
      width: 100%;
      background: #333;
    }
  }
}
</style>
