<template>
  <div class="container">
    <h2>
      Tất cả sản phẩm
      <span v-if="this.activeCategory"
        ><i class="fa-solid fa-angle-right"></i> {{ this.activeCategory }}</span
      >
    </h2>
    <div v-if="filteredProductsCount > 0" class="row flex-nowrap">
      <CategoryList
        v-model:activeCategory="activeCategory"
        :categories="this.categories"
        class="col-3"
        style="height: 100%"
      />
      <ListProducts :products="filteredProducts" />
    </div>
    <div v-else class="text-center">
      <p style="font-size: 1.5rem">Không có sản phẩm nào tại cửa hàng.</p>
    </div>
  </div>
</template>

<script>
import ListProducts from "@/components/ListProducts.vue";
import CategoryList from "@/components/CategoryList.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    ListProducts,
    CategoryList,
  },
  data() {
    return {
      products: [],
      categories: [],
      activeCategory: this.$router.currentRoute._value.params.category
        ? this.$router.currentRoute._value.params.category
        : "",
    };
  },
  computed: {
    // Trả về các product có chứa danh mục đã chọn.
    filteredProducts() {
      if (!this.activeCategory) return this.products;
      return this.products.filter(
        (product) => product.category === this.activeCategory
      );
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    async retrieveProducts() {
      try {
        const result = await ProductService.find();
        const newProducts = result.map((product) => {
          let newProduct = {
            ...product,
            ...{
              image: `/api/product/images/get/${product._id}`,
            },
          };
          return newProduct;
        });
        this.products = newProducts;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        const result = await ProductService.getAllCategories();
        this.categories = result;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.retrieveProducts();
    this.getCategories();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
h2 i {
  font-size: 28px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
