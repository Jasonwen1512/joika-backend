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

  // const reports = ref([
  //   {
  //     no: 1,
  //     date: '2025/3/3',
  //     type: '文章',
  //     title: '一起去看電影',
  //     reason: '不當言論',
  //     description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //     name: '陳陳',
  //     status: '已隱藏',
  //     admin: 'ADMIN',
  //   },
  //   {
  //     no: 2,
  //     date: '2025/3/3',
  //     type: '活動',
  //     title: '一起去看電影',
  //     reason: '騷擾行為',
  //     description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //     name: '陳陳',
  //     status: '已駁回',
  //     admin: 'ADMIN',
  //   },
  //   {
  //     no: 3,
  //     date: '2025/3/3',
  //     type: '文章',
  //     title: '一起去看電影',
  //     reason: '散佈個資',
  //     description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //     name: '陳陳',
  //     status: '待審核',
  //     admin: '',
  //   },
  // ])

  const postReports = ref([])

  const activityCommentReports = ref([])

  const contacts = ref([])

  const activitys = ref([])

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

    // return target.filter(
    //   (m) => m.name.includes(search.value) || String(m.no).includes(search.value),
    // )
  })

  // 分別建立 async 函式抓取資料
  // 之後從裡面連線api
  const fetchMembers = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/members/list.php`)
    members.value = res.data
  }

  const fetchPostReports = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/members/post-report.php`)
    postReports.value = res.data
  }

  const fetchActivityCommentReports = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/activities/commment-report.php`)
    activityCommentReports.value = res.data
  }

  const fetchContacts = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/form.php`)
    contacts.value = res.data
  }

  const fetchActivitys = async () => {
    const res = await axios.get(`${VITE_API_BASE}/admin/activities/manage.php`)
    activitys.value = res.data
  }

  fetchMembers()
  fetchPostReports()
  fetchActivityCommentReports()
  fetchContacts()
  fetchActivitys()

  return {
    search,
    members,
    postReports,
    activityCommentReports,
    contacts,
    activitys,
    currentType,
    filter,
    fetchMembers,
    fetchPostReports,
    fetchActivityCommentReports,
    fetchContacts,
    fetchActivitys,
  }
})
