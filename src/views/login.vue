<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

// const a = () => {
//   console.log(username.value, password.value)
// }
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-5" style="min-width: 320px; max-width: 720px; width: 100%">
      <h3 class="login text-center mt-2 mb-2">登入</h3>
      <form @submit.prevent="onLogin">
        <div class="username mb-4">
          <label for="username" class="form-label">帳號</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            placeholder="請輸入帳號"
            required
          />
        </div>

        <div class="password mb-4">
          <label for="password" class="form-label">密碼</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="請輸入密碼"
            required
          />
        </div>

        <div class="text-end">
          <a href="#" class="forget-password">忘記密碼</a>
        </div>

        <div class="d-flex justify-content-between gap-4 pt-4">
          <button type="submit" class="submit btn w-50">登入</button>
          <button type="button" class="signup btn w-50">前往網站</button>
        </div>
      </form>
    </div>
    <div class="bg1">
      <img src="@/assets/bg1.png" alt="" />
    </div>
    <div class="bg2">
      <img src="@/assets/bg2.png" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: 1px solid #000;
  border-radius: 0;
}
.login {
  font-size: 36px;
}
.username {
  label {
    font-size: 25px;
  }
  input {
    border: 1px solid #000;
    // border-radius: 6px;
  }
}
.password {
  label {
    font-size: 25px;
  }
  input {
    border: 1px solid #000;
    // border-radius: 6px;
  }
}
.forget-password {
  color: #4f8da8;
}
.form-control {
  font-size: 24px;
}
.submit,
.signup {
  border: 1px solid #000;
  border-radius: 0;
  font-size: 24px;
  transition: none;
}
.submit {
  background-color: #81bfda;
  &:hover {
    background-color: darken($color: #81bfda, $amount: 10%);
  }
  &:active {
    background-color: darken($color: #81bfda, $amount: 15%);
  }
}
.signup {
  background-color: #f1d376;
  &:hover {
    background-color: darken($color: #f1d376, $amount: 10%);
  }
  &:active {
    background-color: darken($color: #f1d376, $amount: 15%);
  }
}
.bg1,
.bg2 {
  position: absolute;
  z-index: -1;
}
.bg1 {
  top: 10%;
  left: 0;
}
.bg2 {
  top: 30%;
  right: 0;
}
</style>
