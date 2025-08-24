<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Banner from '@/components/banner.vue'
import { useUpdate } from '@/stores/update'
import { useStore } from '@/stores/data'

// 使用 computed 讓它對 route.name 做響應式判斷
const route = useRoute()
const showBanner = computed(() => route.path === '/')
const isHome = computed(() => route.path === '/home')

const update = useUpdate()

const store = useStore()

// console.log(store.copyPostReports, store.postReports)

// console.log(store.copyActivityCommentReports, store.activityCommentReports)
</script>

<template>
  <div class="page-wrapper" :class="{ 'd-flex': !showBanner }">
    <Banner v-if="!showBanner" />
    <div :class="{ 'n-banner': !showBanner }" class="position-relative">
      <RouterView />
      <button
        class="update-button btn btn-success position-absolute pt-2 pb-2 ps-4 pe-4 translate-middle-x"
        v-if="!showBanner && !isHome && update.totalQuantity > 0"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        更新
        <!-- 紅色數量提示 -->
        <span class="number position-absolute top-0 start-100 translate-middle">
          {{ update.totalQuantity }}
        </span>
      </button>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                目前有<span style="color: #dc3545">{{ update.totalQuantity }} </span>個修改
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <!-- 手風琴 -->
              <div class="accordion" id="accordionExample">
                <!-- 第一個：會員管理 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      會員管理
                      <span class="amount" v-if="update.updateMembers.length">{{
                        update.updateMembers.length
                      }}</span>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="pt-3" v-if="update.updateMembers.length">
                        <table class="table table-striped">
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
                            <tr v-for="(item, index) in update.updateMembers" :key="item.MEMBER_ID">
                              <td>{{ item.MEMBER_ID }}</td>
                              <td>{{ item.REGISTRATION_DATE }}</td>
                              <td>{{ item.MEMBER_NAME }}</td>
                              <td>{{ item.MEMBER_EMAIL }}</td>
                              <td>{{ item.MEMBER_PHONE }}</td>
                              <td>{{ item.MEMBER_GENDER }}</td>
                              <td>
                                {{
                                  store.copyMembers.find((c) => c.MEMBER_ID === item.MEMBER_ID)
                                    ?.MEMBER_STATUS
                                }}
                                →
                                {{ item.MEMBER_STATUS }}
                              </td>
                              <!-- 單純顯示 -->
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <strong v-else>無修改</strong>
                    </div>
                  </div>
                </div>

                <!-- 第二個：文章留言檢舉 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      文章留言檢舉
                      <span class="amount" v-if="update.updatePostReports.length">{{
                        update.updatePostReports.length
                      }}</span>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="pt-3" v-if="update.updatePostReports.length">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>NO</th>
                              <th>檢舉時間</th>
                              <th>檢舉原因</th>
                              <th>文章留言內容</th>
                              <th>檢舉說明</th>
                              <th>檢舉人姓名</th>
                              <th>狀態</th>
                              <th>審核員工</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in update.updatePostReports" :key="item.id">
                              <td>{{ item.id }}</td>
                              <td>{{ item.createdAt }}</td>
                              <td>{{ item.reason }}</td>
                              <td>
                                <textarea
                                  name=""
                                  id=""
                                  readonly
                                  class="reply-content form-control"
                                  >{{ item.comment_content }}</textarea
                                >
                              </td>
                              <td>{{ item.description }}</td>
                              <td>{{ item.reporterName }}</td>
                              <td>
                                {{ store.copyPostReports.find((c) => c.id === item.id)?.status }} →
                                {{ item.status }}
                              </td>
                              <td>
                                <span
                                  :class="{
                                    'empty-admin':
                                      store.copyPostReports.find((c) => c.id === item.id)?.admin ===
                                      null,
                                  }"
                                >
                                  {{
                                    store.copyPostReports.find((c) => c.id === item.id)?.admin ??
                                    '無'
                                  }}
                                </span>
                                →
                                <span :class="{ 'empty-admin': item.admin == null }">
                                  {{ item.admin ?? '無' }}
                                </span>
                              </td>
                              <!-- 單純顯示 -->
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <strong v-else>無修改</strong>
                    </div>
                  </div>
                </div>

                <!-- 第三個：活動留言檢舉 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      活動留言檢舉
                      <span class="amount" v-if="update.updateActivityCommentReports.length">{{
                        update.updateActivityCommentReports.length
                      }}</span>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="pt-3" v-if="update.updateActivityCommentReports.length">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>NO</th>
                              <th>檢舉時間</th>
                              <th>檢舉原因</th>
                              <th>活動留言內容</th>
                              <th>檢舉說明</th>
                              <th>檢舉人姓名</th>
                              <th>狀態</th>
                              <th>審核員工</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, index) in update.updateActivityCommentReports"
                              :key="item.id"
                            >
                              <td>{{ item.id }}</td>
                              <td>{{ item.createdAt }}</td>
                              <td>{{ item.reason }}</td>
                              <td>
                                <textarea
                                  name=""
                                  id=""
                                  readonly
                                  class="reply-content form-control"
                                  >{{ item.comment_content }}</textarea
                                >
                              </td>
                              <td>{{ item.description }}</td>
                              <td>{{ item.reporterName }}</td>
                              <td>
                                {{
                                  store.copyActivityCommentReports.find((c) => c.id === item.id)
                                    ?.status ?? '無'
                                }}

                                →
                                <span :class="{ 'empty-admin': item.status == null }">
                                  {{ item.status ?? '無' }}
                                </span>
                              </td>
                              <td>
                                <span
                                  :class="{
                                    'empty-admin':
                                      store.copyActivityCommentReports.find((c) => c.id === item.id)
                                        ?.admin == null,
                                  }"
                                >
                                  {{
                                    store.copyActivityCommentReports.find((c) => c.id === item.id)
                                      ?.admin ?? '無'
                                  }}
                                </span>
                                →
                                <span :class="{ 'empty-admin': item.admin == null }">
                                  {{ item.admin ?? '無' }}
                                </span>
                              </td>
                              <!-- 單純顯示 -->
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <strong v-else>無修改</strong>
                    </div>
                  </div>
                </div>

                <!-- 第四個：揪團管理 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      揪團管理<span class="amount" v-if="update.updateActivitys.length">{{
                        update.updateActivitys.length
                      }}</span>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="pt-3" v-if="update.updateActivitys.length">
                        <table class="table table-striped">
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
                            <tr v-for="(item, index) in update.updateActivitys" :key="index">
                              <td>{{ item.ACTIVITY_NO }}</td>
                              <td>{{ item.CREATED_AT }}</td>
                              <td>{{ item.HOST_NAME }}</td>
                              <td>{{ item.ACTIVITY_NAME }}</td>
                              <td>{{ item.REGISTRATION_DEADLINE }}</td>
                              <td>{{ item.CURRENT_PARTICIPANT }} / {{ item.MAX_PARTICIPANT }}</td>
                              <td>
                                {{
                                  store.copyActivitys.find(
                                    (c) => c.ACTIVITY_NO === item.ACTIVITY_NO,
                                  )?.ACTIVITY_STATUS
                                }}
                                →
                                {{ item.ACTIVITY_STATUS }}
                              </td>
                              <!-- 單純顯示 -->
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <strong v-else>無修改</strong>
                    </div>
                  </div>
                </div>

                <!-- 第五個：聯絡表單 -->
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      聯絡表單<span class="amount" v-if="update.updateContacts.length">{{
                        update.updateContacts.length
                      }}</span>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <div class="pt-3" v-if="update.updateContacts.length">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>NO</th>
                              <th>回報時間</th>
                              <th>會員姓名</th>
                              <th>問題標題</th>
                              <th>狀態</th>
                              <th>處理人員</th>
                              <th>回覆內容</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in update.updateContacts" :key="index">
                              <td>{{ item.FORM_ID }}</td>
                              <td>{{ item.CREATED_AT }}</td>
                              <td>{{ item.NAME }}</td>
                              <td>{{ item.FORM_TITLE }}</td>
                              <td>
                                {{
                                  store.copyContacts.find((c) => c.FORM_ID === item.FORM_ID)
                                    ?.FORM_STATUS ?? '無'
                                }}

                                →
                                <span :class="{ 'empty-admin': item.FORM_STATUS == null }">
                                  {{ item.FORM_STATUS ?? '無' }}
                                </span>
                              </td>
                              <td>
                                <span
                                  :class="{
                                    'empty-admin':
                                      store.copyContacts.find((c) => c.FORM_ID === item.FORM_ID)
                                        ?.PROCESSED_NAME == null,
                                  }"
                                >
                                  {{
                                    store.copyContacts.find((c) => c.FORM_ID === item.FORM_ID)
                                      ?.PROCESSED_NAME ?? '無'
                                  }}
                                </span>
                                →
                                <span :class="{ 'empty-admin': item.PROCESSED_NAME == null }">
                                  {{ item.PROCESSED_NAME ?? '無' }}
                                </span>
                              </td>
                              <td>
                                <textarea
                                  name=""
                                  id=""
                                  readonly
                                  class="reply-content form-control"
                                  >{{ item.REPLY_CONTENT ?? '無' }}</textarea
                                >
                              </td>
                              <!-- 單純顯示 -->
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <strong v-else>無修改</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                @click="update.updateStart"
              >
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #f7f6f1;
}
.n-banner {
  flex: 1;
}
.page-wrapper {
  height: 100vh;
}
.table-wrapper {
  overflow-x: auto;
  max-height: calc(100vh - 20em);
}
.update-button {
  font-size: 24px;
  bottom: 40px;
  right: 20px;
  .number {
    $my-green: #dc3545;
    width: 38px;
    height: 38px;
    color: #fff;
    background-color: $my-green;
    border-radius: 9999px;
    display: flex; // 開啟 flex
    align-items: center; // 垂直置中
    justify-content: center; // 水平置中
    font-size: 21px;
  }
}
.modal-dialog {
  max-width: calc(100% - 200px - 6rem);
}
table.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f7f3;
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 14px;
}
table.table th,
table.table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap;
}

table.table th {
  background-color: #f0efeb;
  font-weight: bold;
}

.amount {
  color: #dc3545;
  margin-left: 10px;
}

.empty-admin {
  color: gray;
  font-style: italic;
}

.reply-content {
  width: 100%; /* 滿寬 */
  height: auto; /* 高度自動 */
  min-height: 1em; /* 避免空白時太小 */
  border: none; /* 移除邊框 */
  background: transparent; /* 背景透明 */
  resize: none; /* 不能拉伸 */
  font: inherit; /* 字型與父元素一致 */
  padding: 0;
}
</style>
