<template>
  <div class="row my-4">
    <div class="col-6">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415184425326!2d105.76803501092705!3d10.029933690035602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1698826534167!5m2!1svi!2s"
        width="95%"
        height="450"
        style="border: 0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="col-6">
      <h3 class="mb-4">Liên hệ với chúng tôi</h3>
      <Form :validation-schema="contactFormSchema">
        <div class="form-group mb-4">
          <label for="name" class="form-label fw-bold"
            >Họ tên<span style="color: red">*</span></label
          >
          <Field
            name="name"
            type="text"
            placeholder="Họ và tên"
            class="form-control"
            required
          />
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group mb-4">
          <label for="email" class="form-label fw-bold"
            >Email<span style="color: red">*</span></label
          >
          <Field
            name="email"
            type="email"
            placeholder="Email"
            class="form-control"
            required
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group mb-4">
          <label for="content" class="form-label fw-bold"
            >Nội dung<span style="color: red">*</span></label
          >
          <Field
            name="content"
            type="text"
            as="textarea"
            placeholder="Nội dung"
            class="form-control"
            required
          />
          <ErrorMessage name="content" class="error-feedback" />
        </div>
        <input type="submit" value="Gửi liên hệ" class="btn" />
      </Form>
    </div>
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
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup.string().required("Vui lòng cung cấp họ tên."),
      email: yup
        .string()
        .email("Email không hợp lệ.")
        .required("Vui lòng cung cấp email."),
      content: yup.string().required("Vui lòng cung cấp nội dung liên hệ."),
    });
    return { contactFormSchema };
  },
};
</script>

<style>
input[type="submit"] {
  background: #ff6200;
  color: #fff;
  width: 150px;
  font-weight: 500;
}
input[type="submit"]:hover {
  background: radial-gradient(#fd9801, #fd7201, #fe6201, #fe015e);
}
.error-feedback {
  color: red;
  font-size: 15px;
}
</style>
