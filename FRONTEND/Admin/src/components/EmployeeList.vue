<template>
  <tbody class="table-items">
    <tr v-for="(employee, index) in employees" :key="employee._id">
      <th class="items" style="width: 5%">{{ index + 1 }}</th>
      <th
        class="items"
        style="width: 20%; color: rgb(255, 85, 0); font-weight: 700"
      >
        {{ employee._id }}
      </th>
      <th class="items" style="width: 15%">{{ employee.name }}</th>
      <th class="items" style="width: 10%">
        {{ employee.phone }}
      </th>
      <th class="items" style="width: 20%">{{ employee.address }}</th>
      <th class="items" style="width: 20%">
        {{ employee.position }}
      </th>
      <th class="items" style="width: 10%">
        <router-link
          :to="{ name: 'employee.edit', params: { id: employee._id } }"
          class="me-4"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </router-link>
        <router-link
          :to="{ name: 'employees' }"
          @click="deleteEmployee(employee._id)"
        >
          <i class="fa-solid fa-trash text-danger"></i>
        </router-link>
      </th>
    </tr>
  </tbody>
</template>

<script>
import AdminService from "@/services/admin.service";

export default {
  emits: ["fresh:employee"],
  props: {
    employees: { type: Array, default: [] },
  },

  methods: {
    async deleteEmployee(id) {
      if (confirm("Bạn muốn tiếp tục xóa nhân viên này?")) {
        try {
          let result = await AdminService.deleteEmployee(id);
          alert(result.message);
          this.$emit("fresh:employee");
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.items {
  font-weight: 400;
  padding: 15px 0;
}
.items p span {
  font-weight: 500;
}
.items i {
  font-size: 22px;
}
</style>
