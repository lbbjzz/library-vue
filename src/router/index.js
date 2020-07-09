import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
