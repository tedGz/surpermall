import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'

import toast from '@/components/content/toast'

import './assets/css/icon/iconfont.js'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
