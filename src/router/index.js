import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard } from '@/router/authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue'),
  },
  {
    path: '/top',
    beforeEnter: authGuard,
    component: () => import(/* webpackChunkName: "Top" */ '../views/Top.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
