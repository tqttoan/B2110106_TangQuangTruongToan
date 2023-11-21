<template>
  <div class="container">
    <Form
      @submit="submitEmployee"
      :validation-schema="adminFormSchema"
      id="employeeForm"
    >
      <div class="form-group mb-4">
        <label for="name">Họ tên</label>
        <Field
          name="name"
          class="form-control"
          v-model="employeeLocal.name"
          required
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group mb-4">
        <label for="phone">Số điện thoại</label>
        <Field
          name="phone"
          type="text"
          class="form-control"
          v-model="employeeLocal.phone"
          required
        />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
      <div class="form-group mb-4">
        <label for="address">Địa chỉ</label>
        <Field
          name="address"
          type="text"
          class="form-control"
          v-model="employeeLocal.address"
          required
        />
        <ErrorMessage name="address" class="error-feedback" />
      </div>
      <div class="form-group mb-4">
        <label for="position">Chức vụ</label>
        <Field
          name="position"
          as="select"
          class="form-control form-select"
          v-model="employeeLocal.position"
        >
          <option value="" selected>---Chọn chức vụ---</option>
          <option value="Quản trị viên">Quản trị viên</option>
          <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
          <option value="Nhân viên kinh doanh">Nhân viên kinh doanh</option>
          <option value="Nhân viên Marketing">Nhân viên Marketing</option>
          <option value="Nhân viên IT">Nhân viên IT</option>
          <option value="Nhân viên kho">Nhân viên kho</option>
          <option value="Công nhân in và thành phẩm">
            Công nhân in và thành phẩm
          </option>
          <option value="Nhân viên làm việc bán thời gian">
            Nhân viên làm việc bán thời gian
          </option>
          <option value="Nhân viên làm việc thời vụ tại kho, xưởng">
            Nhân viên làm việc thời vụ tại kho, xưởng
          </option>
          <option value="Nhân viên an ninh">Nhân viên an ninh</option>
        </Field>
        <ErrorMessage name="position" class="error-feedback" />
      </div>
      <div class="form-group mt-5">
        <button type="submit" class="btn btn-primary">
          <i class="fa-solid fa-floppy-disk"></i> Lưu
        </button>
        <button
          type="reset"
          class="btn btn-light text-white mx-3"
          style="background: #818181"
        >
          <i class="fa-solid fa-rotate-right fa-flip-horizontal"></i> Làm mới
        </button>
        <button type="button" class="btn btn-dark" @click="cancelAddEmployee">
          <i class="fa-solid fa-ban"></i> Hủy
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    employee: { type: Object, required: true },
  },
  emits: ["submit:employee"],
  data() {
    const adminFormSchema = yup.object().shape({
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
      position: yup.string().required("Chức vụ phải có giá trị."),
    });
    return { adminFormSchema, employeeLocal: this.employee };
  },
  methods: {
    submitEmployee() {
      this.$emit("submit:employee", this.employeeLocal);
    },
    cancelAddEmployee() {
      this.$router.push({ name: "employees" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
.form-control {
  padding: 10px !important;
}
</style>
