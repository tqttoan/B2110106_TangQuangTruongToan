import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import SearchResult from "@/views/SearchResult.vue";
import Products from "@/views/Products.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import ShoppingCart from "@/views/ShoppingCart.vue";
import ContactUs from "@/views/ContactUs.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/books/:category?",
    name: "products",
    component: Products,
  },
  {
    path: "/books/detail/:id",
    name: "product.detail",
    component: ProductDetail,
    props: true,
  },
  {
    path: "/search",
    name: "search.result",
    component: SearchResult,
    props: (route) => ({ keyword: route.query.keyword }),
  },
  {
    path: "/cart",
    name: "cart",
    component: ShoppingCart,
    beforeEnter: (to, from, next) => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) next();
      else next({ name: "login" });
    },
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/Order.vue"),
    props: (route) => ({ cartIdList: [...route.query.cart] }),
    beforeEnter: (to, from, next) => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) next();
      else next({ name: "login" });
    },
  },
  {
    path: "/orders/purchase",
    name: "myOrders",
    component: () => import("@/views/MyOrders.vue"),
    beforeEnter: (to, from, next) => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) next();
      else next({ name: "login" });
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactUs,
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
