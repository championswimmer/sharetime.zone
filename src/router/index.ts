import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/how',
    name: 'how',
    component: () => import('@/pages/How.vue')
  },
  {
    path: '/:tz([A-Z]{2,4})/:time([0-2][0-9][0-5][0-9])',
    name: 'abbr_time',
    component: () => import('@/pages/Time.vue')
  },
  {
    path: '/:tz([A-Z]{2,4})/now',
    name: 'abbr_now',
    component: () => import('@/pages/Now.vue')
  },
  {
    path: '/:continent/:city/:time([0-2][0-9][0-5][0-9])',
    name: 'IANA_time',
    component: () => import('@/pages/Time.vue')
  },
  {
    path: '/:continent/:city/now',
    name: 'IANA_now',
    component: () => import('@/pages/Now.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
