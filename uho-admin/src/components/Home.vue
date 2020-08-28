<template>
  <div>
      <!-- <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
    </div> -->


    <div class="big">{{title}}</div>

    <div class="items" v-if="collections">
      <div class="item" v-for="collection in collections.slice(1,2)" :index="collection" >
        <div class="innerItem">
          <router-link tag="span" :to="{ path: '/home/orders'}" style="cursor:pointer">
          <img :src="require(`../../public/img/${collection.name}.png`)" alt="">
        </router-link>
          <div class="small">UHO</div>
          <router-link tag="span" :to="{ path: '/home/orders'}" style="cursor:pointer">
          <div class="name">{{collection.name}}</div>
        </router-link>  
        </div>
      </div>

      <div class="item" v-for="collection in collections.slice(2,3)" :index="collection" >
        <div class="innerItem">
          <router-link tag="span" :to="{ path: '/home/users'}" style="cursor:pointer">
          <img :src="require(`../../public/img/${collection.name}.png`)" alt="">
        </router-link>
          <div class="small">UHO</div>
          <router-link tag="span" :to="{ path: '/home/users'}" style="cursor:pointer">
          <div class="name">{{collection.name}}</div>
        </router-link>  
        </div>
      </div>

      <div class="item" v-for="collection in collections.slice(0,1)" :index="collection" >
        <div class="innerItem">
          <router-link tag="span" :to="{ path: '/home/items'}" style="cursor:pointer">
          <img :src="require(`../../public/img/${collection.name}.png`)" alt="">
        </router-link>
          <div class="small">UHO</div>
          <router-link tag="span" :to="{ path: '/home/items'}" style="cursor:pointer">
          <div class="name">{{collection.name}}</div>
        </router-link>  
        </div>
      </div>

      <div class="item" v-for="collection in collections.slice(4)" :index="collection" >
        <div class="innerItem">
          <router-link tag="span" :to="{ path: '/home/wears'}" style="cursor:pointer">
          <img :src="require(`../../public/img/${collection.name}.png`)" alt="">
        </router-link>
          <div class="small">UHO</div>
          <router-link tag="span" :to="{ path: '/home/wears'}" style="cursor:pointer">
          <div class="name">{{collection.name}}</div>
        </router-link>  
        </div>
      </div>

    </div>

  <Spinner v-else/>

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
import dotenv from 'dotenv'
import Spinner from './spinner.vue'

export default {
 data() {
    return {
      title:this.$route.name,
      collections:null
    } 
  },
  
  components:{Spinner},

  created() {
    if(!this.$store.getters.isAuth){
      this.$router.push({path:'/login'}).catch(() => {})
   }
   else{
  axios.get(`${process.env.VUE_APP_SERVER}/useradmin/collection`)
     .then((response)=>{
      console.log(response.data)
      this.collections=response.data
     })
     .catch((e)=>{
      console.log(e)
     })
    }
   }
    
}
</script>

<style lang="scss">
    @import '../scss/home.scss';
</style>