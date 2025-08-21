import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// 環境變數
const VITE_API_BASE = import.meta.env.VITE_API_BASE

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

export const useStore = defineStore('data', () => {
  const search = ref('')

  const members = ref([])
  const copyMembers = ref([])

  const postReports = ref([])
  const copyPostReports = ref([])

  const activityCommentReports = ref([])
  const copyActivityCommentReports = ref([])

  const contacts = ref([])
  const copyContacts = ref([])

  const activitys = ref([])
  const copyActivitys = ref([])

  const currentType = ref('')

  const allData = {
    members,
    postReports,
    activityCommentReports,
    activitys,
    contacts,
  }

  const filter = computed(() => {
    const target = allData[currentType.value]?.value ?? []

    if (!search.value.trim()) {
      // 搜尋為空，回傳全部資料
      return target
    }

    switch (currentType.value) {
      case 'members':
        return target.filter(
          (m) =>
            m?.MEMBER_NAME.includes(search.value) || String(m?.MEMBER_ID).includes(search.value),
        )
      case 'postReports':
        return target.filter(
          (m) => m?.NAME.includes(search.value) || String(m?.POST_REPORT_NO).includes(search.value),
        )
      case 'activityCommentReports':
        return target.filter(
          (m) =>
            m?.NAME.includes(search.value) ||
            String(m?.ACTIVITY_COMMENT_REPORT_ID).includes(search.value),
        )
      case 'activitys':
        return target.filter(
          (m) =>
            m?.HOST_NAME.includes(search.value) || String(m?.ACTIVITY_NO).includes(search.value),
        )
      case 'contacts':
        return target.filter(
          (m) => m?.NAME.includes(search.value) || String(m?.FORM_ID).includes(search.value),
        )
      default:
        break
    }
  })

  // 分別建立 async 函式抓取資料
  // 之後從裡面連線api
  const fetchMembers = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/members/list.php`)
    members.value = res.data
    copyMembers.value = JSON.parse(JSON.stringify(members.value))
  }

  const fetchPostReports = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/members/post-report.php`)
    postReports.value = res.data

    copyPostReports.value = postReports.value.map((r) => ({
      id: r.POST_REPORT_NO,
      createdAt: r.CREATED_AT,
      reason: r.REASON,
      description: r.REPORT_DESCRIPTION,
      reporterName: r.REPORTER_NAME,
      status: r.REPORT_STATUS,
      admin: r.ADMIN_NAME ?? null,
    }))
  }

  const fetchActivityCommentReports = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/activities/commment-report.php`)
    activityCommentReports.value = res.data

    copyActivityCommentReports.value = activityCommentReports.value.map((r) => ({
      id: r.ACTIVITY_COMMENT_REPORT_ID,
      createdAt: r.CREATED_AT,
      reason: r.REASON,
      description: r.REPORT_DESCRIPTION,
      reporterName: r.REPORTER_NAME,
      status: r.REPORT_STATUS,
      admin: r.ADMIN_NAME ?? null,
    }))
  }

  const fetchContacts = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/form.php`)
    contacts.value = res.data
    copyContacts.value = JSON.parse(JSON.stringify(contacts.value))
  }

  const fetchActivitys = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/activities/manage.php`)
    activitys.value = res.data
    copyActivitys.value = JSON.parse(JSON.stringify(activitys.value))
  }

  const refreshAllCopy = () => {
    copyMembers.value = JSON.parse(JSON.stringify(members.value))

    copyPostReports.value = postReports.value.map((r) => ({
      id: r.POST_REPORT_NO,
      createdAt: r.CREATED_AT,
      reason: r.REASON,
      description: r.REPORT_DESCRIPTION,
      reporterName: r.REPORTER_NAME,
      status: r.REPORT_STATUS,
      admin: r.ADMIN_NAME ?? null,
    }))

    copyActivityCommentReports.value = activityCommentReports.value.map((r) => ({
      id: r.ACTIVITY_COMMENT_REPORT_ID,
      createdAt: r.CREATED_AT,
      reason: r.REASON,
      description: r.REPORT_DESCRIPTION,
      reporterName: r.REPORTER_NAME,
      status: r.REPORT_STATUS,
      admin: r.ADMIN_NAME ?? null,
    }))

    copyContacts.value = JSON.parse(JSON.stringify(contacts.value))
    copyActivitys.value = JSON.parse(JSON.stringify(activitys.value))
  }

  fetchMembers()
  fetchPostReports()
  fetchActivityCommentReports()
  fetchContacts()
  fetchActivitys()

  return {
    search,
    members,
    copyMembers,
    postReports,
    copyPostReports,
    activityCommentReports,
    copyActivityCommentReports,
    contacts,
    copyContacts,
    activitys,
    copyActivitys,
    currentType,
    filter,
    fetchMembers,
    fetchPostReports,
    fetchActivityCommentReports,
    fetchContacts,
    fetchActivitys,
    refreshAllCopy,
  }
})
