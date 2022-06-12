<template>
  <Layout classPrefix="layout">
    <NumberPad />
    <Notes />
    <Types />
    <Tags />
  </Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money_modules/NumberPad.vue'
import Notes from '@/components/Money_modules/Notes.vue'
import Types from '@/components/Money_modules/Types.vue'
import Tags from '@/components/Money_modules/Tags.vue'
export default {
  components: { NumberPad, Notes, Types, Tags },
  name: 'Money',
}
</script>

<style lang="scss">
.layout-content {
  border: 3px solid red;
  display: flex;
  flex-direction: column-reverse; //直接调整div的位置
}
</style>

<style lang="scss" scoped></style>
