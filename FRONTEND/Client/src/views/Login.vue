<template>
  <div class="authenticate" style="margin-top: 60px">
    <div class="authenticate__form">
      <Form @submit="submitUser" :validation-schema="userFormSchema">
        <h3>Đăng nhập</h3>
        <div class="authenticate__form-group">
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-envelope"></i
            ></span>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              class="form-control"
              v-model="user.email"
              required
            />
          </div>
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="authenticate__form-group mb-2">
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-key"></i
            ></span>
            <Field
              name="password"
              type="password"
              placeholder="Mật khẩu"
              class="form-control password"
              v-model="user.password"
              required
            />
          </div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="authenticate__form-group">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="showPassword"
              @change="changeDisplayedPassword"
            />
            <label class="form-check-label text-end ms-1" for="showPassword">
              Hiện mật khẩu
            </label>
          </div>
        </div>
        <input type="submit" value="Đăng nhập" class="btn btn-primary" />
      </Form>
      <div class="authenticate__render">
        <span>Bạn chưa có tài khoản?</span>
        <router-link :to="{ name: 'signup' }" class="authenticate__link"
          >Đăng ký</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service";
import CartService from "@/services/cart.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const userFormSchema = yup.object().shape({
      email: yup
        .string()
        .email("Email không hợp lệ.")
        .required("Họ tên phải có giá trị."),
      password: yup
        .string()
        .required("Mật khẩu cần phải có giá trị.")
        .min(8, "Mật khẩu phái có ít nhất 8 kí tự."),
    });
    return { userFormSchema, user: { type: Object } };
  },
  methods: {
    async retrieveUserCarts(userId) {
      try {
        return await CartService.listCart(userId);
      } catch (error) {
        console.log(error);
      }
    },
    async submitUser() {
      try {
        let result = await UserService.signIn(this.user);
        alert(result.message);
        if (result.user) {
          let userStore = {
            user: result.user,
          };
          localStorage.setItem("user", JSON.stringify(userStore));
          this.$router.push({ name: "home" });
          let carts = await this.retrieveUserCarts(result.user.userId);
          document.querySelector(".cart-quantity").innerHTML = carts.length;
        }
      } catch (error) {
        console.log(error);
      }
    },
    changeDisplayedPassword() {
      let typeInput = document.querySelector("#showPassword").checked
        ? "text"
        : "password";
      document.querySelector(".password").type = typeInput;
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
