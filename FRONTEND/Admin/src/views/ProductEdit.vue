<template>
  <div class="container mt-5" v-if="product">
    <h4 class="text-center mb-4">Chỉnh sửa sản phẩm</h4>
    <ProductForm :product="product" @submit:product="updateProduct" />
  </div>
  <p>{{ message }}</p>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";
import ImageService from "@/services/images.service";

export default {
  components: {
    ProductForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      product: null,
      message: "",
    };
  },
  methods: {
    async getProduct(id) {
      try {
        const result = await ProductService.findOne(id);
        let newProduct = {
          ...result,
          ...{
            image: `/api/product/images/get/${result._id}`,
          },
        };
        this.product = newProduct;
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateProduct(data) {
      try {
        let result = await ProductService.update(this.id, data);

        const file = document.querySelector(".fileInput").files[0];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("product", result.product._id);
          // formData.append("oldProduct", this.id);
          try {
            await ImageService.updateImage(this.id, formData);
          } catch (error) {
            console.log(error);
          }
        }
        alert(result.message);
        this.$router.push({ name: "list.products" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getProduct(this.id);
    this.message = "";
  },
};
</script>
