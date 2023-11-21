<template>
  <div class="container my-4">
    <div class="row" v-if="product">
      <div class="col-5 book-img">
        <img :src="product.image" alt="" />
      </div>
      <div class="col-7 book-info">
        <h1>{{ product.name }}</h1>
        <p class="info-price">{{ VND().format(product.price) }}</p>
        <div class="info-other">
          <p>Tác giả: {{ product.author }}</p>
          <p>Thể loại: {{ product.category }}</p>
          <p>Nhà xuất bản: {{ product.publisher }}</p>
          <p>Năm xuất bản: {{ product.publishingYear }}</p>
        </div>
        <div class="book-status">
          <div
            v-if="product.quantity > 0"
            style="background: rgba(52, 247, 3, 0.3)"
          >
            <span
              >Tình trạng: Còn hàng ({{ product.quantity }} sản phẩm sẵn có)<i
                class="fa-solid fa-circle-check fa-beat"
                style="color: #027107"
              ></i
            ></span>
          </div>
          <div v-else style="background: rgba(247, 3, 3, 0.3)">
            <span>
              Tình trạng: Hết hàng<i
                class="fa-solid fa-circle-xmark fa-beat"
                style="color: #d00000"
              ></i
            ></span>
          </div>
        </div>
        <div class="add-cart">
          <span style="margin-right: 20px; font-size: 18px; font-weight: 300"
            >Số lượng:
          </span>
          <div class="btn-group btn-quantity">
            <button
              type="button"
              class="btn-change"
              style="border-right: 1px solid rgba(0, 0, 0, 0.15)"
              @click="if (this.quantity > 1) this.quantity--;"
              :disabled="product.quantity < 1"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <input
              v-model="this.quantity"
              @change="
                if (this.quantity < 1) this.quantity = 1;
                if (this.quantity > product.quantity)
                  this.quantity = product.quantity;
              "
              :disabled="product.quantity < 1"
            />
            <button
              type="button"
              class="btn-change"
              style="border-left: 1px solid rgba(0, 0, 0, 0.15)"
              @click="if (this.quantity < product.quantity) this.quantity++;"
              :disabled="product.quantity < 1"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="btn-group btn-cart">
            <button
              type="button"
              class="btn-submit"
              @click="addProductIntoCart(product._id)"
              :disabled="product.quantity < 1"
            >
              <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 book-discription">
        <h3>Mô tả sản phẩm</h3>
        <hr />
        <pre>{{ product.discription }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";

export default {
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      product: null,
      quantity: 1,
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
      }
    },
    async addProductIntoCart(productId) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        this.$router.push({ name: "login" });
      } else {
        const cartItem = {
          userId: user.user.userId,
          productId: productId,
          quantity: Number(this.quantity),
        };
        try {
          const result = await CartService.addToCart(cartItem);
          alert(result.message);
          this.updateCartQuantity();
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
    async updateCartQuantity() {
      const user = JSON.parse(localStorage.getItem("user"));
      let carts = [];
      if (user) carts = await CartService.listCart(user.user.userId);
      document.querySelector(".cart-quantity").innerHTML = carts.length;
    },
  },
  created() {
    this.getProduct(this.id);
  },
};
</script>

<style scoped>
.book-img {
  border: 2px solid #fe6201;
  text-align: center;
  display: flex;
  justify-content: center;
}
.book-img img {
  width: 80%;
  margin: 20px 0;
}
.book-info {
  padding-left: 60px;
}
.book-info h1 {
  margin-bottom: 25px;
}

.info-price {
  color: #fe6201;
  font-size: 28px;
  font-weight: 600;
}
.info-other {
  margin: 30px 0;
  line-height: 15px;
  font-size: 18px;
  font-weight: 300;
}
.book-status {
  height: 60px;
  font-size: 18px;
  margin: 40px 0 50px;
  line-height: 60px;
}
.book-status div {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  position: relative;
}
.book-status i {
  font-size: 26px;
  position: absolute;
  right: 20px;
  top: 18px;
}
.btn-quantity {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0;
}
.btn-change {
  border-radius: 0;
  outline: 0;
  border: 0;
  padding: 8px 15px;
  background: #fff;
}
.btn-change:hover {
  background: #fd7201;
}
.btn-change:hover i {
  color: #fff;
}
.btn-group button i {
  color: #fd7201;
}
.btn:focus-visible {
  border: 0;
  outline: 0;
  background: #fff !important;
}
.btn:focus-visible i {
  color: #fd7201 !important;
}
.btn-group input {
  outline: none;
  border: 0;
  background: #fff;
  text-align: center;
  width: 90px;
}

.btn-cart:hover .btn-submit {
  background: linear-gradient(to left, #fd9801, #fd7201, #fe6201);
  box-shadow: 0 0 2px 2px #fd01485d;
  transition: all 0.3s ease-in-out;
}
.btn-cart .btn-submit i {
  color: #fff;
  margin-right: 5px;
}
.btn-submit {
  padding: 7px 15px;
  border: 0;
  outline: 0;
  background: linear-gradient(to right, #fd9801, #fd7201, #fe6201);
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 0 25px;
  width: 270px;
}
.book-discription {
  margin: 100px 0 25px;
}
.book-discription h3 {
  margin: 0;
  color: #fe5a01;
  text-transform: uppercase;
}
.book-discription hr {
  margin-top: 5px;
}
pre {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  white-space-collapse: break-spaces;
  text-wrap: balance;
  text-align: justify;
  margin: 6px;
}
</style>
