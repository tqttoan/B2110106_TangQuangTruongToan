<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<template>
  <div>
    <Header />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>
