<script setup>
import Content from '@/components/bar.vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()

const currentUser = auth.currentUser || '訪客'
</script>

<template>
  <div>
    <Content title="後台首頁">
      <div
        class="welcome-back d-flex flex-column justify-content-center align-items-center position-relative"
      >
        <h1 class="mb-4" v-if="auth.currentUser">歡迎回來，{{ currentUser }}！</h1>
        <h1 class="mb-4" v-else>{{ currentUser }}</h1>
        <div class="d-flex gap-3">
          <span>待審核會員：</span>
          <span>待審核檢舉：</span>
          <span>待審核活動：</span>
        </div>
      </div>
    </Content>
  </div>
</template>

<style scoped lang="scss">
.welcome-back {
  top: 16vw;
  span {
    background-color: #f4d577;
    padding: 15px 30px;
    font-size: 20px;
    border: 1px solid #000;
  }
}
</style>
