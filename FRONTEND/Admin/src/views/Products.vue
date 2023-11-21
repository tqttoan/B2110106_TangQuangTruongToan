<template>
  <div class="container-fluid">
    <div class="text-center products__list">
      <div class="fix-content">
        <h2 class="pt-3">Danh sách sản phẩm của cửa hàng</h2>
        <div
          class="header m-2 d-flex justify-content-between align-items-center"
        >
          <div>
            <button class="btn btn-success m-2">
              <router-link
                :to="{ name: 'add.product' }"
                class="text-decoration-none bg-transparent text-white bg-primary"
                ><i class="fa-solid fa-plus me-1"></i> Thêm sản
                phẩm</router-link
              >
            </button>
            <button class="btn btn-danger m-2" @click="deleteAllProducts">
              <i class="fa-solid fa-trash"></i> Xóa tất cả
            </button>
            <button class="btn btn-primary m-2" @click="refreshList">
              <i class="fa-solid fa-rotate-right fa-flip-horizontal"></i> Làm
              mới
            </button>
          </div>
          <InputSearch v-model="searchText" />
        </div>
        <div class="text-end fs-5 mb-2">
          Tổng: {{ this.filteredProductsCount }} sản phẩm
        </div>
        <div class="table-responsive">
          <table class="table table-bordered align-middle mb-0">
            <thead class="table-info fs-5">
              <tr>
                <th class="items" style="width: 4%">STT</th>
                <th class="items" style="width: 10%">Tên sản phẩm</th>
                <th class="items" style="width: 15%">Thông tin chi tiết</th>
                <th class="items" style="width: 10%">Giá</th>
                <th class="items" style="width: 8%">Số lượng</th>
                <th class="items" style="width: 24%">Mô tả</th>
                <th class="items" style="width: 12%">Hình ảnh</th>
                <th class="items" style="width: 8%">Thao tác</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <ProductsList
            v-if="filteredProductsCount > 0"
            :products="filteredProducts"
            @fresh:product="refreshPage"
          />
          <tbody v-else>
            <tr>
              <td colspan="9" class="fs-4" style="height: 60vh">
                <img
                  src="../assets/images/no-result-logo.jpg"
                  alt=""
                  style="width: 25%"
                />
                <p>
                  Không có bất kì sản phẩm nào trong cơ sở dữ liệu.
                  <router-link :to="{ name: 'add.product' }"
                    >Thêm sản phẩm ngay.</router-link
                  >
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/product.service";
import InputSearch from "@/components/InputSearch.vue";
import ProductsList from "@/components/ProductsList.vue";

export default {
  components: {
    InputSearch,
    ProductsList,
  },
  data() {
    return {
      products: [],
      searchText: "",
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
    //   if (!this.searchText) return this.products;
    //   return this.products.filter((_product, index) =>
    //     this.productStrings[index].includes(this.searchText)
    //   );
    // },

    filteredProducts() {
      if (!this.searchText) return this.products;
      else {
        const filter = new RegExp(this.searchText, "gi");
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
        const result = await ProductService.findAll();
        const newProducts = result.map((product) => {
          let newProduct = {
            ...product,
            ...{
              image: `/api/product/images/get/${product._id}`,
            },
          };
          return newProduct;
        });
        newProducts.reverse();
        this.products = newProducts;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAllProducts() {
      if (
        confirm(
          "Đây là thao tác xóa tất cả sản phẩm mà không thể khôi phục. Bạn có muốn tiếp tục thực hiện không?"
        )
      ) {
        try {
          const result = await ProductService.deleteAll();
          alert(result.message);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    refreshList() {
      this.retrieveProducts();
    },

    refreshPage() {
      this.refreshList();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.fix-content {
  position: sticky;
  z-index: 100;
  top: 76px;
  background: #fff;
}
</style>
