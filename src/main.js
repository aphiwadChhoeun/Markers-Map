import Vue from 'vue'
import App from './App.vue'

import Buefy from 'buefy'
import './assets/styles/main.scss'
import store from './store'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
