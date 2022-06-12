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
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Types extends Vue {
  type = '-'

  // @Prop(Number) xxx: number | undefined //编译式的写法,告诉我们xxx的类型有number和undefiend(编译时类型)
  // //Prop告诉Vue xxx不是data 是prop
  // //Number（Vue不支持小写number）告诉Vue xxx是个number
  // //xxx就是属性名
  // //左边是运行时报错，右边是编译时报错

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown')
    }
    this.type = type
  }
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
