import Vue from 'vue'
import VueRouter from 'vue-router'
import Root from '../views/Root'
import { authGuard } from '@/router/authGuard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue'),
  },
  {
    path: '/register',
    beforeEnter: authGuard,
    component: () =>
      import(
        /* webpackChunkName: "Register" */ '../views/Register/Register.vue'
      ),
  },
  {
    path: '/',
    component: Root,
    children: [
      {
        path: '/',
        redirect: 'top',
      },
      {
        path: 'task/:team_id',
        beforeEnter: authGuard,
        component: () =>
          import(
            /* webpackChunkName: "TaskPage" */ '../views/Task/TaskPage.vue'
          ),
      },
      {
        path: 'top',
        beforeEnter: authGuard,
        component: () =>
          import(/* webpackChunkName: "Top" */ '../views/Top.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
