<template>
  <div>
    <ul class="types">
      <li
        :class="{
          [classPrefix + '-item']: classPrefix,
          selected: value === '-',
        }"
        @click="selectType('-')"
      >
        <!-- ：class={selected: value === '-'}表示我可能会有一个selected的类，什么时候它会出现在li上呢，就是后面的value为true的时候，这个方法叫表驱动通过true和false来判断，有后面的东西存在，才有这个类存在 -->
        <!-- :class="value === '-' && 'selected'"这个表示的意思是你的Value是-就选中他  -->
        支出
      </li>
      <li
        :class="{
          [classPrefix + '-item']: classPrefix,
          selected: value === '+',
        }"
        @click="selectType('+')"
      >
        收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Types extends Vue {
  // 1.type = '-'  由于要用初始值所以不需要了
  @Prop(String) readonly value!: string //!绝对不是undefined
  @Prop(String) classPrefix?: string //?可能是undefined//这一行是为了更加精准控制Sta.vue里面的li加入了前缀

  // @Prop(Number) xxx: number | undefined //编译式的写法,告诉我们xxx的类型有number和undefined(编译时类型)
  // //Prop告诉Vue xxx不是data 是prop
  // //Number（Vue不支持小写number）告诉Vue xxx是个number
  // //xxx就是属性名
  // //左边是运行时报错，右边是编译时报错

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown')
    }
    this.$emit('update:value', type)
    //1. this.type = type
  }
  // 1.@Watch('type')
  // 1.onTypeChanged(value: string) {
  // 1.  this.$emit('update:value', value)
  // }
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
