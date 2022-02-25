import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";
import LoginVue from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import Dashboard from "../views/Dashboard.vue";
import Education from "../views/Education.vue";
import Favourite from "../views/Favourite.vue";
import Settings from "../views/Settings.vue";
import PageNotFound from "../views/404.vue";
import ArticleView from "../views/ArticleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      })
    );
  },
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginVue,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/education",
      name: "education",
      component: Education,
    },
    {
      path: "/education/:articleId",
      name: "article",
      component: ArticleView,
      props: true,
      meta: { transition: "slide-left" },
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
      component: Settings,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: PageNotFound,
    },
  ],
});

export default router;
