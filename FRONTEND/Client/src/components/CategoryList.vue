<template>
  <div class="categoy-list">
    <h5><i class="fa-solid fa-bars-staggered"></i>Danh mục</h5>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        :class="{ active: activeCategory === '' }"
        @click="updateActiveCategory('')"
      >
        Tất cả
      </li>
      <li
        class="list-group-item"
        v-for="(category, index) in categories"
        :key="category._id"
        :class="{ active: category.name === activeCategory }"
        @click="updateActiveCategory(category.name)"
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
    activeCategory: { type: String, default: "" },
  },
  emits: ["update:activeCategory"],
  methods: {
    updateActiveCategory(category) {
      this.$emit("update:activeCategory", category);
      this.$router.push({ params: { category: category } });
    },
  },
};
</script>

<style scoped>
.categoy-list {
  margin: 10px 10px 0 0;
}
.categoy-list h5 {
  background: #f77802;
  margin: 0;
  height: 45px;
  color: #fff;
  text-transform: uppercase;
  line-height: 45px;
  text-align: center;
}
.categoy-list h5 i {
  margin-right: 10px;
}
.categoy-list li {
  cursor: pointer;
  font-size: 17px;
}
.categoy-list li:hover {
  color: #f75c02;
}
.active {
  color: #ff4d00 !important;
  background: linear-gradient(
    to right,
    rgba(254, 169, 0, 0.3),
    rgba(254, 102, 0, 0.3)
  ) !important;
  border: 0 !important;
}
</style>
