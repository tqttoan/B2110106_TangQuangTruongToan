<template>
  <div class="input-group my-3 ms-3 input--with">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập thông tin cần tìm"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <div class="input-group-append ms-2">
      <button class="btn btn-outline-success" type="button" @click="submit">
        <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: { type: String, default: "" },
  },
  emits: ["submit", "update:modelValue"],
  methods: {
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style scoped>
.input--with {
  width: 30%;
}
</style>
