<script setup>
import Content from '@/components/bar.vue'
import Tab from '@/components/tab.vue'
import { useStore } from '@/stores/data'
import { ref, computed, onMounted } from 'vue'

const tabs = [{ title: '全部' }, { title: '待審核' }]

const store = useStore()

onMounted(() => {
  store.fetchActivitys()
})

const activitys = computed(() => {
  if (store.filter.length) return store.filter
  else return store.activitys
})

const pendingActivitys = computed(() => activitys.value.filter((item) => item.status === '待審核'))
</script>

<template>
  <div>
    <Content title="揪團管理" />
    <div class="ps-5 pe-5">
      <Tab :tabs="tabs">
        <template #tab-0>
          <div class="pt-3">
            <div class="table-wrapper">
              <table class="activity-table table table-striped">
                <thead>
                  <tr>
                    <th>活動編號</th>
                    <th>建立日期</th>
                    <th>團主</th>
                    <th>活動名稱</th>
                    <th>報名截止日</th>
                    <th>人數</th>
                    <th>活動狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in activitys" :key="index">
                    <td>{{ item.no }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.dead_line }}</td>
                    <td>{{ item.number }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>已取消</option>
                        <option>已駁回</option>
                        <option>開團中</option>
                        <option>已結束</option>
                        <option>待審核</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
        <template #tab-1>
          <div class="pt-3">
            <div class="table-wrapper">
              <table class="activity-table table table-striped">
                <thead>
                  <tr>
                    <th>活動編號</th>
                    <th>建立日期</th>
                    <th>團主</th>
                    <th>活動名稱</th>
                    <th>報名截止日</th>
                    <th>人數</th>
                    <th>活動狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in pendingActivitys" :key="index">
                    <td>{{ item.no }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.dead_line }}</td>
                    <td>{{ item.number }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>已取消</option>
                        <option>已駁回</option>
                        <option>開團中</option>
                        <option>已結束</option>
                        <option>待審核</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </Tab>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  overflow-x: auto;
  border: 1px solid #f0efeb;
  max-height: calc(100vh - 16em);
}

.activity-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f7f3;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 14px;
}

.activity-table th,
.activity-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}

.activity-table th {
  background-color: #f0efeb;
  font-weight: bold;
}
</style>
