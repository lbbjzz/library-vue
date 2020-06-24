import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/Login";
import Register from "../views/register/Register";
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Index',
      redirect: {name: "Login"}
    },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
