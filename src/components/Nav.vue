<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <!-- 这个router-link不是标签所以添加一个类class来操作它 -->
      <Icon name="money" />
      记账
    </router-link>

    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label" />
      标签
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav',
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .selected {
    color: $color-highlight;
  }
}
</style>
