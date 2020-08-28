import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import  Cookies from "js-cookie";
import auth from './auth.js'
import cart from './cart.js'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    
  },
  modules:{
    auth,
    cart
  },
  mutations: {
   
  },
  actions: {
    
  },
 
  getters:{
    
  },
  
})
