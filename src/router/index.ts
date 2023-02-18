import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const ROUTES = {
  ABBR_TIME: 'abbr_time',
  ABBR_NOW: 'abbr_now',
  IANA_TIME: 'iana_time',
  IANA_NOW: 'iana_now'
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../pages/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },
  {
    path: '/how',
    name: 'how',
    component: () => import(/* webpackChunkName: "how" */ '@/pages/How.vue')
  },
  {
    path: '/:tz([A-Z]{2,4})/:time([0-2][0-9][0-5][0-9])',
    name: ROUTES.ABBR_TIME,
    component: () => import('@/pages/Time.vue')
  },
  {
    path: '/:tz([A-Z]{2,4})/now',
    name: ROUTES.ABBR_NOW,
    component: () => import('@/pages/Now.vue')
  },
  {
    path: '/:continent/:city/:time([0-2][0-9][0-5][0-9])',
    name: ROUTES.IANA_TIME,
    component: () => import('@/pages/Time.vue')
  },
  {
    path: '/:continent/:city/now',
    name: ROUTES.IANA_NOW,
    component: () => import('@/pages/Now.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
