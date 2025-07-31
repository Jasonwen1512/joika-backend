<script setup>
import Content from '@/components/bar.vue'
import Tab from '@/components/tab.vue'
import { reports as rawReports } from '@/assets/data/data'
import { ref, computed } from 'vue'

const tabs = [{ title: '全部' }, { title: '待審核' }]

// 檢舉資料

const reports = ref([...rawReports])

const pendingReports = computed(() => reports.value.filter((item) => item.status === '待審核'))
</script>

<template>
  <div>
    <Content title="檢舉管理" />
    <div class="ps-5 pe-5">
      <Tab :tabs="tabs">
        <template #tab-0>
          <div class="pt-3">
            <div class="table-wrapper">
              <table class="report-table">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>檢舉日期</th>
                    <th>類型</th>
                    <th>對應標題</th>
                    <th>檢舉原因</th>
                    <th>被檢舉說明</th>
                    <th>檢舉人姓名</th>
                    <th>狀態</th>
                    <th>審核員工</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in reports" :key="index">
                    <td>{{ item.no }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.reporter }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>已隱藏</option>
                        <option>已駁回</option>
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
          <div class="pt-3">
            <div class="table-wrapper">
              <table class="report-table">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>檢舉日期</th>
                    <th>類型</th>
                    <th>對應標題</th>
                    <th>檢舉原因</th>
                    <th>被檢舉說明</th>
                    <th>檢舉人姓名</th>
                    <th>狀態</th>
                    <th>審核員工</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in pendingReports" :key="index">
                    <td>{{ item.no }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.reason }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.reporter }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>已隱藏</option>
                        <option>已駁回</option>
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
</style>
