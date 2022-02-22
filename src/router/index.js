import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/education",
      name: "education",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/scanner",
      name: "scanner",
      component: Dashboard,
    },
    {
      path: "/favourite",
      name: "favourite",
      component: Dashboard,
    },
    {
      path: "/settings",
      name: "settings",
      component: Dashboard,
    },
  ],
});

export default router;
