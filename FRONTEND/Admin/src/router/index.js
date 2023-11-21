import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import EmployeeAdd from "@/views/EmployeeAdd.vue";
import Products from "@/views/Products.vue";
import ProductAdd from "@/views/ProductAdd.vue";
import ProductEdit from "@/views/ProductEdit.vue";
import EmployeeManagement from "@/views/EmployeeManagement.vue";
import EmployeeEdit from "@/views/EmployeeEdit.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/signIn",
    name: "login",
    component: Login,
  },
  {
    path: "/products/list",
    name: "list.products",
    component: Products,
  },
  {
    path: "/products/add",
    name: "add.product",
    component: ProductAdd,
  },
  {
    path: "/products/edit/:id",
    name: "edit.product",
    component: ProductEdit,
    props: true,
  },
  {
    path: "/employees",
    name: "employees",
    component: EmployeeManagement,
  },
  {
    path: "/employees/edit/:id",
    name: "employee.edit",
    component: EmployeeEdit,
    props: true,
  },
  {
    path: "/employees/signup",
    name: "employee.add",
    component: EmployeeAdd,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
