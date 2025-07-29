<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Banner from '@/components/banner.vue'

// 使用 computed 讓它對 route.name 做響應式判斷
const route = useRoute()
const showBanner = computed(() => route.name !== 'login')
</script>

<template>
  <Banner v-if="showBanner" />
  <RouterView />
</template>

<style>
body {
  background-color: #f7f6f1;
}
</style>
