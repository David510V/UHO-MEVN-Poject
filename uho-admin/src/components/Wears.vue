<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home/
        </router-link>
        </span>
    </div>


    <div class="big">{{title}}</div>

    
       <router-link to="/home/wears/addwear" style="color: rgb(206, 138, 138);">
      <button class="addBtn">Add Wear</button>
       </router-link>
    

    <div class="wears" v-if="wears">
      <div class="wear" v-for="wear in wears" :index="wear" >
        <div class="innerWear">
          <img :src="`data:image/jpg;base64,${wear.img.data}`" alt="">
          <div class="small">UHO</div>
          <div class="name">{{wear.name}}</div>
        
        <router-link tag="span" :to="{ path: '/home/wears/wear', query:{type:wear._id}}" style="cursor:pointer">
        <button class="editBtn">Edit Wear</button>  
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
      title:this.$route.name,
      wears:null
    } 
  },
  
  components:{Spinner},

  created() {
    if(!this.$store.getters.isAuth){
      if (this.$router.path !== '/login'){
        this.$router.push('/login').catch(err=>{})
      }
   }
   var self=this
  axios.get(`${process.env.VUE_APP_SERVER}/wear`)
     .then((response)=>{
      console.log(response.data)
     this.wears=response.data 
      for(var i=0;i<this.wears.length;i++){
          this.wears[i].img.data=new Buffer(this.wears[i].img.data).toString('base64')
          
        }
     })
     .catch((e)=>{
      console.log('Bad Connection')
     })
    
   }
    
}
</script>

<style lang="scss">
    @import '../scss/wears.scss';
</style>