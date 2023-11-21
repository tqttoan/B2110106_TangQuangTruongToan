<script>
import Header from "@/components/Header.vue";
import InputSearch from "@/components/InputSearch.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    InputSearch,
    Footer,
  },
};
</script>

<template>
  <div style="background: rgb(245, 245, 245)">
    <Header />
    <InputSearch />
    <div class="container py-4">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
