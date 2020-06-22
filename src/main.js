import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
import axios from 'axios'//引入axios
import VueI18n from 'vue-i18n'


/*---------挂载全局使用-----------*/
Vue.use(ElementUI)
Vue.use(VueI18n)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

// /*---------使用语言包-----------*/
const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  messages: {
    'zh-CN': require('./assets/common/zh-CN'),   // 中文语言包
    'en-US': require('./assets/common/en-US'),   // 英文语言包
    'zh-HK': require('./assets/common/zh-HK')     // 繁体字语言包
  },
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
