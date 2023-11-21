<template>
  <div class="authenticate" style="height: 75vh">
    <div class="authenticate__form" style="width: 550px">
      <Form
        @submit="submitAdmin"
        :validation-schema="adminFormSchema"
        class="form"
      >
        <h3>Đăng nhập</h3>
        <div class="authenticate__form-group">
          <div class="form-box">
            <Field
              name="phone"
              type="text"
              class="authenticate__form-input"
              v-model="admin.phone"
              required
            />
            <label for="">Số điện thoại</label>
          </div>
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="authenticate__form-group mb-2">
          <div class="form-box">
            <Field
              name="password"
              type="password"
              class="authenticate__form-input password"
              v-model="admin.password"
              required
            />
            <label for="">Mật khẩu</label>
          </div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="authenticate__form-group">
          <div class="form-check text-start">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="showPassword"
              @change="changeDisplayedPassword"
            />
            <label class="form-check-label ms-1" for="showPassword">
              Hiện mật khẩu
            </label>
          </div>
        </div>
        <input
          class="authenticate__form-submit"
          type="submit"
          value="Đăng nhập"
        />
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AdminService from "@/services/admin.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const adminFormSchema = yup.object().shape({
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        )
        .required("Số điện thoại phải có giá trị."),
      password: yup
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
        .required("Mật khẩu phải có ít nhất 8 ký tự."),
    });
    return { adminFormSchema, admin: { type: Object } };
  },
  methods: {
    async submitAdmin() {
      try {
        let result = await AdminService.signIn(this.admin);
        alert(result.message);
        if (result.admin) {
          localStorage.setItem("admin", JSON.stringify(result.admin));
          this.$router.push({ name: "home" });
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
