import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import  Cookies from "js-cookie";
import auth from './auth.js'
import axios from 'axios'
// import cart from './cart.js'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    
  },
  modules:{
    auth
  },
  mutations: {
   
  },
  actions: {
    wearCreate:({commit},wear)=>{
      console.log('wow')
      axios.post(`${process.env.VUE_APP_SERVER}/wear`,{
         name:wear.name,
        //  img:wear.img
      }).then((response)=>{
        console.log(response)
      }).catch((e)=>{
        console.log('Not')
      })
    }
  },
 
  getters:{
    
  },
  
})
