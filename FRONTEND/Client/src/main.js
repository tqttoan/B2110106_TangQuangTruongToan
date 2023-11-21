import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

router.afterEach((to, from) => {
  let user = JSON.parse(localStorage.getItem("user"));
  const order = document.querySelector(".show-orders");
  const signup = document.querySelector(".show-signup");
  const login = document.querySelector(".show-login");
  const logout = document.querySelector(".show-logout");
  const userIcon = document.querySelector(".show-user");
  const username = document.querySelector(".show-username");
  const separate = document.querySelector(".separate");
  if (user) {
    order.style.display = "block";
    userIcon.style.display = "block";
    logout.style.display = "block";
    separate.style.display = "block";
    username.innerHTML = ` ${user.user.name}`;
    signup.style.display = "none";
    login.style.display = "none";
  } else {
    order.style.display = "none";
    userIcon.style.display = "none";
    logout.style.display = "none";
    separate.style.display = "none";
    signup.style.display = "block";
    login.style.display = "block";
  }
});

createApp(App).use(router).mount("#app");
