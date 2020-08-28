import {shallowMount, createLocalVue} from '@vue/test-utils'
import Login from '../../src/components/client/Login.vue'
import Vuex from 'vuex'

const localVue=createLocalVue()
localVue.use(Vuex)

describe('Login.vue', () => {
    let actions
    let store
  
    beforeEach(() => {
      actions = {
        login:jest.fn()
      }
      store = new Vuex.Store({
        actions
      })
    })

    it('dispatches "login" when click on button"', () => {
        const wrapper = shallowMount(Login, { store, localVue })
        const logInButton = wrapper.find('button')
        
        logInButton.trigger('click')
        expect(actions.login).toHaveBeenCalled()
      })
    
})   


