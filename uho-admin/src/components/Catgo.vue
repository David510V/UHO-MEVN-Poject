<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        collections
        </router-link>
        </span>
       
    </div>


    <div class="big">{{title}}</div>

    <div class="items" v-if="collections">
      <div v-for="collection in collections" :index="collection" class="item">
        <div class="innerItem">
          <router-link tag="span" :to="{ path: '/wear/catgo/item'}" style="cursor:pointer">
          <img :src="require(`../../public/img/${collection.name}.png`)" alt="">
        </router-link>
          <div class="small">UHO</div>
          <router-link tag="span" :to="{ path: '/wear/catgo/item'}" style="cursor:pointer">
          <div class="name">{{collection.name}}</div>
        </router-link>
          
        </div>
      </div>
    </div>

   <Spinner v-else />

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
import Spinner from './spinner.vue'

export default {
 data() {
    return {
      title:null,
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