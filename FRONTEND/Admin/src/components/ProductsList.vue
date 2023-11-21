<template>
  <tbody class="table-items">
    <tr v-for="(product, index) in products" :key="product._id">
      <th class="items" style="width: 4%">{{ index + 1 }}</th>
      <th
        class="items"
        style="width: 10%; color: rgb(255, 85, 0); font-weight: 700"
      >
        {{ product.name }}
      </th>
      <th class="items" style="width: 15%; text-align: left; padding: 10px">
        <p><span>Tác giả:</span> {{ product.author }}</p>
        <p><span>Nhà xuất bản:</span> {{ product.publisher }}</p>
        <p><span>Năm xuất bản:</span> {{ product.publishingYear }}</p>
        <p><span>Danh mục:</span> {{ product.category }}</p>
      </th>
      <th class="items" style="width: 10%">
        {{ VND().format(product.price) }}
      </th>
      <th class="items" style="width: 8%">{{ product.quantity }}</th>
      <th
        class="items"
        style="width: 24%; text-align: left; padding-right: 2px"
      >
        <pre>{{ product.discription }}</pre>
      </th>
      <th class="items" style="width: 12%">
        <img :src="product.image" alt="" style="width: 100%;/ " />
      </th>
      <th class="items" style="width: 8%">
        <router-link
          :to="{
            name: 'edit.product',
            params: { id: product._id },
          }"
        >
          <button
            class="btn btm-sm btn-primary mb-3"
            type="submit"
            style="width: 75%"
          >
            Sửa
          </button>
        </router-link>
        <button
          class="btn btn-sm btn-danger"
          type="submit"
          @click="deleteProduct(product._id)"
          style="width: 75%"
        >
          Xóa
        </button>
      </th>
    </tr>
  </tbody>
</template>

<script>
import ProductService from "@/services/product.service";

export default {
  emits: ["fresh:product"],
  props: {
    products: { type: Array, default: [] },
  },

  methods: {
    async deleteProduct(id) {
      if (confirm("Bạn muốn tiếp tục xóa sản phẩm này?")) {
        try {
          let result = await ProductService.delete(id);
          alert(result.message);
          this.$emit("fresh:product");
        } catch (error) {
          console.log(error);
        }
      }
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
.items {
  font-weight: 400;
}
.items p span {
  font-weight: 500;
}
pre {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  white-space-collapse: break-spaces;
  text-wrap: balance;
  text-align: justify;
  max-height: 240px;
  margin: 0;
  padding-right: 4px;
}
</style>
