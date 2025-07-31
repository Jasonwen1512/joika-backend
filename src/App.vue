<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Banner from '@/components/banner.vue'

// 使用 computed 讓它對 route.name 做響應式判斷
const route = useRoute()
const showBanner = computed(() => route.path === '/')
</script>

<template>
  <div class="page-wrapper" :class="{ 'd-flex': !showBanner }">
    <Banner v-if="!showBanner" />
    <div :class="{ 'n-banner': !showBanner }">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #f7f6f1;
}
.n-banner {
  flex: 1;
}
.page-wrapper {
  height: 100vh;
}
</style>
