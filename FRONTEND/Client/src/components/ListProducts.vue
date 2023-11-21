<template>
  <div class="products-list row flex-shrink-1">
    <div
      v-for="(product, index) in products"
      :key="product._id"
      class="list-group"
      @click="goToProductDetail(product._id)"
    >
      <div class="list-item">
        <div class="item-img"><img :src="product.image" alt="" /></div>
        <div class="item-infor text-center">
          <div class="item-name">{{ product.name }}</div>
          <div class="item-price">
            <span>{{ VND().format(product.price) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array, required: true },
  },
  methods: {
    goToProductDetail(id) {
      this.$router.push({
        name: "product.detail",
        params: { id: id },
      });
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
.products-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0; /* Phan chinh cua trang home, trang products khong chinh */
  /* justify-content: space-between; */
  height: 100%;
}
.list-group {
  margin: 10px 0;
  flex-basis: 14.5rem;
  min-height: 320px;
}
.list-item {
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;

  transition: all 0.3s ease-in-out;
  height: 100%;
}
.item-img {
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-item img {
  width: 90%;
  height: 90%;
  /* margin-top: 2px; */
}

.item-infor {
  height: 40%;
}
.item-name {
  height: 60%;
  padding: 0 6px;
}
.item-price {
  color: rgb(255, 77, 0);
  font-weight: 600;
  font-size: 1.15rem;
}
.list-group .list-item:hover {
  border: 1px solid rgb(255, 77, 0);
  position: relative;
  top: -3px;
}
</style>
