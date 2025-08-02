<script setup>
import Content from '@/components/bar.vue'
import Tab from '@/components/tab.vue'
import { useStore } from '@/stores/data'
import { ref, computed, onMounted } from 'vue'

const tabs = [{ title: '全部' }, { title: '待審核' }]

const store = useStore()

onMounted(() => {
  store.fetchMembers()
})

// 會員資料
const members = computed(() => {
  if (store.filter.length) return store.filter
  else return store.members
})

const pendingMembers = computed(() => members.value.filter((m) => m.status === '待審核'))
</script>

<template>
  <div>
    <Content title="會員管理" />
    <div class="ps-5 pe-5">
      <Tab :tabs="tabs">
        <!-- 全部會員 -->
        <template #tab-0>
          <div class="pt-3">
            <table class="member-table table table-striped">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>註冊日期</th>
                  <th>姓名</th>
                  <th>性別</th>
                  <th>會員狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in members" :key="member.no">
                  <td>{{ member.no }}</td>
                  <td>{{ member.date }}</td>
                  <td>{{ member.name }}</td>
                  <td>{{ member.gender }}</td>
                  <td>
                    <select v-model="member.status">
                      <option value="已停權">已停權</option>
                      <option value="正常">正常</option>
                      <option value="待審核">待審核</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- 待審核會員 -->
        <template #tab-1>
          <div class="pt-3">
            <table class="member-table table table-striped">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>註冊日期</th>
                  <th>姓名</th>
                  <th>性別</th>
                  <th>會員狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in pendingMembers" :key="member.no">
                  <td>{{ member.no }}</td>
                  <td>{{ member.date }}</td>
                  <td>{{ member.name }}</td>
                  <td>{{ member.gender }}</td>
                  <td>
                    <select v-model="member.status">
                      <option value="已停權">已停權</option>
                      <option value="正常">正常</option>
                      <option value="待審核">待審核</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </Tab>
    </div>
  </div>
</template>
<style scoped lang="scss">
.member-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f7f3;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 14px;
}

.member-table th,
.member-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}

.member-table th {
  background-color: #f0efeb;
  font-weight: bold;
}

.text-center {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>
