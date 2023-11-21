<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Thêm sản phẩm mới</h2>
    <ProductForm :product="product" @submit:product="saveProduct" />
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
  emits: ["refresh:types"],
  data() {
    return {
      product: {
        name: "",
        category: "",
        author: "",
        publisher: "",
        publishingYear: null,
        discription: "",
        price: null,
        quantity: null,
        image: "",
      },
      message: "",
    };
  },
  methods: {
    async saveProduct(data) {
      try {
        const {
          name,
          category,
          author,
          publisher,
          publishingYear,
          discription,
          price,
          quantity,
        } = data;
        let result = await ProductService.create({
          name,
          category,
          author,
          publisher,
          publishingYear,
          discription,
          price,
          quantity,
        });
        const file = document.querySelector(".fileInput").files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("product", result.product._id);
        try {
          await ImageService.uploadImage(formData);
        } catch (error) {
          console.log(error);
        }

        // const file = document.querySelector(".fileInput").files[0];
        // const formData = new FormData();
        // formData.append("image", file);

        // let resultImg = null;
        // try {
        //   const resultImg = await ImageService(formData);
        //   console.log(resultImg);
        // } catch (error) {
        //   console.log(error);
        // }
        // console.log(resultImg);
        // const { name, typeOfProduct, discription, price, number, notes } = data;
        // const productData = {
        //   ...{ name, typeOfProduct, discription, price, number, notes },
        //   ...{ image: resultImg._id },
        // };

        // let result = await ProductService.create(productData);
        if (
          confirm(result.message + " Bạn có muốn tiếp tục thêm sản phẩm không?")
        ) {
          document.querySelector("#productForm").reset();
        } else {
          this.$router.push({ name: "list.products" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
