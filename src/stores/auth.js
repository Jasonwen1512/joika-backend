import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// 環境變數
const VITE_API_BASE = import.meta.env.VITE_API_BASE

export const useAuth = defineStore('auth', () => {
  const currentUser = ref(null)

  const success = ref(false)
  const login = async (username, password) => {
    try {
      const res = await axios.post(
        `${VITE_API_BASE}/admin/login.php`,
        new URLSearchParams({ username: username, password: password }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      const status = res.data
      success.value = status.success
      currentUser.value = status.staff_name

      return success.value
    } catch (error) {
      console.error('post => login.php 失敗', error)
    }
    // loginData.value.forEach((item) => {
    //   if (username === item.username && password === item.password) {
    //     success.value = true
    //     currentUser.value = username
    //   }
    // })
  }

  return { currentUser, success, login }
})
