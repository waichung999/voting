import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import campaign from './modules/campaign'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user:user,
    campaign:campaign
  },
  plugins: [
    createPersistedState()
  ]
});

export default store
