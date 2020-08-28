<template>
  <div>
      <div v-if="item">
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
          <span class="second">
              <router-link tag="span" :to="{ path: '/wear/catgo', query:{type:item.category_id}}" style="cursor:pointer">
          / {{item.category_id}}
              </router-link>
          </span>
          <span class="third">
          / {{item.name}}
          </span>
      </div>
        <div class="big">
                  {{item.name}}
              </div>
        <div class="small">
                UHO
        </div>
      </div>

    <div class="thing" v-if="item">
      
        <img :src="`data:image/jpg;base64,${item.img.data}`" alt="">

        <div class="order">

          <div class="sizeOrder">
            <div class="first">
            <p>Size:</p>
            <select class="form-control" id="sel1" v-model="item.size" >
              <option v-for="(option,index) in sizes" :key="index">{{option}}</option>
            </select>
            </div>
            <div class="second">
            <p>Color:</p>
            <select class="form-control" id="sel1" v-model="item.color">
              <option v-for="(option,index) in colors" :key="index">{{option}}</option>
            </select>
            </div>
          </div>
          
          <div class="price">{{item.price}}.00 NIS</div>

          <div class="addBuy">
            <button class="oneBtn" @click="sendItem()">ADD TO CART</button>
            
              <router-link :to="{ path: '/cart'}">
              <button @click="sendItem()">BUY IT NOW</button>
            </router-link>
          </div>
        </div>

        <div class="thanks" v-if="addTo">
          <p>Thanks for Toing!</p>
        </div>
    </div>

   <Spinner v-else />

  </div>
</template>

<script>
import axios from 'axios'
import Spinner from './spinner.vue'
var numItem=0
export default {
 data() {
    return {
      title:null,
      item:null,
      colors:['Black','Yellow','White'],
      sizes:['S','M','L'],
      addTo:false
    } 
  },

  components:{Spinner},
  
  created() {
    this.title=this.$route.query.type
    axios.get(`${process.env.VUE_APP_SERVER}/item/${this.$route.query.type}`) 
    .then((response)=>{
      this.item=response.data
      this.item.img.data=new Buffer(this.item.img.data).toString('base64')
      console.log(typeof this.item.img.data)
    }).catch((e)=>{
      console.log(e)
    })
  },

  methods: {
   sendItem(){
     var self=this
     numItem++
      const order={
        itemNum:numItem,
        itemId:this.item._id,
        name:this.item.name,
        img:this.item.img.data,
        price:this.item.price,
        size:this.item.size,
        color:this.item.color,
        count:1,
        total:this.item.price
      }
    
    this.$store.dispatch('sendItem',order)
    self.addTo=true
    console.log("Send!!")
    console.log(numItem)
    }
  },
}


</script>

<style lang="scss">
@import '../../scss/item.scss';

</style>