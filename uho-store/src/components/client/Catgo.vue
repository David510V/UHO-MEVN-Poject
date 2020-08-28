<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        <span class="second">
        <router-link to="/wear" style="color: rgb(206, 138, 138);">
         / wear
        </router-link>
        </span>
        <span class="third">
         / {{title}}
        </span>
    </div>


    <div class="big">{{title}}</div>

    <div class="items" v-if="items">
      <div v-for="item in items" :index="item" class="item">
        <div class="innerItem">
          <router-link tag="span" :to="{ path: '/wear/catgo/item', query:{type:item._id}}" style="cursor:pointer">
          <img :src="`data:image/jpg;base64,${item.img.data}`" alt="">
        </router-link>
          <div class="small">UHO</div>
          <router-link tag="span" :to="{ path: '/wear/catgo/item', query:{type:item._id}}" style="cursor:pointer">
          <div class="name">{{item.name}}</div>
        </router-link>
          <div class="price">{{item.price}}.00 NIS</div>
        </div>
      </div>
    </div>


  <Spinner v-else/>


  </div>
</template>

<script>
import axios from 'axios'
import Spinner from './spinner.vue'
export default {
 data() {
    return {
      title:null,
      items:null
    } 
  },
  components:{Spinner},
  beforeMount() {
    
  },

  created() {
    this.title=this.$route.query.type

    if(this.$route.query.type==='shop-all'){
      axios.get(`${process.env.VUE_APP_SERVER}/item`)
      .then((response)=>{
        this.items=response.data
        for(var i=0;i<this.items.length;i++){
          this.items[i].img.data=new Buffer(this.items[i].img.data).toString('base64')
        }
      })
      .catch((e)=>{
        console.log(e)
      })
    }

    else{
    axios.get(`${process.env.VUE_APP_SERVER}/category/${this.$route.query.type}`)
    .then((response)=>{
      this.items=response.data
      for(var i=0;i<this.items.length;i++){
          this.items[i].img.data=new Buffer(this.items[i].img.data).toString('base64')
        }
    }).catch((e)=>{
      console.log(e)
    })
    }
  },
}
</script>

<style lang="scss">
@import '../../scss/catgo.scss';

</style>