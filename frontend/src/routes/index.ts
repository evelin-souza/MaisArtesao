import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

import LoginView from '@/views/LoginView.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import ArtesaoDashboard from '@/views/ArtesaoDashboard.vue'
import ClienteVitrine from '@/views/ClienteVitrine.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { 
    path: '/admin', 
    component: AdminDashboard, 
    meta: { requiresAuth: true, role: 'ADMIN' } 
  },
  { 
    path: '/artesao', 
    component: ArtesaoDashboard, 
    meta: { requiresAuth: true, role: 'ARTESAO' } 
  },
  { 
    path: '/vitrine', 
    component: ClienteVitrine, 
    meta: { requiresAuth: true, role: 'CLIENTE' } 
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      return next('/login')
    }
    if (to.meta.role && authStore.user?.tipo !== to.meta.role) {
      if (authStore.user?.tipo === 'ADMIN') return next('/admin')
      if (authStore.user?.tipo === 'ARTESAO') return next('/artesao')
      if (authStore.user?.tipo === 'CLIENTE') return next('/vitrine')
    }
  }
  next()
})