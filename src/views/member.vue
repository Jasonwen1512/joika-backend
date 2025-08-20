<script setup>
import Content from '@/components/bar.vue'
import Tab from '@/components/tab.vue'
import { useStore } from '@/stores/data'
import { useUpdate } from '@/stores/update'
import { ref, computed, onMounted } from 'vue'

const tabs = [{ title: '全部' }, { title: '待審核' }]

const store = useStore()
let copy = null

onMounted(() => {
  store.currentType = 'members'
  // copy 為資料原始狀態
  copy = JSON.parse(JSON.stringify(store.filter.length ? store.filter : store.members))

  // console.log(copy)
})

// 會員資料
const members = computed(() => {
  return store.members.map((m) => {
    const temp = update.updateMembers.find((u) => u.MEMBER_ID === m.MEMBER_ID)
    return (
      temp ?? {
        MEMBER_ID: m.MEMBER_ID,
        REGISTRATION_DATE: m.REGISTRATION_DATE,
        MEMBER_NAME: m.MEMBER_NAME,
        MEMBER_EMAIL: m.MEMBER_EMAIL,
        MEMBER_PHONE: m.MEMBER_PHONE,
        MEMBER_GENDER: m.MEMBER_GENDER,
        MEMBER_STATUS: m.MEMBER_STATUS,
      }
    )
  })
})

const pendingMembers = computed(() => members.value.filter((m) => m.MEMBER_STATUS === '待審核'))

const update = useUpdate()

const pushUpdateData = (m, c) => {
  if (store.currentType === 'members') {
    const existing = update.updateMembers.find((item) => item.MEMBER_ID === m.MEMBER_ID)

    if (existing) {
      // console.log(m.MEMBER_STATUS, c.MEMBER_STATUS)

      if (m.MEMBER_STATUS === c.MEMBER_STATUS) {
        // 改回原始值 → 從暫存陣列移除
        update.updateMembers = update.updateMembers.filter((item) => item.MEMBER_ID !== m.MEMBER_ID)
        // console.log('資料已恢復原本狀態，已從暫存移除')
      } else {
        // 不同 → 更新 status
        existing.MEMBER_STATUS = m.MEMBER_STATUS
        // console.log('資料已存在，更新 status')
      }
    } else {
      update.updateMembers.push({
        MEMBER_ID: m.MEMBER_ID,
        REGISTRATION_DATE: m.REGISTRATION_DATE,
        MEMBER_NAME: m.MEMBER_NAME,
        MEMBER_EMAIL: m.MEMBER_EMAIL,
        MEMBER_PHONE: m.MEMBER_PHONE,
        MEMBER_GENDER: m.MEMBER_GENDER,
        MEMBER_STATUS: m.MEMBER_STATUS,
      })
    }
  }
}
</script>

<template>
  <div>
    <Content title="會員管理" />
    <div class="ms-5 me-5">
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
                  <th>信箱</th>
                  <th>手機號碼</th>
                  <th>性別</th>
                  <th>會員狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in members" :key="index">
                  <td>{{ item.MEMBER_ID }}</td>
                  <td>{{ item.REGISTRATION_DATE }}</td>
                  <td>{{ item.MEMBER_NAME }}</td>
                  <td>{{ item.MEMBER_EMAIL }}</td>
                  <td>{{ item.MEMBER_PHONE }}</td>

                  <td>{{ item.MEMBER_GENDER }}</td>
                  <td>
                    <select
                      v-model="item.MEMBER_STATUS"
                      @change="pushUpdateData(item, copy[index])"
                    >
                      <option value="已停權">已停權</option>
                      <option value="已通過">已通過</option>
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
          <div class="pt-3" v-if="pendingMembers.length">
            <table class="member-table table table-striped">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>註冊日期</th>
                  <th>姓名</th>
                  <th>信箱</th>
                  <th>手機號碼</th>
                  <th>性別</th>
                  <th>會員狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in pendingMembers" :key="index">
                  <td>{{ item.MEMBER_ID }}</td>
                  <td>{{ item.REGISTRATION_DATE }}</td>
                  <td>{{ item.MEMBER_NAME }}</td>
                  <td>{{ item.MEMBER_EMAIL }}</td>
                  <td>{{ item.MEMBER_PHONE }}</td>
                  <td>{{ item.MEMBER_GENDER }}</td>
                  <td>
                    <select
                      v-model="item.MEMBER_STATUS"
                      @change="pushUpdateData(item, copy[index])"
                    >
                      <option value="已停權">已停權</option>
                      <option value="已通過">已通過</option>
                      <option value="待審核">待審核</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center text-secondary my-3" v-else>沒有資料</div>
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
</style>
