import { createRouter, createWebHistory } from 'vue-router'

import type { User } from '@/types/user'
import type { RouteRecordRaw } from 'vue-router'

import {
  RouteNames,
  LayoutNames,
  NON_AUTHENTICATED_ROUTES
} from '@/consts/router'
import { LocalStorageKeys } from '@/consts/local-storage'
import { getFromLocalStorage } from '@/services/local-storage.service'

import IndexView from '@/views/IndexView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    layout: LayoutNames
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: RouteNames.LOGIN,
    meta: { layout: LayoutNames.LOGIN },
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    name: 'index',
    meta: { layout: LayoutNames.DEFAULT },
    component: IndexView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (NON_AUTHENTICATED_ROUTES.includes(to.name as RouteNames)) {
    next()
    return
  }

  const userInfo = getFromLocalStorage<User>(LocalStorageKeys.USER)
  const isAuthenticated = userInfo?.id !== undefined

  if (!isAuthenticated) {
    next({ name: RouteNames.LOGIN })
    return
  }

  next()
})

export default router
