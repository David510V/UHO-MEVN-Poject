<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        <span class="third">
          / {{title}}
        </span>
    </div>

    <div class="big">{{title}}</div>

    <div class="wear" v-if="categories">
      <div class="catego" v-for="wear in categories" :index="wear" >
        <div class="innerCatego">
          <router-link tag="span" :to="{ path: '/wear/catgo', query:{type:wear.name}}" style="cursor:pointer">
          
          <img :src="`data:image/jpg;base64,${wear.img.data}`" alt="">
          </router-link>

          <router-link tag="span" :to="{ path: '/wear/catgo', query:{type:wear.name}}" style="cursor:pointer">
            <div class="name">{{wear.name}}</div>
          </router-link>
        </div>
      </div>
    </div>

   <Spinner v-else/>

  </div>
</template>

<script>
var base64Img = require('base64-img');
import Spinner from './spinner.vue'
import axios from 'axios'
export default {
 
  data() {
    return {
      title:null,
      categories:null
    } 
  },
  components:{Spinner},
 
  methods: {
   
  },
  beforeMount() {
    
  },
  mounted() {

  },
  beforeCreate() {
 
  },

  created(){
    axios.get(`${process.env.VUE_APP_SERVER}/wear`,{timeout:0.1})
      .then((response)=>{
        this.categories=response.data
        for(var i=0;i<this.categories.length;i++){
          this.categories[i].img.data=new Buffer(this.categories[i].img.data).toString('base64')
          
        }
        console.log('WORKED')
        }).catch((e)=>{
        console.log(e)
      })
    this.title=this.$route.name
  }
}
</script>


<style lang="scss">
@import '../../scss/wear.scss';

</style>