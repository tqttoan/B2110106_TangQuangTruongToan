import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

router.beforeEach((to, from, next) => {
  let data = JSON.parse(localStorage.getItem("admin"));
  if (
    to.name !== "login" &&
    to.name !== "register" &&
    to.name != "notfound" &&
    !data
  )
    next({ name: "login" });
  else next();

  // Option 2
  // if (to.name === "register") next();
  // else if (to.name !== "login" && !Authenticated) next({ name: "login" });
  // else next();
});

router.afterEach((to, from) => {
  let data = JSON.parse(localStorage.getItem("admin"));
  if (data) {
    document.querySelector(".show-user").style.display = "block";
    document.querySelector(".show-username").innerHTML = ` ${data.name}`;
    document.querySelector(".hidden-signin").style.display = "none";
  } else {
    document.querySelector(".show-user").style.display = "none";
    document.querySelector(".hidden-signin").style.display = "block";
  }
});

createApp(App).use(router).mount("#app");
