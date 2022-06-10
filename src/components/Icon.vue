<template>
  <svg class="icon">
    <use v-bind:xlink:href="'#' + name" />
  </svg>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext)
try {
  importAll(require.context('../assets/icons', true, /.svg$/))
} catch (error) {
  console.log(error)
}

export default {
  props: ['name'],
  name: 'Icon',
}
</script>

<style lang="scss" scoped>
.icon {
  color: black;
  width: 1em; //1em表示1个字
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden; //参考iconfont里面有个帮助文档，代码应用搜索SVG，找到样式
}
</style>
1
