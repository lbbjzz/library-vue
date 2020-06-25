import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login')
  },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('../views/register/Register')
  // },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home/Home')
      },
      {
        path: '/book',
        name: 'book',
        component: () => import('../views/BookManage/Bookmanage')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/UserManage/Usermanage')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
