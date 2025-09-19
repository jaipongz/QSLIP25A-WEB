import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import HomePage from "../views/HomePage.vue";
import {useAuthStore} from "@/stores/auth.store"

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomePage,
          alias: "/home",
          meta: {
            title: "Home - E-Slip",
            requiresAuth: true 
          },
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
          meta: {
            title: "About - E-Slip",
          },
        },
        {
          path: "/services",
          name: "services",
          component: () => import("../views/ServicesView.vue"),
          meta: {
            title: "Service - E-Slip",
          },
        },
        {
          path: "/contact",
          name: "contact",
          component: () => import("../views/ContactView.vue"),
          meta: {
            title: "Contact - E-Slip",
          },
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        title: "Register - E-Slip",
        requiresGuest: true
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        title: "Login - E-Slip",
        requiresGuest: true
      },
    },
    {
      path: "/email-verify",
      name: "email-verify",
      component: () => import("../views/EmailVerify.vue"),
      meta: {
        title: "Email Verify - E-Slip",
      },
    },
    {
      path: "/lander",
      name: "lander",
      component: () => import("../views/EmailVerify.vue"),
      meta: {
        title: "Email Verify - E-Slip",
      },
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when changing routes
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Global navigation guard to update page title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  const auth = useAuthStore() 
  const token = auth.isAuthenticated

  // 🔹 ป้องกันเข้า login ถ้ามี token อยู่แล้ว
  if (to.meta.requiresGuest && token) {
    return next('/')
  }

  // 🔹 ป้องกันเข้าหน้า protected ถ้าไม่มี token
  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  next();
});

export default router;
