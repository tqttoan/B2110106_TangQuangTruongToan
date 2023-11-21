<template>
  <div class="my-orders">
    <h2>Đơn hàng của tôi</h2>
    <div class="orders-list" v-if="ordersList.length > 0">
      <div class="list-items" v-for="(order, index) in ordersList">
        <div class="order-status row px-2">
          <span class="col-6"
            ><span class="text-uppercase fw-bold">Mã đơn hàng:</span>
            {{ order._id }}</span
          >
          <span
            class="col-6 text-end text-uppercase fw-bold"
            style="color: #ff5100"
            >{{ order.statusOrder }}</span
          >
        </div>
        <hr class="mx-2" />
        <div
          v-for="(detail, index) in order.ordersDetails"
          class="order-detail px-2"
        >
          <div class="row detail-info">
            <div class="col-8 row align-items-center">
              <img :src="detail.image" alt="" class="col-5" />
              <span class="col-7 flex-grow-1">{{ detail.productName }}</span>
            </div>
            <div class="col-4 text-end">
              <p>{{ VND().format(detail.productPrices) }}</p>
              <p>x{{ detail.quantity }}</p>
              <p class="pt-2 fw-bold" style="color: #ff5100">
                {{ VND().format(detail.sumPrices) }}
              </p>
            </div>
          </div>
          <hr v-if="index !== order.ordersDetails.length - 1" />
        </div>
        <div class="order-info row px-2 py-3">
          <h4>Địa Chỉ Nhận Hàng</h4>
          <div class="delivery-info col-6">
            <p class="mb-3" style="font-weight: 500">
              {{ order.shipInformation.name }}
            </p>
            <p class="mb-1 text-muted">{{ order.shipInformation.phone }}</p>
            <p class="text-muted">
              {{
                order.shipInformation.addressDetails +
                ", " +
                order.shipInformation.ward +
                ", " +
                order.shipInformation.district +
                ", " +
                order.shipInformation.city
              }}
            </p>
            <p v-if="order.shipInformation.notes" class="mt-3 text-muted">
              Ghi chú: {{ order.shipInformation.notes }}
            </p>
          </div>
          <div class="order-date col-6">
            <div class="d-flex align-items-center">
              <div class="order-icon"><i class="fa-solid fa-receipt"></i></div>
              <div>{{ order.orderDate }}</div>
            </div>
            <p style="margin: 5px 0 0 42px">
              <span class="fw-bolder mb-1">Đặt hàng thành công</span><br /><span
                >Đơn hàng đã được đặt</span
              >
            </p>
          </div>
        </div>
        <div class="order-prices">
          <div class="price-items row">
            <span class="col-8 text-end">Phương thức thanh toán</span>
            <span class="col-4 text-end">{{
              order.shipInformation.payment
            }}</span>
          </div>
          <div class="price-items row">
            <span class="col-8 text-end">Tổng tiền hàng</span>
            <span class="col-4 text-end">{{
              VND().format(sumPrice(order.ordersDetails))
            }}</span>
          </div>
          <div class="price-items row">
            <span class="col-8 text-end">Phí vận chuyển</span>
            <span class="col-4 text-end">{{ VND().format(0) }}</span>
          </div>
          <div class="price-items row">
            <span class="col-8 text-end">Thành tiền</span>
            <span class="col-4 text-end fw-bold fs-4" style="color: #ff6200">{{
              VND().format(order.prices)
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-orders">
      <img src="../assets/images/no-order-icon.png" alt="" />
      <p>Chưa có đơn hàng</p>
    </div>
  </div>
</template>

<script>
import OrderService from "@/services/order.service";

export default {
  data() {
    return {
      ordersList: [],
    };
  },
  methods: {
    async getOrdersList(userId) {
      try {
        let result = await OrderService.getOrdersOfUser(userId);
        this.ordersList = result.reverse();
      } catch (e) {
        console.log(e);
      }
    },
    refreshOrders() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) this.getOrdersList(user.user.userId);
    },
    VND() {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    sumPrice(orderDetails) {
      return orderDetails.reduce((sum, item) => sum + item.sumPrices, 0);
    },
  },
  mounted() {
    this.refreshOrders();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
p {
  margin: 0;
}
hr {
  margin: 0;
}
.my-orders {
  margin: 0 100px;
}
.row {
  margin-left: 0;
  margin-right: 0;
}
.list-items {
  background: #fff;
  margin: 15px 0;
}
.order-status {
  align-items: center;
  height: 65px;
}
.order-detail img {
  width: 14%;
  padding-right: 0;
  padding-left: 0;
}
.detail-info {
  align-items: center;
  height: 130px;
}
.order-info {
  border-top: 1.5px dotted rgba(0, 0, 0, 0.09);
  border-bottom: 1.5px dotted rgba(0, 0, 0, 0.09);
  min-height: 180px;
  background: rgba(255, 254, 251);
}
.delivery-info {
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}
.order-date {
  padding-left: 20px;
}
.order-icon {
  text-align: center;
  margin-right: 10px;
  background: rgb(1, 194, 36);
  width: 30px;
  height: 30px;
  border-radius: 16px;
}
.order-date i {
  font-size: 14px;
  color: #fff;
  vertical-align: bottom;
}
.order-date span {
  color: rgb(1, 194, 36);
}
.price-items {
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.09);
}
.price-items .col-8 {
  border-right: 1px dotted rgba(0, 0, 0, 0.09);
  padding: 14px 12px;
  color: rgb(124, 124, 124);
}
.no-orders {
  background: #fff;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no-orders img {
  width: 25%;
}
.no-orders p {
  font-size: 22px;
}
</style>
