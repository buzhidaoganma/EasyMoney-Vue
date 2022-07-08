<template>
  <div class="app">
    <router-view />
    <!-- 告诉他把内容显示在这里面 -->
  </div>
</template>

<style lang="scss">
@import '~@/assets/style/reset.scss';
@import '~@/assets/style/helper.scss';
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; //苹果系统
  color: #333;
  font-family: $font-hei;
  line-height: 1.5;
  font-size: 16px;
  background: #f5f5f5;
}
/* .clearfix::after{
  content: "";
  display: block;
  clear: both;
} 教另外的写法*/
@media (max-width: 500px) {
  //媒体查询

  .app {
    max-width: 500px;
    margin: 0 auto;
  }
}
</style>
