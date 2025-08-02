import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
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

  return { loginData, currentUser, success, login }
})
