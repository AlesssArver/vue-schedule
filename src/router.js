import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home")
    },
    {
      path: "/schedules",
      name: "schedules",
      component: () => import("./views/Schedules"),
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Auth/Login")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Auth/Register"),
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  }
  next();
});

export default router;
