<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { ref } from 'vue'

library.add(faSearch)

const { title, tabs } = defineProps({
  title: {
    type: String,
    default: '預設標題',
  },
})

const searchQuery = ref('')
</script>

<template>
  <div class="mark-title text-center p-2 m-5 position-relative" id="title">
    {{ title }}
  </div>
  <div
    class="input-area input-group me-5 position-absolute end-0 top-0"
    v-if="title !== '後台首頁'"
  >
    <input type="text" class="form-control" placeholder="請輸入姓名或ID" v-model="searchQuery" />
    <button class="btn btn-outline-secondary" @click="doSearch">
      <FontAwesomeIcon :icon="['fas', 'search']" />
    </button>
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
}
.content {
  min-height: calc(100vh - 8rem - 86px);
}
</style>
