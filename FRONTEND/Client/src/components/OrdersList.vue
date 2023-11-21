<template>
  <div class="order-list">
    <h4>Đơn hàng ({{ orders.length }} sản phẩm)</h4>
    <div class="list">
      <div v-for="(order, index) in orders" class="list-item row">
        <div class="list-product col-9 row align-items-center">
          <img :src="order.image" alt="" class="col-5" />
          <span class="col-7 flex-grow-1">{{ order.name }}</span>
        </div>
        <div
          class="list-other col-3 flex-grow-1 align-self-center text-end pe-3"
        >
          <p>{{ VND().format(order.price) }}</p>
          <p>x{{ order.cartQuantity }}</p>
          <p class="pt-2 fw-bold" style="color: #ff5100">
            {{ VND().format(order.price * order.cartQuantity) }}
          </p>
        </div>
      </div>
    </div>
    <div class="list-sum d-flex flex-column justify-content-center px-3">
      <div class="temp-price row mb-1">
        <span class="col-6">Tạm tính</span>
        <span class="col-6 text-end">{{ VND().format(sumPrice()) }}</span>
      </div>
      <div class="ship-price row">
        <span class="col-6">Phí giao hàng</span>
        <span class="col-6 text-end">{{ VND().format(0) }}</span>
      </div>
      <hr />
      <div class="sum-price row">
        <span class="col-6">Tổng cộng</span>
        <span class="col-6 text-end" style="color: #ff6200">{{
          VND().format(sumPrice())
        }}</span>
      </div>
      <hr />
      <div class="back-submit row align-items-center mt-2">
        <div class="col-6">
          <router-link :to="{ name: 'cart' }" class="text-decoration-none"
            ><i class="fa-solid fa-angle-left"></i> Quay về giỏ
            hàng</router-link
          >
        </div>
        <div class="submit col-6 btn-group" role="button">
          <button type="submit" form="order-form" class="btn">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/services/cart.service";

export default {
  props: {
    orders: { type: Array, required: true },
  },
  methods: {
    sumPrice() {
      return this.orders.reduce(
        (sum, item) => sum + item.price * item.cartQuantity,
        0
      );
    },
    VND() {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
};
</script>

<style scoped>
.list-item,
.list-sum {
  background: #fff;
  margin: 0 0 10px;
}
.list-item {
  min-height: 90px;
  font-size: 15px;
}
.list-product img {
  width: 30%;
  padding-right: 0;
  padding-left: 0;
}
h4 {
  margin-bottom: 15px;
  color: #ff6200;
}
.list {
  overflow: auto;
  max-height: 325px;
}
.list-other p {
  margin: 0;
  font-size: 14px;
}
.list-other p:not(.pt-2) {
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
}
.list-sum {
  height: 220px;
  margin-top: 25px;
  box-shadow: 2px 2px 4px 4px rgba(255, 0, 51, 0.15);
}
hr {
  margin: 12px 0;
}
.sum-price span {
  font-size: 20px;
  font-weight: 700;
}
.back-submit div a {
  color: #ff6a00;
  font-weight: 500;
}
.back-submit div a:hover {
  color: #ff2f00;
}
.back-submit div a:hover i {
  transform: translateX(-3px);
  transition: all 0.2s ease-in-out;
}
.submit button {
  background: linear-gradient(
    to right bottom,
    #fd9801,
    #fd7201,
    #fe6201,
    #fe015e
  );
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 10px 0;
  margin-left: 25px;
  outline: none;
  border: 0;
}
.submit button:hover {
  background: linear-gradient(to left top, #fd9801, #fd7201, #fe6201, #fe015e);
}
</style>
