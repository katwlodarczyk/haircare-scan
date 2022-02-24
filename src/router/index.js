import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Education from "../views/Education.vue";
import Favourite from "../views/Favourite.vue";
import PageNotFound from "../views/404.vue";

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
      component: Education,
    },
    {
      path: "/scanner",
      name: "scanner",
      component: Dashboard,
    },
    {
      path: "/favourite",
      name: "favourite",
      component: Favourite,
    },
    {
      path: "/settings",
      name: "settings",
      component: Dashboard,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: PageNotFound,
    },
  ],
});

export default router;
