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
import Scanner from "../views/Scanner.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 200);
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/education",
      name: "education",
      component: Education,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/education/:articleId",
      name: "article",
      component: ArticleView,
      props: true,
      meta: { transition: "slide-left", requiresAuth: true },
    },
    {
      path: "/scanner",
      name: "scanner",
      component: Scanner,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/favourite",
      name: "favourite",
      component: Favourite,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: PageNotFound,
    },
  ],
});
router.beforeEach(async (to, from) => {
  if (
    to.meta.requiresAuth &&
    !localStorage.getItem("userUID") &&
    to.name !== "login"
  ) {
    return { name: "login" };
  }
});

export default router;
