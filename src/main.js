import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import router from './router'
import store from './store'
import './veeValidate'
import * as API from './api'
import GshopHeaders from './components/GshopHeaders/GshopHeaders.vue'
Vue.prototype.$API = API
Vue.component('GshopHeaders',GshopHeaders)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
