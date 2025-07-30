<script setup>
defineProps({
  title: {
    type: String,
    default: '預設標題',
  },
})
</script>

<template>
  <div class="mark-title text-center p-3 m-5 position-relative border border-dark" id="title">
    {{ title }}
  </div>
  <div class="content border border-dark ms-5 me-5">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.mark-title {
  background-color: #4f8da8;
  width: 200px;
  font-size: 24px;
  color: #fff;
}
.content {
  min-height: calc(100vh - 8rem - 86px);
}
</style>
