<script setup>
import Content from '@/components/content.vue'
</script>

<template>
  <div>
    <Content title="後台首頁">
      <div class="position-relative">
        <div
          class="welcome-back d-flex flex-column justify-content-center align-items-center position-relative"
        >
          <h1 class="mb-4">歡迎回來，XXX！</h1>
          <div class="d-flex gap-3">
            <span>待審核會員：</span>
            <span>待審核檢舉：</span>
            <span>待審核活動：</span>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<style scoped lang="scss">
.welcome-back {
  top: 350px;
  span {
    background-color: #f4d577;
    padding: 15px 30px;
    font-size: 20px;
    border: 1px solid #000;
  }
}
</style>
