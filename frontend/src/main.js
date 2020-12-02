import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueRouter from 'vue-router'
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'
import Vuemoment from 'vue-moment'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuemoment);
Vue.config.productionTip = false

new Vue({
  vuetify,
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')
