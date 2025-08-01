import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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

  const members = ref([
    { no: 1, date: '2025/06/30', name: '陳小小', gender: '女', status: '已停權' },
    { no: 2, date: '2025/07/03', name: '王大大', gender: '女', status: '正常' },
    { no: 3, date: '2025/07/04', name: '黃小名', gender: '男', status: '待審核' },
  ])

  const reports = ref([
    {
      no: 1,
      date: '2025/3/3',
      type: '文章',
      title: '一起去看電影',
      reason: '不當言論',
      description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      name: '陳陳',
      status: '已隱藏',
      admin: 'ADMIN',
    },
    {
      no: 2,
      date: '2025/3/3',
      type: '活動',
      title: '一起去看電影',
      reason: '騷擾行為',
      description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      name: '陳陳',
      status: '已駁回',
      admin: 'ADMIN',
    },
    {
      no: 3,
      date: '2025/3/3',
      type: '文章',
      title: '一起去看電影',
      reason: '散佈個資',
      description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      name: '陳陳',
      status: '待審核',
      admin: '',
    },
  ])

  const contacts = ref([
    {
      no: 1,
      date: '2025/06/30',
      name: '陳陳',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我報名了「7/20陽明山夜間健行」，但臨時有事無法參加，想在網站上取消時發現「取消活動」按鈕沒反應，已嘗試重新整理和換手機操作都一樣，請問可以協助我取消嗎？謝謝！',
    },
    {
      no: 2,
      date: '2025/06/31',
      name: '小美',
      title: '按取消活動沒反應',
      status: '待處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我原本報名了「7/28大稻埕煙火攝影團」，但臨時有變動無法參加，想在網站上進行取消時，發現系統沒有反應，試過重新整理及更換裝置仍無法操作，想請問可以幫我手動取消嗎？感謝您！',
    },
    {
      no: 3,
      date: '2025/08/20',
      name: '阿明',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我有報名「8/3淡水日落健行活動」，但因為臨時有事無法前往，嘗試在網站上點選「取消報名」但按鈕似乎失效，換手機及重新整理後仍無效，煩請協助取消，謝謝您的幫忙！',
    },
    {
      no: 4,
      date: '2025/06/30',
      name: '陳陳',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我報名了「7/20陽明山夜間健行」，但臨時有事無法參加，想在網站上取消時發現「取消活動」按鈕沒反應，已嘗試重新整理和換手機操作都一樣，請問可以協助我取消嗎？謝謝！',
    },
    {
      no: 5,
      date: '2025/06/31',
      name: '小美',
      title: '按取消活動沒反應',
      status: '待處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我原本報名了「7/28大稻埕煙火攝影團」，但臨時有變動無法參加，想在網站上進行取消時，發現系統沒有反應，試過重新整理及更換裝置仍無法操作，想請問可以幫我手動取消嗎？感謝您！',
    },
    {
      no: 6,
      date: '2025/08/20',
      name: '阿明',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我有報名「8/3淡水日落健行活動」，但因為臨時有事無法前往，嘗試在網站上點選「取消報名」但按鈕似乎失效，換手機及重新整理後仍無效，煩請協助取消，謝謝您的幫忙！',
    },
    {
      no: 7,
      date: '2025/06/30',
      name: '陳陳',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我報名了「7/20陽明山夜間健行」，但臨時有事無法參加，想在網站上取消時發現「取消活動」按鈕沒反應，已嘗試重新整理和換手機操作都一樣，請問可以協助我取消嗎？謝謝！',
    },
    {
      no: 8,
      date: '2025/06/31',
      name: '小美',
      title: '按取消活動沒反應',
      status: '待處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我原本報名了「7/28大稻埕煙火攝影團」，但臨時有變動無法參加，想在網站上進行取消時，發現系統沒有反應，試過重新整理及更換裝置仍無法操作，想請問可以幫我手動取消嗎？感謝您！',
    },
    {
      no: 9,
      date: '2025/08/20',
      name: '阿明',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我有報名「8/3淡水日落健行活動」，但因為臨時有事無法前往，嘗試在網站上點選「取消報名」但按鈕似乎失效，換手機及重新整理後仍無效，煩請協助取消，謝謝您的幫忙！',
    },
    {
      no: 10,
      date: '2025/06/30',
      name: '陳陳',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我報名了「7/20陽明山夜間健行」，但臨時有事無法參加，想在網站上取消時發現「取消活動」按鈕沒反應，已嘗試重新整理和換手機操作都一樣，請問可以協助我取消嗎？謝謝！',
    },
    {
      no: 11,
      date: '2025/06/31',
      name: '小美',
      title: '按取消活動沒反應',
      status: '待處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我原本報名了「7/28大稻埕煙火攝影團」，但臨時有變動無法參加，想在網站上進行取消時，發現系統沒有反應，試過重新整理及更換裝置仍無法操作，想請問可以幫我手動取消嗎？感謝您！',
    },
    {
      no: 12,
      date: '2025/08/20',
      name: '阿明',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我有報名「8/3淡水日落健行活動」，但因為臨時有事無法前往，嘗試在網站上點選「取消報名」但按鈕似乎失效，換手機及重新整理後仍無效，煩請協助取消，謝謝您的幫忙！',
    },
    {
      no: 13,
      date: '2025/06/30',
      name: '陳陳',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我報名了「7/20陽明山夜間健行」，但臨時有事無法參加，想在網站上取消時發現「取消活動」按鈕沒反應，已嘗試重新整理和換手機操作都一樣，請問可以協助我取消嗎？謝謝！',
    },
    {
      no: 14,
      date: '2025/06/31',
      name: '小美',
      title: '按取消活動沒反應',
      status: '待處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我原本報名了「7/28大稻埕煙火攝影團」，但臨時有變動無法參加，想在網站上進行取消時，發現系統沒有反應，試過重新整理及更換裝置仍無法操作，想請問可以幫我手動取消嗎？感謝您！',
    },
    {
      no: 15,
      date: '2025/08/20',
      name: '阿明',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我有報名「8/3淡水日落健行活動」，但因為臨時有事無法前往，嘗試在網站上點選「取消報名」但按鈕似乎失效，換手機及重新整理後仍無效，煩請協助取消，謝謝您的幫忙！',
    },
    {
      no: 16,
      date: '2025/06/30',
      name: '陳陳',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我報名了「7/20陽明山夜間健行」，但臨時有事無法參加，想在網站上取消時發現「取消活動」按鈕沒反應，已嘗試重新整理和換手機操作都一樣，請問可以協助我取消嗎？謝謝！',
    },
    {
      no: 17,
      date: '2025/06/31',
      name: '小美',
      title: '按取消活動沒反應',
      status: '待處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我原本報名了「7/28大稻埕煙火攝影團」，但臨時有變動無法參加，想在網站上進行取消時，發現系統沒有反應，試過重新整理及更換裝置仍無法操作，想請問可以幫我手動取消嗎？感謝您！',
    },
    {
      no: 18,
      date: '2025/08/20',
      name: '阿明',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我有報名「8/3淡水日落健行活動」，但因為臨時有事無法前往，嘗試在網站上點選「取消報名」但按鈕似乎失效，換手機及重新整理後仍無效，煩請協助取消，謝謝您的幫忙！',
    },
    {
      no: 19,
      date: '2025/06/30',
      name: '陳陳',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我報名了「7/20陽明山夜間健行」，但臨時有事無法參加，想在網站上取消時發現「取消活動」按鈕沒反應，已嘗試重新整理和換手機操作都一樣，請問可以協助我取消嗎？謝謝！',
    },
    {
      no: 20,
      date: '2025/06/31',
      name: '小美',
      title: '按取消活動沒反應',
      status: '待處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我原本報名了「7/28大稻埕煙火攝影團」，但臨時有變動無法參加，想在網站上進行取消時，發現系統沒有反應，試過重新整理及更換裝置仍無法操作，想請問可以幫我手動取消嗎？感謝您！',
    },
    {
      no: 21,
      date: '2025/08/20',
      name: '阿明',
      title: '按取消活動沒反應',
      status: '已處理',
      admin: 'ADMIN',
      phone: '0912345678',
      email: 'chenchen@gmail.com',
      content:
        '您好，我有報名「8/3淡水日落健行活動」，但因為臨時有事無法前往，嘗試在網站上點選「取消報名」但按鈕似乎失效，換手機及重新整理後仍無效，煩請協助取消，謝謝您的幫忙！',
    },
  ])

  const activitys = ref([
    {
      no: 1,
      date: '2025/06/30',
      name: '陳小小',
      title: '一起看電影!',
      dead_line: '2025/07/15',
      number: '2/4',
      status: '待審核',
    },
    {
      no: 2,
      date: '2025/07/01',
      name: '王大大',
      title: '一起看電影!',
      dead_line: '2025/07/15',
      number: '1/10',
      status: '已取消',
    },
    {
      no: 3,
      date: '2025/07/04',
      name: '黃小明',
      title: '一起看電影!',
      dead_line: '2025/07/15',
      number: '3/10',
      status: '開團中',
    },
    {
      no: 4,
      date: '2025/07/04',
      name: '林小小',
      title: '一起看電影!',
      dead_line: '2025/07/15',
      number: '4/10',
      status: '待審核',
    },
    {
      no: 5,
      date: '2025/07/05',
      name: '陳小小',
      title: '一起看電影!',
      dead_line: '2025/07/15',
      number: '1/10',
      status: '已結束',
    },
  ])

  const loginData = ref([
    {
      username: 'joika',
      password: '123456',
    },
  ])

  const currentUser = ref(null)

  const success = ref(false)
  const login = (username, password) => {
    loginData.value.forEach((item) => {
      if (username === item.username && password === item.password) {
        success.value = true
        currentUser.value = username
      }
    })
    return success.value
  }

  const currentType = ref('')

  const allData = {
    members,
    reports,
    activitys,
    contacts,
  }

  const filter = computed(() => {
    const target = allData[currentType.value]?.value || []

    if (!search.value.trim()) {
      // 👉 搜尋為空，回傳全部資料
      return target
    }

    return target.filter(
      (m) => m.name.includes(search.value) || String(m.no).includes(search.value),
    )
  })

  // 分別建立 async 函式抓取資料
  // 之後從裡面連線api
  const fetchMembers = async () => {
    members.value = members.value
  }

  const fetchReports = async () => {
    reports.value = reports.value
  }

  const fetchContacts = async () => {
    contacts.value = contacts.value
  }

  const fetchActivitys = async () => {
    activitys.value = activitys.value
  }

  return {
    search,
    members,
    reports,
    contacts,
    activitys,
    success,
    loginData,
    currentUser,
    currentType,
    filter,
    login,
    fetchMembers,
    fetchReports,
    fetchContacts,
    fetchActivitys,
  }
})
