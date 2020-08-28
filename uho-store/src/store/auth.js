import Vue from 'vue'
import Vuex from 'vuex'
import dotenv from 'dotenv'
import getters from './auth/getters.js'
import actions from './auth/actions.js'
import mutations from './auth/mutations.js'
import state from './auth/state.js'
// import auth from '../../../server/src/middleware/auth.js'
dotenv.config()
Vue.use(Vuex)



const auth = {
    state,
    getters,
    mutations,
    actions
}

export default auth