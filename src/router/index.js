import { createRouter, createWebHistory } from "vue-router";
const WelcomeView = () => import("../views/WelcomeView.vue");
const LoginVue = () => import("../views/LoginView.vue");
const RegisterView = () => import("../views/RegisterView.vue");
const Dashboard = () => import("../views/Dashboard.vue");
const Education = () => import("../views/Education.vue");
const Favourite = () => import("../views/Favourite.vue");
const Settings = () => import("../views/Settings.vue");
const PageNotFound = () => import("../views/404.vue");
const ArticleView = () => import("../views/ArticleView.vue");
const Scanner = () => import("../views/Scanner.vue");
const AnalyzedView = () => import("../views/AnalyzedView.vue");
const Camera = () => import("../views/Camera.vue");
const ResetPassword = () => import("../views/ResetPassword.vue");
const ResetPasswordSent = () => import("../views/ResetPasswordSent.vue");
const AnalyzeText = () => import("../views/AnalyzeText.vue");
const PrivacyPolicy = () => import("../views/PrivacyPolicy.vue");

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
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
    },
    {
      path: "/reset-password-sent",
      name: "reset-password-sent",
      component: ResetPasswordSent,
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
      path: "/analyzed/:id",
      name: "analyzed",
      component: AnalyzedView,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/camera",
      name: "camera",
      component: Camera,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/analyze-text",
      name: "analyze-text",
      component: AnalyzeText,
      props: true,
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
      path: "/privacy-policy",
      name: "privacy-policy",
      component: PrivacyPolicy,
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
