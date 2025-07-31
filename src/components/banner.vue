<script setup></script>

<template>
  <div class="banner position-relative">
    <router-link to="/home"
      ><div class="logo position-absolute">
        <img src="@/assets/logo.svg" alt="" /></div
    ></router-link>

    <ul
      class="nav flex-column justify-content-center align-items-center top-50 position-relative translate-middle-y"
    >
      <li class="nav-item">
        <router-link to="/member" class="nav-link">會員管理</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/report" class="nav-link">檢舉管理</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/activity-manage" class="nav-link">揪團管理</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact-form" class="nav-link">聯絡表單</router-link>
      </li>
    </ul>
    <button
      type="button"
      class="logout btn btn-danger position-absolute pt-2 pb-2 ps-4 pe-4 start-50 translate-middle-x"
    >
      登出
    </button>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  top: 30px;
  img {
    width: 80%;
  }
}
.banner {
  width: 200px;
  background-color: #4f8da8;
  height: 100vh;
  position: relative;

  ul {
    font-size: 24px;

    li {
      width: 100%;
      text-align: center;

      &:hover {
        background-color: #f7f6f1;

        a {
          color: #4f8da8;
        }
      }

      // ✅ 新增這段：當前路由對應時自動套用樣式
      .router-link-active {
        background-color: #f7f6f1;
        color: #4f8da8;
      }
    }

    a {
      color: #f7f6f1;
      display: block;
      padding: 12px 0;
      text-decoration: none;
    }
  }
}
.logout {
  font-size: 24px;
  bottom: 40px;
}
</style>
