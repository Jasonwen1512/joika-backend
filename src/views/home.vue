<script setup>
import Content from '@/components/bar.vue'
import { useAuth } from '@/stores/auth'
import { useStore } from '@/stores/data'
import { computed, reactive } from 'vue'

const auth = useAuth()

const currentUser = auth.currentUser || '訪客'

const store = useStore()

const needHandle = computed(() => {
  const pendingMembers = store.members.filter((m) => m.MEMBER_STATUS === '待審核')

  const pendingPostReports = store.postReports.filter((item) => item.status === '待審核')

  const pendingActivityCommentReports = store.activityCommentReports.filter(
    (item) => item.status === '待審核',
  )

  const pendingActivitys = store.activitys.filter((item) => item.ACTIVITY_STATUS === '審核中')

  return {
    members: pendingMembers.length,
    reports: pendingPostReports.length + pendingActivityCommentReports.length,
    activites: pendingActivitys.length,
  }
})
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
          <span>待審核會員：{{ needHandle.members }}</span>
          <span>待審核檢舉：{{ needHandle.reports }}</span>
          <span>待審核活動：{{ needHandle.activites }}</span>
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
