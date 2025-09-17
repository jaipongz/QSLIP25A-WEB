import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomePage,
          alias: '/home',
          meta: {
            title: 'หน้าแรก - E-Slip'
          }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: {
            title: 'เกี่ยวกับเรา - E-Slip'
          }
        },
        {
          path: '/services',
          name: 'services',
          component: () => import('../views/ServicesView.vue'),
          meta: {
            title: 'บริการ - E-Slip'
          }
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../views/ContactView.vue'),
          meta: {
            title: 'ติดต่อเรา - E-Slip'
          }
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        title: 'Register - E-Slip'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when changing routes
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guard to update page title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
