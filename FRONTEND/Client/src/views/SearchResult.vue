<template>
  <div class="container" style="padding: 0 5.2%">
    <h2>Kết quả tìm kiếm: "{{ this.keyword }}"</h2>
    <p style="margin-bottom: 25px">
      Đã tìm thấy {{ filteredProductsCount }} sản phẩm phù hợp
    </p>
    <ListProducts
      v-if="filteredProductsCount > 0"
      :products="filteredProducts"
    />
    <div v-else class="text-center">
      <img src="../assets/images/no-data-logo.png" alt="" style="width: 30%" />
      <p style="font-size: 1.5rem">
        Không có kết quả nào phù hợp với từ khóa trên.
      </p>
    </div>
  </div>
</template>

<script>
import ListProducts from "@/components/ListProducts.vue";
import ProductService from "@/services/product.service";

export default {
  components: {
    ListProducts,
  },
  props: {
    keyword: { type: String, required: true },
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
    productStrings() {
      return this.products.map((product) => {
        const {
          name,
          categagy,
          author,
          publisher,
          publishingYear,
          price,
          quantity,
          discription,
        } = product;
        return [
          name,
          categagy,
          author,
          publisher,
          publishingYear,
          price,
          quantity,
          discription,
        ].join("");
      });
    },
    // Trả về các product có chứa thông tin cần tìm kiếm.
    // filteredProducts() {
    //   if (!this.keyword) return (this.products = []);
    //   return this.products.filter((_product, index) =>
    //     this.productStrings[index].includes(this.keyword)
    //   );
    // },

    filteredProducts() {
      if (!this.keyword) return (this.products = []);
      else {
        const filter = new RegExp(this.keyword, "gi");
        return this.products.filter((_product, index) =>
          this.productStrings[index].match(filter)
        );
      }
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
  },
  mounted() {
    this.retrieveProducts();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}
</style>
