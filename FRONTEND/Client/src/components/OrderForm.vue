<template>
  <div class="order">
    <div class="order-form-box">
      <Form
        @submit="submitOrder"
        :validation-schema="orderFormSchema"
        class="row"
        id="order-form"
      >
        <div class="col-6 pe-4">
          <h4>Thông tin giao hàng</h4>
          <div class="order-form form-group">
            <Field
              name="name"
              type="text"
              placeholder="Họ tên"
              class="form-control"
              v-model="user.name"
              required
            />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="order-form form-group">
            <Field
              name="phone"
              type="text"
              placeholder="Số điện thoại"
              class="form-control"
              v-model="user.phone"
              required
            />
            <ErrorMessage name="phone" class="error-feedback" />
          </div>
          <div class="order-form form-group">
            <Field
              name="city"
              as="select"
              class="form-control form-select"
              v-model="user.city"
              @change="getDistricts(user.city)"
              required
            >
              <option value="" selected>Chọn tỉnh thành</option>
              <option
                v-for="(city, index) in addressVN.cities"
                :key="city.Id"
                :value="city.Name"
              >
                {{ city.Name }}
              </option>
            </Field>
            <ErrorMessage name="city" class="error-feedback" />
          </div>
          <div class="order-form form-group">
            <Field
              name="district"
              as="select"
              class="form-control form-select"
              v-model="user.district"
              @change="getWards(user.district)"
              required
              :disabled="!user.city"
            >
              <option value="" selected>Chọn quận huyện</option>
              <option
                v-for="(district, index) in addressVN.districts"
                :key="district.Id"
                :value="district.Name"
              >
                {{ district.Name }}
              </option>
            </Field>
            <ErrorMessage name="district" class="error-feedback" />
          </div>
          <div class="order-form form-group">
            <Field
              name="ward"
              as="select"
              class="form-control form-select"
              v-model="user.ward"
              required
              :disabled="!user.city || !user.district"
            >
              <option value="" selected>Chọn phường xã</option>
              <option
                v-for="(ward, index) in addressVN.wards"
                :key="ward.Id"
                :value="ward.Name"
              >
                {{ ward.Name }}
              </option>
            </Field>
            <ErrorMessage name="ward" class="error-feedback" />
          </div>
          <div class="order-form form-group">
            <Field
              name="addressDetails"
              type="text"
              class="form-control"
              placeholder="Địa chỉ chi tiết"
              v-model="user.addressDetails"
              required
            />
            <ErrorMessage name="addressDetails" class="error-feedback" />
          </div>
          <div class="order-form form-group">
            <Field
              name="notes"
              type="text"
              as="textarea"
              placeholder="Ghi chú (tùy chọn)"
              class="form-control"
              v-model="user.notes"
            />
          </div>
        </div>
        <div class="col-6 pe-4">
          <h4>Vận chuyển</h4>
          <div
            class="ship order-form form-group"
            v-if="user.city && user.district && user.ward"
          >
            <div class="form-check">
              <Field
                name="ship"
                id="ship"
                type="radio"
                class="form-check-input"
                checked
              />
              <label class="form-check-label row" for="ship">
                <span class="col-6">Freeship</span>
                <span class="col-6 text-end">Miễn phí</span>
              </label>
            </div>
          </div>
          <div
            class="ship order-form form-group"
            v-else
            style="
              padding: 1em 1em;
              background: rgba(255, 128, 0, 0.3);
              border: 0;
            "
          >
            Vui lòng nhập thông tin giao hàng
          </div>
          <h4 class="mt-4">Thanh toán</h4>
          <div class="payment order-form form-group">
            <div class="form-check">
              <Field
                name="payment"
                id="payment1"
                type="radio"
                class="form-check-input"
                :value="true"
                v-model="user.payment"
                required
              />
              <label class="form-check-label" for="payment1">
                Thanh toán khi nhận hàng
              </label>
            </div>
            <hr />
            <div class="form-check">
              <Field
                name="payment"
                id="payment2"
                type="radio"
                class="form-check-input"
                :value="false"
                v-model="user.payment"
                required
              />
              <label class="form-check-label" for="payment2">
                Thanh toán bằng tài khoản ngân hàng
              </label>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:order"],
  data() {
    const orderFormSchema = yup.object().shape({
      name: yup.string().required("Vui lòng nhập họ tên."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        )
        .required("Vui lòng nhập số điện thoại."),
      city: yup.string().required("Bạn chưa chọn tỉnh thành."),
      district: yup.string().required("Bạn chưa chọn quận huyện."),
      ward: yup.string().required("Bạn chưa chọn phường xã."),
      addressDetails: yup.string().required("Vui lòng nhập địa chỉ chi tiết."),
    });
    return {
      orderFormSchema,
      user: {
        name: "",
        phone: "",
        city: "",
        district: "",
        ward: "",
        addressDetails: "",
        payment: true,
        notes: "",
      },
      addressVN: { cities: [], districts: [], wards: [] },
    };
  },
  methods: {
    submitOrder() {
      const deliveryInfo = { ...this.user };
      deliveryInfo.payment = this.user.payment
        ? "Thanh toán khi nhận hàng"
        : "Thanh toán bằng tài khoản ngân hàng";
      this.$emit("submit:order", deliveryInfo);
    },
    getAddressInVN() {
      axios
        .get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        )
        .then((res) => {
          this.addressVN.cities = res.data;
        })
        .catch((err) => console.log(err));
    },
    getDistricts(cityName) {
      if (cityName) {
        this.addressVN.districts = this.addressVN.cities.filter(
          (city) => city.Name === cityName
        )[0].Districts;
      } else this.addressVN.districts = [];
      this.user.district = "";
      this.user.ward = "";
      this.addressVN.wards = [];
    },
    getWards(districtName) {
      if (districtName) {
        this.addressVN.wards = this.addressVN.districts.filter(
          (district) => district.Name === districtName
        )[0].Wards;
      } else this.addressVN.wards = [];
      this.user.ward = "";
    },
  },
  mounted() {
    this.getAddressInVN();
  },
};
</script>

<style scoped>
/* @import "@/assets/form.css"; */
h4 {
  margin-bottom: 15px;
  color: #ff6200;
}
.order-form {
  margin: 12px 0;
}
.form-control {
  padding: 15px;
}
.payment,
.ship {
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background: #fff;
}
.form-check {
  padding: 1em 2em;
}
.form-check .form-check-input:checked {
  background-color: #ff6200;
  border-color: #ff6200;
}
.form-check .form-check-input:focus {
  border-color: #ff6200;
  box-shadow: 0 0 0 0.25rem rgba(18, 16, 15, 0.25);
}
hr {
  margin: 0;
}
.form-select:disabled + .error-feedback {
  visibility: hidden;
}
</style>
