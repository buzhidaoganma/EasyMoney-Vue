<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <!-- 插值（${classPrefix}）只能用这个符号`` -->
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
  props: ['classPrefix'],
  name: 'Layout',
}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>
