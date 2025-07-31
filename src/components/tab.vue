<script setup>
import { ref, watch } from 'vue'

// 接收 props：tabs 陣列
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
})

// 控制當前啟用頁籤 index
const activeTab = ref(0)

watch(
  () => props.tabs,
  (newVal) => {
    if (newVal.length) {
      activeTab.value = 0
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <!-- 頁籤列（有傳入 tabs 才渲染） -->
    <ul v-if="tabs.length" class="nav nav-tabs" role="tablist">
      <li class="nav-item" v-for="(tab, index) in tabs" :key="index" role="presentation">
        <button
          class="nav-link"
          :class="{ active: activeTab === index }"
          type="button"
          role="tab"
          :aria-selected="activeTab === index"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </button>
      </li>
    </ul>

    <!-- 頁籤內容 slot -->
    <div class="tab-content">
      <div
        v-if="tabs.length"
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-pane fade"
        :class="{ show: activeTab === index, active: activeTab === index }"
      >
        <slot :name="'tab-' + index" />
      </div>

      <!-- 若無 tabs，直接渲染 default slot -->
      <div v-else>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-tabs {
  border-color: #4f8da8;
}
.nav-tabs .nav-link {
  color: #4f8da8;
  border-radius: 0;
}
.nav-link:hover {
  border-color: #4f8da8;
}
.nav-link.active {
  background-color: #81bfda;
  color: #fff;
  border: 1px solid #4f8da8;
}
</style>
