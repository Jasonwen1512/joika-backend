<script setup>
import Content from '@/components/bar.vue'
import Tab from '@/components/tab.vue'
import { useStore } from '@/stores/data'
import { ref, computed, onMounted } from 'vue'

const tabs = [{ title: '全部' }, { title: '待處理' }]

const store = useStore()

onMounted(() => {
  store.fetchContacts()
})

const contacts = computed(() => {
  if (store.filter.length) return store.filter
  else return store.contacts
})

const pendingcontacts = computed(() => contacts.value.filter((item) => item.status === '待處理'))

const selectedItem = ref(null)
const replyMessage = ref('')

const openModal = (item) => {
  selectedItem.value = item
  replyMessage.value = item.reply || ''
}

// 送出後的處理放這
const handleSubmit = () => {
  selectedItem.reply = replyMessage
  console.log(selectedItem.value)
}
</script>

<template>
  <div>
    <Content title="聯絡表單" />
    <div class="ps-5 pe-5">
      <Tab :tabs="tabs">
        <template #tab-0>
          <div class="pt-3">
            <div class="table-wrapper">
              <table class="concat-table table table-striped">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>回報時間</th>
                    <th>會員姓名</th>
                    <th>問題標題</th>
                    <th>狀態</th>
                    <th>處理人員</th>
                    <th>回覆</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in contacts" :key="index">
                    <td>{{ item.no }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>已處理</option>
                        <option>待處理</option>
                      </select>
                    </td>
                    <td>{{ item.admin }}</td>
                    <td
                      class="reply"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      @click="openModal(item)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.9143 22.2486C20.7809 22.2505 20.6494 22.2167 20.5334 22.1508C20.4174 22.0849 20.3211 21.9892 20.2543 21.8736C19.2555 20.172 17.8317 18.7589 16.1226 17.7729C14.4134 16.7868 12.4775 16.2616 10.5043 16.2486V20.7486C10.5036 20.8967 10.4591 21.0412 10.3763 21.164C10.2936 21.2868 10.1763 21.3824 10.0393 21.4386C9.90277 21.4961 9.75223 21.5118 9.60674 21.4837C9.46125 21.4557 9.32732 21.3852 9.22185 21.2811L0.221849 12.2811C0.151552 12.2114 0.0957567 12.1285 0.0576802 12.0371C0.0196037 11.9457 0 11.8476 0 11.7486C0 11.6496 0.0196037 11.5516 0.0576802 11.4602C0.0957567 11.3688 0.151552 11.2859 0.221849 11.2161L9.22185 2.21614C9.32732 2.11207 9.46125 2.04157 9.60674 2.01354C9.75223 1.98551 9.90277 2.00121 10.0393 2.05864C10.1763 2.1149 10.2936 2.21045 10.3763 2.33324C10.4591 2.45603 10.5036 2.60057 10.5043 2.74864V7.33114C13.6072 7.72968 16.4594 9.24285 18.5292 11.5886C20.599 13.9344 21.7453 16.9528 21.7543 20.0811C21.7532 20.5827 21.7207 21.0837 21.6568 21.5811C21.6381 21.7372 21.5708 21.8834 21.4645 21.9991C21.3582 22.1148 21.2182 22.1943 21.0643 22.2261L20.9143 22.2486ZM10.1293 14.7486C12.0422 14.7212 13.9381 15.1093 15.6862 15.8863C17.4344 16.6632 18.993 17.8104 20.2543 19.2486C20.0287 16.5279 18.8411 13.9766 16.9044 12.0524C14.9678 10.1281 12.409 8.95685 9.68685 8.74864C9.49986 8.73174 9.326 8.64533 9.19964 8.50646C9.07327 8.3676 9.00359 8.18639 9.00435 7.99864V4.55614L1.81185 11.7486L9.00435 18.9411V15.4986C9.00435 15.2997 9.08337 15.109 9.22402 14.9683C9.36467 14.8277 9.55544 14.7486 9.75435 14.7486H10.1593H10.1293Z"
                          fill="black"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div></div
        ></template>
        <template #tab-1>
          <div class="pt-3">
            <div class="table-wrapper">
              <table class="concat-table table table-striped">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>回報時間</th>
                    <th>會員姓名</th>
                    <th>問題標題</th>
                    <th>狀態</th>
                    <th>處理人員</th>
                    <th>回覆</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in pendingcontacts" :key="index">
                    <td>{{ item.no }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                      <select v-model="item.status">
                        <option>已處理</option>
                        <option>待處理</option>
                      </select>
                    </td>
                    <td>{{ item.admin }}</td>
                    <td
                      class="reply"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      @click="openModal(item)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20.9143 22.2486C20.7809 22.2505 20.6494 22.2167 20.5334 22.1508C20.4174 22.0849 20.3211 21.9892 20.2543 21.8736C19.2555 20.172 17.8317 18.7589 16.1226 17.7729C14.4134 16.7868 12.4775 16.2616 10.5043 16.2486V20.7486C10.5036 20.8967 10.4591 21.0412 10.3763 21.164C10.2936 21.2868 10.1763 21.3824 10.0393 21.4386C9.90277 21.4961 9.75223 21.5118 9.60674 21.4837C9.46125 21.4557 9.32732 21.3852 9.22185 21.2811L0.221849 12.2811C0.151552 12.2114 0.0957567 12.1285 0.0576802 12.0371C0.0196037 11.9457 0 11.8476 0 11.7486C0 11.6496 0.0196037 11.5516 0.0576802 11.4602C0.0957567 11.3688 0.151552 11.2859 0.221849 11.2161L9.22185 2.21614C9.32732 2.11207 9.46125 2.04157 9.60674 2.01354C9.75223 1.98551 9.90277 2.00121 10.0393 2.05864C10.1763 2.1149 10.2936 2.21045 10.3763 2.33324C10.4591 2.45603 10.5036 2.60057 10.5043 2.74864V7.33114C13.6072 7.72968 16.4594 9.24285 18.5292 11.5886C20.599 13.9344 21.7453 16.9528 21.7543 20.0811C21.7532 20.5827 21.7207 21.0837 21.6568 21.5811C21.6381 21.7372 21.5708 21.8834 21.4645 21.9991C21.3582 22.1148 21.2182 22.1943 21.0643 22.2261L20.9143 22.2486ZM10.1293 14.7486C12.0422 14.7212 13.9381 15.1093 15.6862 15.8863C17.4344 16.6632 18.993 17.8104 20.2543 19.2486C20.0287 16.5279 18.8411 13.9766 16.9044 12.0524C14.9678 10.1281 12.409 8.95685 9.68685 8.74864C9.49986 8.73174 9.326 8.64533 9.19964 8.50646C9.07327 8.3676 9.00359 8.18639 9.00435 7.99864V4.55614L1.81185 11.7486L9.00435 18.9411V15.4986C9.00435 15.2997 9.08337 15.109 9.22402 14.9683C9.36467 14.8277 9.55544 14.7486 9.75435 14.7486H10.1593H10.1293Z"
                          fill="black"
                        />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div></div
        ></template>
      </Tab>
    </div>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">回覆 no：{{ selectedItem?.no }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- 彈窗資料內容 -->
          <div class="modal-body" v-if="selectedItem">
            <p><strong>使用者姓名：</strong> {{ selectedItem.name }}</p>
            <p><strong>手機號碼：</strong> {{ selectedItem.phone }}</p>
            <p><strong>Email：</strong> {{ selectedItem.email }}</p>
            <p><strong>問題標題：</strong> {{ selectedItem.title }}</p>
            <p><strong>問題說明：</strong></p>
            <p class="ps-3">{{ selectedItem.content }}</p>

            <div class="mt-3">
              <label for="reply" class="form-label"><strong>問題回覆</strong></label>
              <textarea
                id="reply"
                v-model="replyMessage"
                rows="4"
                class="form-control"
                placeholder="請輸入回覆內容..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleSubmit"
              data-bs-dismiss="modal"
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.concat-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f7f3;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 14px;
}

.concat-table th,
.concat-table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}

.concat-table th {
  background-color: #f0efeb;
  font-weight: bold;
}

.reply {
  cursor: pointer;
  &:hover {
    path {
      fill: #4f8da8;
    }
  }
}
</style>
