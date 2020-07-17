import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



  const routes = [
  {
    path: '/',
    name: 'Home',
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
    path: '/wishlist',
    name: 'Wish',
    component: function(){
      return import(/* webpackChunkName: "/wishlist" */ '../components/client/WishList.vue')
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
    name: 'Login',
    component: function(){
      return import(/* webpackChunkName: "/login" */ '../components/client/Login.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: function(){
      return import(/* webpackChunkName: "/About" */ '../components/client/About.vue')
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
    path: '/returns',
    name: 'Returns',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/client/Returns.vue')
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
