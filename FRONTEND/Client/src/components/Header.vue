<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-white">
    <div class="container">
      <div class="navbar-header">
        <router-link :to="{ name: 'home' }" class="navbar-brand fs-1 logo-link">
          <img src="../assets/images/logo.png" alt="" id="logo" />
          <div>
            <p class="logo-name">BookStore</p>
            <p class="logo-slogan">better knowledge, better success</p>
          </div>
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
        class="collapse navbar-collapse justify-content-center header-menu"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mb-2 mb-lg-0 menu-list">
          <li class="nav-item px-2">
            <router-link :to="{ name: 'home' }" class="nav-link menu-link"
              >Trang chủ</router-link
            >
          </li>
          <li class="nav-item px-2">
            <router-link :to="{ name: 'products' }" class="nav-link menu-link"
              >Tủ sách</router-link
            >
          </li>
          <li class="nav-item px-2">
            <router-link :to="{ name: 'contact' }" class="nav-link menu-link"
              >Liên hệ</router-link
            >
          </li>
          <li class="nav-item px-2 show-orders">
            <router-link :to="{ name: 'myOrders' }" class="nav-link menu-link"
              >Đơn hàng</router-link
            >
          </li>
          <li class="nav-item px-2 show-signup">
            <router-link :to="{ name: 'signup' }" class="nav-link menu-link"
              >Đăng ký</router-link
            >
          </li>
          <li class="nav-item px-2 show-login">
            <router-link :to="{ name: 'login' }" class="nav-link menu-link"
              >Đăng nhập</router-link
            >
          </li>
          <li class="nav-item px-2 show-logout">
            <router-link to="" class="nav-link menu-link" @click="logOut()"
              >Đăng xuất</router-link
            >
          </li>
          <li class="nav-item px-2 navbar-cart">
            <router-link :to="{ name: 'cart' }" class="nav-link menu-link">
              <i class="fa-solid fa-cart-shopping"></i>
              <div class="cart-quantity">{{ carts.length }}</div>
            </router-link>
          </li>
          <li class="separate"></li>
          <li class="nav-item px-2 show-user">
            <i
              class="fa-regular fa-user fs-4 align-middle me-1"
              style="color: #fd6032"
            ></i>
            <span class="align-middle show-username"></span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import CartService from "@/services/cart.service";

export default {
  data() {
    return {
      carts: [],
    };
  },
  methods: {
    async logOut() {
      try {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) alert("Bạn chưa đăng nhập.");
        else {
          localStorage.removeItem("user");
          document.querySelector(".cart-quantity").innerHTML = 0;
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async retrieveUserCarts(userId) {
      try {
        this.carts = await CartService.listCart(userId);
      } catch (error) {
        console.log(error);
      }
    },
    refreshCarts() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) this.retrieveUserCarts(user.user.userId);
    },
  },
  mounted() {
    this.refreshCarts();
  },
};
</script>

<style scoped>
nav {
  height: 100px;
}
.navbar-header {
  flex-basis: 30%;
}
.header-menu {
  flex-basis: 90%;
}
.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-link img {
  width: 25%;
}
.logo-link div {
  line-height: 20px;
  padding-top: 20px;
}
.logo-name {
  margin-bottom: 2px;
  font-size: 2.3rem;
  font-family: monospace;
  font-weight: 900;
  color: #fd6032;
}
.logo-slogan {
  font-size: 0.75rem;
  margin: 0;
}
.menu-list {
  font-size: 19px;
  font-weight: 500;
  color: black;
}
.menu-link:hover {
  color: #ff7d04;
}
.navbar-cart {
  align-self: center;
  margin-left: 30px;
}
.navbar-cart .menu-link {
  padding-left: 40px !important;
  position: relative;
}
.navbar-cart i {
  font-size: 24px;
}
.cart-quantity {
  background: #ff7d04;
  font-size: 12px;
  width: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  position: absolute;
  top: -10%;
  right: -2%;
}
.separate {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  height: 32px;
  margin: 0 10px;
}
</style>
