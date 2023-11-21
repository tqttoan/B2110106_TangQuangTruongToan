<template>
  <div class="container">
    <div class="row banner">
      <div class="banner-slides col-8">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="../assets/images/slider_1.webp"
                class="d-block w-100"
                alt="..."
                data-bs-interval="1000"
              />
            </div>
            <div class="carousel-item">
              <img
                src="../assets/images/slider_2.webp"
                class="d-block w-100"
                alt="..."
                data-bs-interval="1000"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-4 banner-side">
        <img
          src="../assets/images/slider_banner_side.webp"
          alt=""
          class="img-fluid"
        />
      </div>
    </div>
    <CategoryTable
      v-if="this.categories.length > 0"
      :categories="this.categories"
    />
    <div class="list-products">
      <div class="text-center">
        <h4>Sản phẩm</h4>
        <div class="underline"></div>
      </div>
      <ListProducts v-if="this.products.length > 0" :products="this.products" />
      <div class="go-to-products-btn text-center">
        <router-link :to="{ name: 'products' }"
          ><button type="button" class="btn">Xem tất cả</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import CategoryTable from "../components/CategoryTable.vue";
import ProductService from "@/services/product.service";
import ListProducts from "../components/ListProducts.vue";

export default {
  components: {
    ListProducts,
    CategoryTable,
  },
  data() {
    return {
      categories: [],
      products: [],
    };
  },
  methods: {
    async getCategories() {
      try {
        const result = await ProductService.getAllCategories();
        this.categories = result;
      } catch (error) {
        console.log(error);
      }
    },
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
        if (newProducts.length <= 15) this.products = newProducts;
        else this.products = newProducts.slice(0, 15);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.retrieveProducts();
    this.categories = this.getCategories();
  },
};
</script>

<style scoped>
.banner {
  margin: 30px 0 50px;
  max-height: 500px;
}
.carousel-item img {
  width: 100%;
}
.banner-slides img {
  width: 100%;
}
.banner-side {
  text-align: center;
}
.banner-side img {
  width: 93.4%;
}
.list-products {
  background: #fff;
  margin: 50px 0;
  padding: 30px 4.4%;
}
.list-products .text-center {
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
.go-to-products-btn button {
  background: #ff6200;
  margin-top: 30px;
  width: 160px;
  height: 45px;
  border-radius: 8px;
  color: #fff;
  font-weight: 500;
  outline: 0;
  border: 0;
}
.go-to-products-btn button:hover {
  background: radial-gradient(#fd9801, #fd7201, #fe6201, #fe015e);
  color: #000;
  box-shadow: 0 0 2px 2px rgba(255, 0, 132, 0.3);
}
</style>
