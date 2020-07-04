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
  // {
  //   path: '/main',
  //   name: 'Main',
  //   component: () => import('../views/Main'),
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: () => import('../views/Home/Home')
  //     },
  //     {
  //       path: '/user',
  //       name: 'user',
  //       component: () => import('../views/UserManage/Usermanage')
  //     },
  //     {
  //       path: '/userinfo',
  //       name: 'userinfo',
  //       component: () => import('../views/UserInfo/UserInfo')
  //     },
  //     {
  //       path: '/bookmanage',
  //       name: 'bookmanage',
  //       component: () => import('../views/Book/Bookmanage')
  //     },
  //     {
  //       path: '/bookborrow',
  //       name: 'bookborrow',
  //       component: () => import('../views/Book/Bookborrow')
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
