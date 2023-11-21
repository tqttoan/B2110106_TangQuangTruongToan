<template>
  <div class="container mt-5" v-if="employee" style="width: 50%">
    <h4 class="text-center mb-4">Chỉnh sửa thông tin nhân viên</h4>
    <EmployeeForm :employee="employee" @submit:employee="updateEmployee" />
  </div>
</template>

<script>
import EmployeeForm from "@/components/EmployeeForm.vue";
import AdminService from "@/services/admin.service";

export default {
  components: {
    EmployeeForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      employee: null,
    };
  },
  methods: {
    async getEmployee(id) {
      try {
        const result = await AdminService.findOne(id);
        this.employee = result;
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateEmployee(data) {
      try {
        let result = await AdminService.update(this.id, data);
        alert(result.message);
        this.$router.push({ name: "employees" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getEmployee(this.id);
  },
};
</script>
