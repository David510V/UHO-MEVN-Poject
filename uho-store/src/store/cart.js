import Vue from 'vue'
import Vuex from 'vuex'
import dotenv from 'dotenv'
import getters from './cart/getters.js'
import actions from './cart/actions.js'
import mutations from './cart/mutations.js'
import state from './cart/state.js'
// import auth from '../../../server/src/middleware/auth.js'
dotenv.config()
Vue.use(Vuex)


const cart = {
    state,
    getters,
    mutations,
    actions
}

export default cart