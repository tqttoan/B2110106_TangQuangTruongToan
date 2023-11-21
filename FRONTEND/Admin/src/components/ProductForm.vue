<template>
  <div class="container form__box">
    <Form
      @submit="submitProduct"
      :validation-schema="productFormSchema"
      enctype="multipart/form-data"
      class="row"
      id="productForm"
    >
      <div class="form-group col-12">
        <label for="name">Tên sản phẩm</label>
        <Field
          name="name"
          type="text"
          class="form-control"
          v-model="productLocal.name"
        />
        <ErrorMessage name="name" class="error-feedback" />
      </div>
      <div class="form-group col-6">
        <label for="price">Giá</label>
        <Field
          name="price"
          type="number"
          class="form-control"
          v-model="productLocal.price"
        />
        <ErrorMessage name="price" class="error-feedback" />
      </div>
      <div class="form-group col-6">
        <label for="quantity">Số lượng</label>
        <Field
          name="quantity"
          type="number"
          class="form-control"
          v-model="productLocal.quantity"
        />
        <ErrorMessage name="quantity" class="error-feedback" />
      </div>
      <div class="form-group col-12">
        <label for="author">Tác giả</label>
        <Field
          name="author"
          type="text"
          class="form-control"
          v-model="productLocal.author"
        />
        <ErrorMessage name="author" class="error-feedback" />
      </div>
      <div class="form-group col-6">
        <label for="publisher">Nhà xuất bản</label>
        <Field
          name="publisher"
          type="text"
          class="form-control"
          v-model="productLocal.publisher"
        />
        <ErrorMessage name="publisher" class="error-feedback" />
      </div>
      <div class="form-group col-6">
        <label for="publishingYear">Năm xuất bản</label>
        <Field
          name="publishingYear"
          type="text"
          class="form-control"
          v-model="productLocal.publishingYear"
        />
        <ErrorMessage name="publishingYear" class="error-feedback" />
      </div>
      <div class="form-group col-5">
        <label for="category">Danh mục</label>
        <Field
          name="category"
          as="select"
          class="form-control form-select"
          v-model="productLocal.category"
        >
          <option value="">---Chọn danh mục---</option>
          <option
            v-for="(type, index) in categories"
            :key="type._id"
            :value="type.name"
          >
            {{ type.name }}
          </option>
        </Field>
        <ErrorMessage name="category" class="error-feedback" />
      </div>
      <div class="btn-group col-2 flex-column" role="group">
        <label class="invisible">Thêm</label>
        <input
          type="checkbox"
          class="btn-check"
          id="btncheck"
          autocomplete="off"
          @change="showInputAdd"
        />
        <label class="btn btn-outline-success rounded" for="btncheck"
          >Thêm mới</label
        >
        <label class="invisible">Thêm</label>
      </div>
      <div class="form-group col-5" v-if="this.showInput">
        <label for="category">Thêm danh mục mới</label>
        <Field
          name="category"
          type="text"
          class="form-control"
          v-model="productLocal.category"
        />
        <ErrorMessage name="category" class="error-feedback" />
      </div>
      <div class="form-group col-12">
        <label for="discription">Mô tả sản phẩm</label>
        <Field
          name="discription"
          as="textarea"
          class="form-control"
          v-model="productLocal.discription"
        />
        <ErrorMessage name="discription" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="image">Hình ảnh</label>
        <Field
          name="image"
          type="file"
          accept="image/*"
          class="form-control fileInput"
          v-model="productLocal.image"
        />
        <ErrorMessage name="image" class="error-feedback" />
      </div>
      <div v-if="this.product" class="form-group col-3">
        <img :src="productLocal.image" alt="" style="width: 100%" />
      </div>
      <div class="form-group">
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
        <button type="button" class="btn btn-dark" @click="cancelAddProduct">
          <i class="fa-solid fa-ban"></i> Hủy
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import ProductService from "@/services/product.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:product"],
  props: {
    product: { type: Object, required: true },
  },
  data() {
    const productFormSchema = yup.object().shape({
      name: yup.string().required("Tên sản phẩm phải có giá trị."),
      author: yup.string().required("Tên tác giả cần phải có giá trị."),
      publisher: yup.string().required("Tên nhà xuất bản cần phải có giá trị."),
      publishingYear: yup
        .number()
        .positive("Giá trị năm xuất bản không hợp lệ.")
        .required("Năm xuất bản cần phải có giá trị."),
      category: yup.string().required("Danh mục cần phải có giá trị."),
      discription: yup.string().required("Mô tả sản phẩm cần có giá trị."),
      price: yup
        .number()
        .required("Giá của sản phẩm cần có giá trị.")
        .min(0, "Giá không thể nhận giá trị nhỏ hơn 0."),
      quantity: yup
        .number()
        .required("Số lượng sản phẩm cần phải có giá trị.")
        .positive("Số lượng sản phẩm phải lớn hơn 0.")
        .integer(),
      image: yup.string().required("Hình ảnh cần phải được cung cấp."),
    });
    return {
      productLocal: this.product,
      productFormSchema,
      showInput: false,
      categories: [],
    };
  },
  methods: {
    submitProduct() {
      this.$emit("submit:product", this.productLocal);
      this.retrieveCategories();
    },
    showInputAdd() {
      this.showInput = document.querySelector(".btn-check").checked;
    },
    cancelAddProduct() {
      this.$router.push({ name: "list.products" });
    },
    async retrieveCategories() {
      try {
        this.categories = await ProductService.getCategories();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.categories = this.retrieveCategories();
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
.form__box {
  max-width: 1200px;
}
.form-group,
.btn-group {
  margin: 15px 0;
}
.form-group label {
  /* color: rgb(255, 0, 111); */
  font-size: 16px;
  /* font-weight: 500; */
}
</style>
