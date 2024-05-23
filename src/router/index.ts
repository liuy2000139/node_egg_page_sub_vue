import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: [
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/Upload.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      component: Layout,
      redirect:  '/content',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/content',
          name: 'content',
          component: () => import('../views/Content/index.vue')
        }
      ]
    }
  ]
})

export default router
