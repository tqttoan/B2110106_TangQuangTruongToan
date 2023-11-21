<template>
  <div class="container-fluid">
    <div class="text-center products__list">
      <div class="fix-content">
        <h2 class="pt-3 mb-4">Danh sách nhân viên của cửa hàng</h2>
        <div
          class="header m-2 d-flex justify-content-between align-items-center"
        >
          <div>
            <button class="btn btn-success m-2">
              <router-link
                :to="{ name: 'employee.add' }"
                class="text-decoration-none bg-transparent text-white bg-primary"
                ><i class="fa-solid fa-plus me-1"></i> Thêm nhân
                viên</router-link
              >
            </button>
            <button class="btn btn-danger m-2" @click="deleteAllEmployees">
              <i class="fa-solid fa-trash"></i> Xóa tất cả
            </button>
            <button class="btn btn-primary m-2" @click="refreshList">
              <i class="fa-solid fa-rotate-right fa-flip-horizontal"></i> Làm
              mới
            </button>
          </div>
          <InputSearch v-model="searchText" />
        </div>
        <div class="text-end fs-5 mb-2">
          Tổng: {{ this.filteredEmployeesCount }} nhân viên
        </div>
        <div class="table-responsive">
          <table class="table table-bordered align-middle mb-0">
            <thead class="table-info fs-5">
              <tr>
                <th class="items" style="width: 5%">STT</th>
                <th class="items" style="width: 20%">Mã số nhân viên</th>
                <th class="items" style="width: 15%">Họ tên</th>
                <th class="items" style="width: 10%">Số điện thoại</th>
                <th class="items" style="width: 20%">Địa chỉ</th>
                <th class="items" style="width: 20%">Chức vụ</th>
                <th class="items" style="width: 10%">Thao tác</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <EmployeeList
            v-if="filteredEmployeesCount > 0"
            :employees="filteredEmployees"
            @fresh:employee="refreshPage"
          />
          <tbody v-else>
            <tr>
              <td colspan="9" class="fs-4" style="height: 60vh">
                <img
                  src="../assets/images/no-result-logo.jpg"
                  alt=""
                  style="width: 25%"
                />
                <p>
                  Không có bất kì nhân viên nào trong cơ sở dữ liệu.
                  <router-link :to="{ name: 'employee.add' }"
                    >Thêm nhân viên ngay.</router-link
                  >
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {{ console.log(employees) }}
  </div>
</template>

<script>
import AdminService from "@/services/admin.service";
import InputSearch from "@/components/InputSearch.vue";
import EmployeeList from "@/components/EmployeeList.vue";

export default {
  components: {
    InputSearch,
    EmployeeList,
  },
  data() {
    return {
      employees: [],
      searchText: "",
    };
  },
  computed: {
    // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
    employeeStrings() {
      return this.employees.map((employee) => {
        const { name, phone, address, position } = employee;
        return [name, phone, address, position].join("");
      });
    },
    filteredEmployees() {
      if (!this.searchText) return this.employees;
      else {
        const filter = new RegExp(this.searchText, "gi");
        return this.employees.filter((_employee, index) =>
          this.employeeStrings[index].match(filter)
        );
      }
    },
    filteredEmployeesCount() {
      return this.filteredEmployees.length;
    },
  },
  methods: {
    async retrieveEmployees() {
      try {
        const result = await AdminService.findAllEmployees();
        this.employees = result.reverse();
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAllEmployees() {
      if (
        confirm(
          "Đây là thao tác xóa tất cả nhân viên mà không thể khôi phục. Bạn có muốn tiếp tục thực hiện không?"
        )
      ) {
        try {
          const result = await AdminService.deleteAll();
          alert(result.message);
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    refreshList() {
      this.retrieveEmployees();
    },
    refreshPage() {
      this.refreshList();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.fix-content {
  position: sticky;
  z-index: 100;
  top: 76px;
  background: #fff;
}
</style>
