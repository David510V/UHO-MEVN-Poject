import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



  const routes = [
  {
    path: '/',
    name: 'home',
    component: function(){
      return import(/* webpackChunkName: "/home" */ '../components/client/Home.vue')
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: function(){
      return import(/* webpackChunkName: "/cart" */ '../components/client/Cart.vue')
    }
  },
  
  {
    path: '/signup',
    name: 'SignUp',
    component: function(){
      return import(/* webpackChunkName: "/signup" */ '../components/client/SignUp.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function(){
      return import(/* webpackChunkName: "/login" */ '../components/client/Login.vue')
    }
  },
  {
    path: '/thank',
    name: 'Thank',
    component: function(){
      return import(/* webpackChunkName: "/About" */ '../components/client/thank.vue')
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/client/ContactUs.vue')
    }
  },
  {
    path: '/wear',
    name: 'wear',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/client/Wear.vue')
    }
  },
  {
    path: '/wear/catgo',
    name: 'catgo',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/client/Catgo.vue')
    }
  },
  {
    path: '/wear/catgo/item',
    name: 'item',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/client/item.vue')
    }
  },
]




const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes
})

export default router
