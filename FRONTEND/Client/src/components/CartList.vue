<template>
  <div class="cart-detail flex-nowrap">
    <div class="cart-list">
      <div class="cart-header row">
        <div class="cart-check">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="selectedAllProducts"
            />
          </div>
        </div>
        <div class="cart-product col-5">Sản phẩm</div>
        <div class="cart-price col-2">Giá</div>
        <div class="cart-quantity col-2">Số lượng</div>
        <div class="cart-sum-price col-2">Tạm tính</div>
        <div class="cart-delete">#</div>
      </div>
      <div
        class="cart-body row"
        v-for="(cartItem, index) in carts"
        :key="cartItem._id"
        :id="cartItem._id"
      >
        <div class="cart-check">
          <div class="form-check">
            <input
              class="form-check-input check-one"
              type="checkbox"
              :value="cartItem"
              v-model="selectedProducts"
            />
          </div>
        </div>
        <div
          class="cart-product col-5 row"
          @click="goToProductDetail(cartItem.productId)"
          style="cursor: pointer"
        >
          <img :src="cartItem.image" alt="" class="col-5" />
          <span class="col-7">{{ cartItem.name }}</span>
        </div>
        <div class="cart-price col-2" v-if="cartItem.quantity > 0">
          {{ VND().format(cartItem.price) }}
        </div>
        <div class="cart-quantity col-2" v-if="cartItem.quantity > 0">
          <div class="btn-group btn-quantity">
            <button
              type="button"
              class="btn-change"
              style="border-right: 1px solid rgba(0, 0, 0, 0.15)"
              @click="if (cartItem.cartQuantity > 1) cartItem.cartQuantity--;"
              @blur="updateQuantity(cartItem, index)"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <input
              v-model.number="cartItem.cartQuantity"
              @change="
                if (cartItem.cartQuantity < 1) cartItem.cartQuantity = 1;
                if (cartItem.cartQuantity > cartItem.quantity)
                  cartItem.cartQuantity = cartItem.quantity;
              "
              @blur="updateQuantity(cartItem, index)"
            />
            <button
              type="button"
              class="btn-change"
              style="border-left: 1px solid rgba(0, 0, 0, 0.15)"
              @click="
                if (cartItem.cartQuantity < cartItem.quantity)
                  cartItem.cartQuantity++;
              "
              @blur="updateQuantity(cartItem, index)"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="cart-sum-price col-2" v-if="cartItem.quantity > 0">
          {{ VND().format(cartItem.price * cartItem.cartQuantity) }}
        </div>
        <div class="col-6" v-if="cartItem.quantity < 1">
          Sản phẩm này hiện tại đã hết hàng, quý khách có thể xóa sản phẩm này
          nếu muốn.
        </div>
        <div class="cart-delete">
          <button
            type="button"
            class="btn-delete"
            @click="deleteProductFromCart(cartItem._id)"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="cart-sum row justify-content-between align-items-center">
      <div class="delete-many col-5 row mt-3 align-items-center">
        <div class="cart-sum-check col-6">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="selectedAllProducts"
            />
            <span class="align-middle ms-2"
              >Chọn tất cả ({{ this.carts.length }})</span
            >
          </div>
        </div>
        <button
          type="button"
          class="text-start btn-delete-many col-6"
          @click="deleteManyCartItems"
        >
          Xóa
        </button>
      </div>
      <div class="sum-prices col-7">
        <div class="row">
          <div class="col-7">
            <h5>Tổng</h5>
            <span class="fw-normal">
              ({{ selectedProducts.length }} Sản phẩm)</span
            >
          </div>
          <div class="col-5 text-end fw-bold">
            {{
              VND().format(
                sumPrice() + (selectedProducts.length > 0 ? 10000 : 0)
              )
            }}
          </div>
        </div>
        <div class="submit-order btn-group" role="button">
          <button type="submit" class="btn" @click="goToOrderPage">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "@/services/cart.service";
export default {
  props: {
    carts: { type: Array, required: true },
  },
  emits: ["refresh:carts"],
  data() {
    return {
      selectedProducts: [],
      selectedAllProducts: false,
    };
  },
  watch: {
    selectedAllProducts() {
      this.selectedProducts = this.selectedAllProducts
        ? [...this.carts]
        : this.selectedProducts.length === this.carts.length
        ? []
        : this.selectedProducts;
    },
    selectedProducts() {
      this.selectedAllProducts =
        this.selectedProducts.length === this.carts.length;
    },
  },
  methods: {
    deleteProductFromCart(cartItemId) {
      document.getElementById(`${cartItemId}`).classList.add("delete-product");
      setTimeout(async () => {
        try {
          const result = await CartService.deleteCartItem(cartItemId);
          console.log(result);
          this.$emit("refresh:carts");
        } catch (error) {
          console.log(error);
        }
      }, 700);
    },
    async updateQuantity(cartItem, index) {
      const { userId, productId, cartQuantity, oldQuantity } = cartItem;
      console.log(userId, productId, cartQuantity, oldQuantity);
      console.log(cartQuantity != oldQuantity);
      if (cartQuantity != oldQuantity) {
        try {
          const result = await CartService.updateQuantity(cartItem._id, {
            userId,
            productId,
            quantity: cartQuantity,
          });
          console.log(result);
          this.carts[index].oldQuantity = cartQuantity;
          console.log(this.carts[index]);
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToProductDetail(productId) {
      this.$router.push({
        name: "product.detail",
        params: { id: productId },
      });
    },
    async deleteManyCartItems() {
      if (this.selectedProducts.length === 0)
        alert("Chưa có sản phẩm nào được chọn.");
      else {
        try {
          if (this.selectedProducts.length === this.carts.length) {
            if (
              confirm(
                "Đây là thao tác xóa tất cả sản phẩm khỏi giỏ hàng và không thể khôi phục. Bạn có muốn tiếp tục thực hiện không?"
              )
            ) {
              const user = JSON.parse(localStorage.getItem("user"));
              if (user) {
                const result = await CartService.deleteUserCart(
                  user.user.userId
                );
                console.log(result);
              }
            }
          } else {
            if (
              confirm(
                `Bạn có muốn xóa ${this.selectedProducts.length} sản phẩm?`
              )
            ) {
              const manyCartItem = this.selectedProducts.map(
                (item) => item._id
              );
              const result = await CartService.deleteManyCartItem(manyCartItem);
              this.selectedProducts = [];
              alert(result.message);
            }
          }
          this.$emit("refresh:carts");
        } catch (error) {
          console.log(error);
        }
      }
    },
    sumPrice() {
      return this.selectedProducts.reduce(
        (sum, item) => sum + item.price * item.cartQuantity,
        0
      );
    },
    VND() {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    goToOrderPage() {
      if (this.selectedProducts.length === 0)
        alert("Bạn vẫn chưa chọn sản phẩm nào để mua.");
      else {
        let newCarts = this.selectedProducts.map((item) => item._id);
        this.$router.push({
          name: "order",
          query: {
            cart: newCarts,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.delete-product {
  animation: del 0.8s ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes del {
  from {
    transform: none;
  }
  to {
    transform: translateX(-150%);
  }
  to {
    display: none;
  }
}
.cart-detail {
  margin: 40px 0;
}
.cart-header {
  background: #fff;
  height: 60px;
  align-items: center;
  font-weight: 700;
  margin-bottom: 20px;
}
.cart-product {
  flex-grow: 1;
}
.cart-product img {
  width: 20%;
  padding-right: 0;
}
.cart-product span {
  font-weight: 600;
  flex-grow: 1;
  align-self: center;
}
.cart-body {
  background: #fff;
  margin-top: 10px;
  height: 120px;
  align-items: center;
}
.cart-check,
.cart-delete {
  width: calc(100% / 12 / 2);
  padding: 0;
}
.cart-check {
  padding-left: 1.7%;
  z-index: 999;
}
.form-check-input[type="checkbox"] {
  padding: 9px;
  border-radius: 2px !important;
}
.form-check-input:focus {
  border: 0;
  box-shadow: 0 0 2px 2px rgba(255, 111, 2, 0.3);
}
.form-check-input:checked {
  background-color: #fd5101;
  border: 1px solid #fd5101;
}
.btn-delete {
  background: transparent;
  outline: none;
  border: 0;
  padding: 0;
}
.btn-delete i {
  font-size: 1.7rem;
  color: rgba(0, 0, 0, 0.25);
}
.btn-delete:hover i {
  color: #fd5101;
}
.cart-price,
.cart-quantity,
.cart-sum-price {
  text-align: center;
}
.cart-body .cart-price {
  color: #fd7f01;
  font-weight: 500;
}
.cart-body .cart-sum-price {
  color: #fd5101;
  font-weight: 500;
}
.btn-quantity {
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0;
}
.btn-change {
  border-radius: 0;
  outline: 0;
  border: 0;
  padding: 3px 8px;
  background: #fff;
}
.btn-change:hover {
  background: #fd7201;
}
.btn-change:hover i {
  color: #fff;
}
.btn-quantity button i {
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
.btn-quantity input {
  outline: none;
  border: 0;
  background: #fff;
  text-align: center;
  width: 50px;
}
.cart-sum {
  background: #fff;
  margin-top: 30px;
  /* border-radius: 10px; */
  /* height: 470px; */
  height: 150px;
  font-size: 18px;
  position: sticky;
  bottom: 0;
  z-index: 999;
  /* box-shadow: 2px 2px 4px 4px rgba(255, 0, 51, 0.15); */
}
.cart-sum::before {
  content: "";
  position: absolute;
  top: -1.25rem;
  left: 0;
  height: 1.25rem;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.06));
}
.btn-delete-many {
  color: #fd5101;
  outline: none;
  border: 0;
  background: transparent;
}
.btn-delete-many:hover {
  font-weight: 500;
  color: #fd2b01;
}
.cart-sum h5 {
  color: #fd5101;
  text-transform: capitalize;
  display: inline;
  font-size: 19px;
}
.cart-sum .sum-prices {
  padding-left: 350px;
}
.cart-sum div.text-end {
  color: #fd5101;
}
.submit-order {
  margin-top: 25px;
  width: 100%;
}
.submit-order button {
  background: linear-gradient(to right, #fd9801, #fd7201, #fe6201, #fe015e);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 10px 0;
  outline: none;
  border: 0;
}
.submit-order button:hover {
  background: radial-gradient(#fd9801, #fd7201, #fe6201, #fe015e);
}
</style>
