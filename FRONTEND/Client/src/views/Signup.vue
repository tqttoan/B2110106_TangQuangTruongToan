<template>
  <div class="authenticate">
    <div class="authenticate__form" style="width: 650px">
      <Form @submit="submitUser" :validation-schema="userFormSchema">
        <h3 style="margin-top: 20px">Đăng ký</h3>
        <div class="authenticate__form-group">
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-user"></i
            ></span>
            <Field
              name="name"
              type="text"
              placeholder="Họ tên"
              class="form-control"
              v-model="user.name"
              required
            />
          </div>
          <ErrorMessage name="name" class="error-feedback" />
        </div>
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
        <div class="authenticate__form-group">
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-phone"></i
            ></span>
            <Field
              name="phone"
              type="tel"
              placeholder="Số điện thoại"
              class="form-control"
              v-model="user.phone"
              required
            />
          </div>
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="authenticate__form-group">
          <div class="input-group">
            <span class="input-group-text"
              ><i class="fa-solid fa-location-dot"></i
            ></span>
            <Field
              name="address"
              type="text"
              placeholder="Địa chỉ"
              class="form-control"
              v-model="user.address"
              required
            />
          </div>
          <ErrorMessage name="address" class="error-feedback" />
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
        <input type="submit" value="Đăng ký" class="btn btn-primary" />
      </Form>
      <div class="authenticate__render">
        <span>Bạn đã có tài khoản?</span>
        <router-link :to="{ name: 'login' }" class="authenticate__link"
          >Đăng nhập</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "@/services/user.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const userFormSchema = yup.object().shape({
      name: yup.string().required("Tên phải có giá trị."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        )
        .required("Số điện thoại phải có giá trị."),
      address: yup
        .string()
        .max(100, "Địa chỉ có tối đa 100 ký tự.")
        .required("Địa chỉ phải có giá trị."),
      email: yup
        .string()
        .email("Email không hợp lệ.")
        .required("Email phải có giá trị.")
        .min(4, "Email phải có ít nhất 4 kí tự."),
      password: yup
        .string()
        .required("Mật khẩu cần phải có giá trị.")
        .min(8, "Mật khẩu phái có ít nhất 8 kí tự."),
    });
    return { userFormSchema, user: { type: Object } };
  },
  methods: {
    async submitUser() {
      try {
        let result = await UserService.signUp(this.user);
        alert(result.message);
        if (result.success) this.$router.push({ name: "login" });
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

.authenticate__form-group {
  margin-bottom: 20px;
}
</style>
