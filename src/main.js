import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"//引入element-ui
import axios from 'axios'//引入axios

Vue.prototype.$axios = axios
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
