<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid mx-5">
      <div class="navbar-header">
        <router-link :to="{ name: 'home' }" class="navbar-brand fs-1">
          Quản trị viên
        </router-link>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        style="flex-grow: unset"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
          <li class="nav-item px-2">
            <router-link to="/" class="nav-link">Trang chủ</router-link>
          </li>
          <li class="nav-item px-2">
            <router-link :to="{ name: 'list.products' }" class="nav-link"
              >Quản lý sản phẩm</router-link
            >
          </li>
          <li class="nav-item px-2">
            <router-link :to="{ name: 'employees' }" class="nav-link"
              >Quản lý nhân viên</router-link
            >
          </li>
          <li class="nav-item px-2 hidden-signin" style="display: none">
            <router-link :to="{ name: 'login' }" class="nav-link"
              >Đăng nhập</router-link
            >
          </li>
          <li class="nav-item dropdown px-2 show-user" style="display: none">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-circle-user fs-2 align-middle me-1"></i>
              <span class="show-username"></span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end px-2 fs-5"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <router-link class="dropdown-item" :to="{ name: 'login' }"
                  >Đăng nhập</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="./" @click="logOut()">
                  Đăng xuất
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import AdminService from "@/services/admin.service";

export default {
  methods: {
    async logOut() {
      try {
        let admin = JSON.parse(localStorage.getItem("admin"));
        if (!admin) alert("Bạn chưa đăng nhập.");
        else {
          localStorage.removeItem("admin");
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
