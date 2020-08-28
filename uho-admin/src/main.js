import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
