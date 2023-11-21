<template>
  <div class="categoty-table">
    <div class="text-center">
      <h4>Danh mục</h4>
      <div class="underline"></div>
    </div>
    <ul class="list-box list-unstyled">
      <li
        class="items"
        v-for="(category, index) in categories"
        :key="category._id"
        @click="goToProductsPage(category.name)"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array, required: true },
  },
  methods: {
    goToProductsPage(category) {
      this.$router.push({
        name: "products",
        params: { category: category },
      });
    },
  },
};
</script>

<style scoped>
.categoty-table {
  background: #fff;
  padding: 30px 10px;
}
.text-center {
  position: relative;
  margin-bottom: 40px;
}
.underline {
  background: linear-gradient(to right, #fea814, #ff4d00, #f90064);
  height: 1.5px;
  width: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.items {
  border: 1px solid rgba(0, 0, 0, 0.15);
  flex-basis: calc(100% / 6);
  margin: 10px 6px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
}
.items:hover {
  border: 0;
  background: linear-gradient(
    to right,
    rgba(255, 132, 0, 0.15),
    rgba(255, 106, 0, 0.282),
    rgba(255, 0, 115, 0.15)
  );
  box-shadow: 0 0 2px 2px rgba(255, 0, 144, 0.132);
}
</style>
