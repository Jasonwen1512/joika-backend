<script setup>
import Content from '@/components/bar.vue'
import Tab from '@/components/tab.vue'
import { useStore } from '@/stores/data'
import { useUpdate } from '@/stores/update'
import { ref, computed, onMounted } from 'vue'

const tabs = [{ title: '全部' }, { title: '審核中' }]

const store = useStore()
let copy = store.copyActivitys

onMounted(() => {
  store.currentType = 'activitys'
})

const activitys = computed(() => {
  return store.activitys.map((m) => {
    const temp = update.updateActivitys.find((u) => u.ACTIVITY_NO === m.ACTIVITY_NO)
    return (
      temp ?? {
        ACTIVITY_NO: m.ACTIVITY_NO,
        CREATED_AT: m.CREATED_AT,
        HOST_NAME: m.HOST_NAME,
        ACTIVITY_NAME: m.ACTIVITY_NAME,
        REGISTRATION_DEADLINE: m.REGISTRATION_DEADLINE,
        CURRENT_PARTICIPANT: m.CURRENT_PARTICIPANT,
        MAX_PARTICIPANT: m.MAX_PARTICIPANT,
        ACTIVITY_STATUS: m.ACTIVITY_STATUS,
      }
    )
  })
})

const pendingActivitys = computed(() =>
  activitys.value.filter((item) => item.ACTIVITY_STATUS === '審核中'),
)

const update = useUpdate()

const pushUpdateData = (m, c) => {
  if (store.currentType === 'activitys') {
    const existing = update.updateActivitys.find((item) => item.ACTIVITY_NO === m.ACTIVITY_NO)

    if (existing) {
      // console.log(m.MEMBER_STATUS, c.MEMBER_STATUS)

      if (m.ACTIVITY_STATUS === c.ACTIVITY_STATUS) {
        // 改回原始值 → 從暫存陣列移除
        update.updateActivitys = update.updateActivitys.filter(
          (item) => item.ACTIVITY_NO !== m.ACTIVITY_NO,
        )
        // console.log('資料已恢復原本狀態，已從暫存移除')
      } else {
        // 不同 → 更新 status
        existing.ACTIVITY_STATUS = m.ACTIVITY_STATUS
        // console.log('資料已存在，更新 status')
      }
    } else {
      update.updateActivitys.push({
        ACTIVITY_NO: m.ACTIVITY_NO,
        CREATED_AT: m.CREATED_AT,
        HOST_NAME: m.HOST_NAME,
        ACTIVITY_NAME: m.ACTIVITY_NAME,
        REGISTRATION_DEADLINE: m.REGISTRATION_DEADLINE,
        CURRENT_PARTICIPANT: m.CURRENT_PARTICIPANT,
        MAX_PARTICIPANT: m.MAX_PARTICIPANT,
        ACTIVITY_STATUS: m.ACTIVITY_STATUS,
      })
    }
  }
}
</script>

<template>
  <div>
    <Content title="揪團管理" />
    <div class="ms-5 me-5">
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
                  <tr v-for="(item, index) in activitys" :key="item.ACTIVITY_NO">
                    <td>{{ item.ACTIVITY_NO }}</td>
                    <td>{{ item.CREATED_AT }}</td>
                    <td>{{ item.HOST_NAME }}</td>
                    <td>{{ item.ACTIVITY_NAME }}</td>
                    <td>{{ item.REGISTRATION_DEADLINE }}</td>
                    <td>{{ item.CURRENT_PARTICIPANT }} / {{ item.MAX_PARTICIPANT }}</td>
                    <td>
                      <select
                        v-model="item.ACTIVITY_STATUS"
                        @change="
                          pushUpdateData(
                            item,
                            copy.find((c) => c.ACTIVITY_NO === item.ACTIVITY_NO),
                          )
                        "
                      >
                        <option>已取消</option>
                        <option>開團中</option>
                        <option>已成團</option>
                        <option>已完成</option>
                        <option>審核中</option>
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
            <div class="table-wrapper" v-if="pendingActivitys.length">
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
                  <tr v-for="(item, index) in pendingActivitys" :key="item.ACTIVITY_NO">
                    <td>{{ item.ACTIVITY_NO }}</td>
                    <td>{{ item.CREATED_AT }}</td>
                    <td>{{ item.HOST_NAME }}</td>
                    <td>{{ item.ACTIVITY_NAME }}</td>
                    <td>{{ item.REGISTRATION_DEADLINE }}</td>
                    <td>{{ item.CURRENT_PARTICIPANT }} / {{ item.MAX_PARTICIPANT }}</td>
                    <td>
                      <select
                        v-model="item.ACTIVITY_STATUS"
                        @change="
                          pushUpdateData(
                            item,
                            copy.find((c) => c.ACTIVITY_NO === item.ACTIVITY_NO),
                          )
                        "
                      >
                        <option>已取消</option>
                        <option>開團中</option>
                        <option>已成團</option>
                        <option>已完成</option>
                        <option>審核中</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center text-secondary my-3" v-else>沒有資料</div>
          </div>
        </template>
      </Tab>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
