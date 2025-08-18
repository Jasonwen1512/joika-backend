<script setup>
import Content from '@/components/bar.vue'
import Tab from '@/components/tab.vue'
import { useStore } from '@/stores/data'
import { ref, reactive, computed, onMounted, watch } from 'vue'

const tabs = [{ title: '全部' }, { title: '待審核' }]

const store = useStore()

onMounted(() => {
  store.currentType = 'postReports'
})

// 檢舉資料
const reports = computed(() => {
  if (store.currentType === 'postReports') {
    return reactive(
      store.postReports.map((r) => ({
        id: r.POST_REPORT_NO,
        createdAt: r.CREATED_AT,
        reason: r.REASON,
        description: r.REPORT_DESCRIPTION,
        reporterName: r.NAME,
        status: r.REPORT_STATUS,
        admin: r.admin ?? null,
      })),
    )
  } else if (store.currentType === 'activityCommentReports') {
    return reactive(
      store.activityCommentReports.map((r) => ({
        id: r.ACTIVITY_COMMENT_REPORT_ID,
        createdAt: r.CREATED_AT,
        reason: r.REASON,
        description: r.REPORT_DESCRIPTION,
        reporterName: r.NAME,
        status: r.REPORT_STATUS,
        admin: r.admin ?? null,
      })),
    )
  } else {
    return []
  }
})

const changeData = (data) => {
  store.currentType = data
}

const pendingReports = computed(() => reports.value.filter((item) => item.status === '待審核'))
</script>

<template>
  <div>
    <Content title="檢舉管理" />
    <div class="ms-5 me-5 position-relative">
      <Tab :tabs="tabs">
        <template #tab-0>
          <div class="pt-3">
            <div class="table-wrapper">
              <table class="report-table table table-striped">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>檢舉時間</th>
                    <th>檢舉原因</th>
                    <th>檢舉說明</th>
                    <th>檢舉人姓名</th>
                    <th>狀態</th>
                    <th>審核員工</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in reports" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.reporterName }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>通過</option>
                        <option>駁回</option>
                        <option>待審核</option>
                      </select>
                    </td>
                    <td>{{ item.admin }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
        <template #tab-1>
          <div class="pt-3" v-if="pendingReports.length">
            <div class="table-wrapper">
              <table class="report-table table table-striped">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>檢舉時間</th>
                    <th>檢舉原因</th>
                    <th>檢舉說明</th>
                    <th>檢舉人姓名</th>
                    <th>狀態</th>
                    <th>審核員工</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in pendingReports" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.createdAt }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.reporterName }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>通過</option>
                        <option>駁回</option>
                        <option>待審核</option>
                      </select>
                    </td>
                    <td>{{ item.admin }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="text-center text-secondary my-3" v-else>沒有資料</div>
        </template>
      </Tab>
      <div class="category position-absolute top-0 d-flex">
        <button
          class="post"
          :class="{ active: store.currentType === 'postReports' }"
          @click="changeData('postReports')"
        >
          活動檢舉
        </button>
        <button
          class="comment"
          :class="{ active: store.currentType === 'activityCommentReports' }"
          @click="changeData('activityCommentReports')"
        >
          文章留言檢舉
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.report-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f7f3;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 14px;
}

.report-table th,
.report-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}

.report-table th {
  background-color: #f0efeb;
  font-weight: bold;
}

.category {
  left: 180px;
}
.post,
.comment {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  color: #e67e00;
  transition:
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  // border-radius: 6px;
  &.active {
    background: #fbb03b;
    border: 1px solid #e67e00;
    color: #fff;
    border-bottom: none;
  }
  &:hover:not(.active) {
    // background: #fcebc2;
    border: 1px solid #e67e00;
    border-bottom: none;
  }
}
</style>
