import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// import { useStore } from '@/stores/data'

// const store = useStore()

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
  const updateStart = () => {
    if (updateMembers.value.length) {
      console.log(updateMembers.value)
    }
    if (updatePostReports.value.length) {
      console.log(updatePostReports.value)
    }
    if (updateActivityCommentReports.value.length) {
      console.log(updateActivityCommentReports.value)
    }
    if (updateActivitys.value.length) {
      console.log(updateActivitys.value)
    }
    if (updateContacts.value.length) {
      console.log(updateContacts.value)
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
