<template>
  <div class="header__search-bg">
    <div
      class="container h-100 d-flex justify-content-center align-items-center"
    >
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Tìm sản phẩm ..."
          v-model="this.searchText"
        />
        <div class="input-group-append ms-2">
          <button class="btn btn-outline-none" type="button" @click="submit">
            <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    submit() {
      // console.log(this.searchText);
      this.$router.push({
        name: "search.result",
        query: { keyword: this.searchText },
      });
    },
  },
};
</script>

<style scoped>
.header__search-bg {
  background: url(../assets/images/header-bg.webp);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 95px;
}
.input-group {
  width: 60% !important;
  height: 41px;
}
.input-group input {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 6px !important;
}
.input-group input::placeholder {
  font-style: italic;
}
.input-group input:focus {
  border-color: rgb(69, 255, 2);
  box-shadow: 0 0 0 0.2rem rgba(0, 255, 25, 0.25);
}
.input-group-append {
  position: absolute;
  right: 1.5px;
  top: 1.5px;
}
.input-group .btn {
  background: linear-gradient(to right, #f8bc3b, #fd7201, #fd017b);
  z-index: 999 !important;
  color: #fff;
}
</style>
