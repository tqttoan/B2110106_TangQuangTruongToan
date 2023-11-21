<template>
  <div class="container mt-5" style="width: 50%">
    <h2 class="text-center mb-5">Thêm nhân viên mới</h2>
    <EmployeeForm :employee="employee" @submit:employee="saveEmployee" />
  </div>
</template>

<script>
import EmployeeForm from "@/components/EmployeeForm.vue";
import AdminService from "@/services/admin.service";

export default {
  components: {
    EmployeeForm,
  },
  data() {
    return {
      employee: {
        name: "",
        phone: "",
        address: "",
        position: "",
      },
    };
  },
  methods: {
    async saveEmployee(emloyee) {
      try {
        let result = await AdminService.signUp(emloyee);
        if (result.success) {
          if (
            confirm(result.message + " Bạn có muốn tiếp tục thực hiện không?")
          ) {
            document.querySelector("#employeeForm").reset();
          } else this.$router.push({ name: "employees" });
        } else alert(result.message);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
