import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/scss/reset.scss'
import './plugins/element.js'
import ElementUI from 'element-ui'
// import axios from 'axios'// 引入axios
import http from '@/api/config'
import VueI18n from 'vue-i18n'
import SlideVerify from 'vue-monoplasty-slide-verify'
import './mock'

/* ---------挂载全局使用----------- */
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(SlideVerify)

// Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$http = http

// /*---------使用语言包-----------*/
const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识
  messages: {
    'zh-CN': require('./lang/zh-CN'), // 中文语言包
    'en-US': require('./lang/en-US'), // 英文语言包
    'zh-HK': require('./lang/zh-HK') // 繁体字语言包
  }
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('addMenu', router)
  }
}).$mount('#app')
