import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useStore } from '@/stores/data'
import Swal from 'sweetalert2'

// 環境變數
const VITE_API_BASE = import.meta.env.VITE_API_BASE

export const useUpdate = defineStore('update', () => {
  const updateMembers = ref([])
  const updatePostReports = ref([])
  const updateActivityCommentReports = ref([])
  const updateContacts = ref([])
  const updateActivitys = ref([])

  const totalQuantity = computed(() => {
    return (
      updateMembers.value.length +
      updatePostReports.value.length +
      updateActivityCommentReports.value.length +
      updateContacts.value.length +
      updateActivitys.value.length
    )
  })

  // 處理更新的API放置處
  // updatePostReports、updateActivityCommentReports、updateContacts這三個，除了STATUS要改，處理人員也要更新
  const updateStart = async () => {
    // console.log(updateMembers.value)
    if (updateMembers.value.length) {
      try {
        const res = await axios.patch(
          `${VITE_API_BASE}/admin/update/member.php`,
          updateMembers.value,
        )
        if (res.data.success) {
          console.log('會員狀態更新成功:', res.data.message)
          updateMembers.value = [] // 更新完成後清空
        } else {
          console.error('更新失敗:', res.data.error || res.data.errors)
        }
      } catch (error) {
        console.error('更新會員資料 API 呼叫出錯:', error)
      }
    }
    if (updatePostReports.value.length) {
      // console.log(updatePostReports.value)
      try {
        const res = await axios.patch(
          `${VITE_API_BASE}/admin/update/activity-report.php`,
          updatePostReports.value,
        )
        if (res.data.success) {
          console.log('活動留言檢舉狀態更新成功:', res.data.message)
          updatePostReports.value = []
        } else {
          console.error('活動留言檢舉狀態更新失敗:', res.data.error || res.data.errors)
        }
      } catch (error) {
        console.error('更新活動留言檢舉資料 API 呼叫出錯:', error)
      }
    }
    if (updateActivityCommentReports.value.length) {
      // console.log(updateActivityCommentReports.value)
      try {
        const res = await axios.patch(
          `${VITE_API_BASE}/admin/update/comment-report.php`,
          updateActivityCommentReports.value,
        )
        if (res.data.success) {
          console.log('文章留言檢舉狀態更新成功:', res.data.message)
          updateActivityCommentReports.value = []
        } else {
          console.error('文章留言檢舉狀態更新失敗:', res.data.error || res.data.errors)
        }
      } catch (error) {
        console.error('更新文章留言檢舉資料 API 呼叫出錯:', error)
      }
    }
    if (updateActivitys.value.length) {
      // console.log(updateActivitys.value)
      try {
        const res = await axios.patch(
          `${VITE_API_BASE}/admin/update/activity.php`,
          updateActivitys.value,
        )
        if (res.data.success) {
          console.log('活動狀態更新成功:', res.data.message)
          updateActivitys.value = []
        } else {
          console.error('活動狀態更新失敗:', res.data.error || res.data.errors)
        }
      } catch (error) {
        console.error('更新活動資料 API 呼叫出錯:', error)
      }
    }
    if (updateContacts.value.length) {
      console.log(updateContacts.value)
    }
    if (!totalQuantity.value) {
      const store = useStore()
      store.refreshAllCopy()
      console.log('重整copy')
      Swal.fire({
        icon: 'success',
        title: '更新成功！',
        showConfirmButton: false,
        timer: 1200,
      })
    }
  }

  return {
    updateMembers,
    updatePostReports,
    updateActivityCommentReports,
    updateContacts,
    updateActivitys,
    totalQuantity,
    updateStart,
  }
})
