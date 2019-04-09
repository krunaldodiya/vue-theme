import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: {
        gateway: "auth"
      }
    },
    {
      path: "/project/:id",
      name: "project-by-id",
      component: () => import("./views/Project.vue"),
      meta: {
        gateway: "auth"
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        gateway: "guest"
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      meta: {
        gateway: "guest"
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
      meta: {
        gateway: "any"
      }
    }
  ]
});

router.beforeEach(async (to, _, next) => {
  const gateway = to.meta.gateway;
  const authUser = await localStorage.getItem("authUserUID");

  if (gateway == "auth" && authUser == null) {
    next("/login");
  } else if (gateway == "guest" && authUser != null) {
    next("/");
  } else {
    next();
  }
});

export default router;
