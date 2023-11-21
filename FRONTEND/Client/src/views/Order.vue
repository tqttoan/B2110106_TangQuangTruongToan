<template>
  <div class="container">
    <h2>Đặt hàng</h2>
    <div class="order-box row">
      <OrderForm @submit:order="saveNewOrder" class="order-user col-8" />
      <OrdersList
        v-if="cartsList.length > 0"
        :orders="cartsList"
        class="order-product col-4"
        @submit:order="saveNewOrder"
      />
    </div>
  </div>
</template>

<script>
import CartService from "@/services/cart.service";
import OrderForm from "@/components/OrderForm.vue";
import OrdersList from "@/components/OrdersList.vue";
import OrderService from "@/services/order.service";

export default {
  components: {
    OrderForm,
    OrdersList,
  },
  props: {
    cartIdList: { type: Array, required: true },
  },
  data() {
    return {
      cartsList: [],
    };
  },
  methods: {
    async retrieveUserCarts(userId) {
      try {
        const result = await CartService.listCart(userId);
        this.cartsList = result.filter((cart) => {
          let cartId = this.cartIdList.find((id) => id === cart._id);
          if (cartId) return cart;
        });
      } catch (error) {
        console.log(error);
      }
    },
    refreshOrder() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) this.retrieveUserCarts(user.user.userId);
    },
    async refreshCarts() {
      const user = JSON.parse(localStorage.getItem("user"));
      let carts = [];
      if (user) carts = await CartService.listCart(user.user.userId);
      document.querySelector(".cart-quantity").innerHTML = carts.length;
    },
    async saveNewOrder(data) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const sumPrices = this.cartsList.reduce(
          (sum, item) => sum + item.price * item.cartQuantity,
          0
        );
        const products = this.cartsList.map((cart) => {
          return {
            id: cart.productId,
            quantity: cart.cartQuantity,
            prices: cart.cartQuantity * cart.price,
          };
        });
        const order = {
          deliveryInfo: { ...data },
          orderPrices: sumPrices,
          products: products,
          userId: user.user.userId,
          cartIdList: this.cartIdList,
        };
        try {
          const result = await OrderService.saveOrder(order);
          if (result) {
            alert(result.message);
            this.refreshCarts();
            this.$router.push({ name: "myOrders" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  mounted() {
    this.refreshOrder();
    document.querySelector(".header__search-bg").style.display = "none";
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
body {
  background: #fff;
}
</style>
