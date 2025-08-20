<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'

import { useStore } from '@/stores/data'

library.add(faSearch)

const route = useRoute()
const router = useRouter()
// const currentPath = computed(() => route.path)

router.afterEach(() => {
  store.search = ''
})

const store = useStore()

// const pathToDataKey = {
//   '/member': 'members',
//   '/report': 'reports',
//   '/contact-form': 'contacts',
//   '/activity-manage': 'activitys',
// }

// const currentDataKey = computed(() => pathToDataKey[currentPath.value])

// watch(
//   currentDataKey,
//   (val) => {
//     if (val) store.currentType = val
//   },
//   { immediate: true },
// )

const { title } = defineProps({
  title: {
    type: String,
    default: '預設標題',
  },
})

const searchInput = ref('') // 暫存輸入用

const doSearch = () => {
  if (searchInput.value.trim() !== '') {
    console.log('搜尋', searchInput.value)
    // store.currentType = currentDataKey.value
    store.search = searchInput.value.trim()

    // console.log(store.filter)

    if (!store.filter.length) {
      alert('沒有找到符合條件的資料')
    }
  }
  searchInput.value = ''
}

const clearSearch = () => {
  store.search = ''
}
</script>

<template>
  <div class="mark-title text-center p-2 m-5 position-relative" id="title">
    {{ title }}
  </div>
  <div
    class="input-area input-group me-5 position-absolute end-0 top-0"
    v-if="title !== '後台首頁'"
  >
    <input
      type="text"
      class="form-control"
      placeholder="請輸入姓名 / ID / NO / 活動編號"
      v-model="searchInput"
      @keyup.enter="doSearch"
    />
    <button class="btn btn-outline-secondary" @click="doSearch">
      <FontAwesomeIcon :icon="['fas', 'search']" />
    </button>

    <div
      v-if="store.filter.length && store.search"
      class="searchInfo alert alert-info position-absolute end-0"
    >
      <span>搜尋 '{{ store.search }}' 中：全部共 {{ store.filter.length }} 筆資料</span>
      <button class="btn btn-sm btn-outline-danger ms-3" @click="clearSearch">清除篩選</button>
    </div>
  </div>

  <div v-if="title === '後台首頁'">
    <div class="content border border-black mt-3 ms-5 me-5">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mark-title {
  background-color: #4f8da8;
  width: 150px;
  font-size: 20px;
  color: #fff;
  // border-radius: 6px;
  border: 1px solid #3c7188;
}
.input-area {
  width: 30%;
  margin-top: 4rem;
  .form-control {
    border-color: #d1d0cd;
    // 取消邊框藍線
    outline: none;
    box-shadow: none;
  }
  button {
    border-color: #d1d0cd;
  }
  .searchInfo {
    top: 55px;
    padding: 2% 3%;
    border-radius: 6px !important;
  }
}
.content {
  min-height: calc(100vh - 8rem - 86px);
}
</style>
