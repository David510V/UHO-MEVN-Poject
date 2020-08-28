import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



  const routes = [
    
  {
    path: '/login',
    name: 'Login',
    component: function(){
      return import(/* webpackChunkName: "/home" */ '../components/Login.vue')
    }
  },
  {
    path: '/',
    name: 'home',
    component: function(){
      return import(/* webpackChunkName: "/Home" */ '../components/Home.vue')
    }
  },

  {
    path: '/home/items',
    name: 'items',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/Items.vue')
    }
  },
  {
    path: '/home/items/additem',
    name: 'additem',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/AddItem.vue')
    }
  },

  {
    path: '/home/items/item',
    name: 'item',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/item.vue')
    }
  },

  {
    path: '/home/wears',
    name: 'wears',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/Wears.vue')
    }
  },

  {
    path: '/home/wears/addwear',
    name: 'addWear',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/AddWear.vue')
    }
  },
  {
    path: '/home/wears/wear',
    name: 'wear',
    component: function(){
      return import(/* webpackChunkName: "/ContactUs" */ '../components/wear.vue')
    }
  },


  {
    path: '/home/users',
    name: 'users',
    component: function(){
      return import(/* webpackChunkName: "/wishlist" */ '../components/Users.vue')
    }
  },
  {
    path: '/home/users/:id',
    name: 'user',
    component: function(){
      return import(/* webpackChunkName: "/wishlist" */ '../components/User.vue')
    }
  },
  {
    path: '/home/orders',
    name: 'orders',
    component: function(){
      return import(/* webpackChunkName: "/wishlist" */ '../components/Orders.vue')
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
