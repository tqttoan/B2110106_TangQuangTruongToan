<template>
  <div class="container">
    <h2>Giỏ hàng của bạn</h2>
    <CartList
      v-if="carts.length > 0"
      :carts="carts"
      @refresh:carts="refreshCarts"
    />
    <div v-else class="empty-cart">
      <img src="../assets/images/empty-cart.jpg" alt="" />
      <p>
        Không có sản phẩm nào trong giỏ hàng của bạn.
        <router-link :to="{ name: 'products' }"
          >Thêm sản phẩm ngay.</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import CartList from "@/components/CartList.vue";
import CartService from "@/services/cart.service";

export default {
  components: {
    CartList,
  },
  data() {
    return {
      carts: [],
    };
  },
  methods: {
    async retrieveUserCarts(userId) {
      try {
        this.carts = await CartService.listCart(userId);
        this.carts.reverse();
      } catch (error) {
        console.log(error);
      }
    },
    async refreshCarts() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) await this.retrieveUserCarts(user.user.userId);
      document.querySelector(".cart-quantity").innerHTML = this.carts.length;
    },
  },
  mounted() {
    this.refreshCarts();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
.empty-cart {
  background: #fff;
  text-align: center;
  padding: 25px;
}
.empty-cart img {
  width: 30%;
}
.empty-cart p {
  font-size: 20px;
}
</style>
