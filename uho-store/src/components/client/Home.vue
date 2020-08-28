<template>
  <div class="home">
    <div id="carousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carousel" data-slide-to="0" class="active"></li>
        <li data-target="#carousel" data-slide-to="1"></li>
        <li data-target="#carousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="../../../public/img/three.png" alt="First slide">
          <div class="carousel-caption d-none d-md-block">
            <h5>Think about better future</h5>
            <p>shop now</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../../../public/img/two.png" alt="Second slide">
          <div class="carousel-caption d-none d-md-block">
            <h5>Think about better future</h5>
            <p>shop now</p>
          </div>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="../../../public/img/one.png" alt="Third slide">
          <div class="carousel-caption d-none d-md-block">
            <h5>Think about better future</h5>
            <p>shop now</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <div class="logo">
      <img src="../../../public/img/group.png" alt="First slide">
    </div>

    <div class="wrapper">
      <div class="about">
      <p class="head">About</p>
      <p class="under">UHO was born out of necessity. Covid-19 pandemic made people live & think different. think about better 
        future.Priorities are changing.People work more from home and looking for sense of safety & comfort. 
        We believe that life is changing. UHO designing for a better future. we feel each person can make 
        sustainable choices. Gender awareness become blurry and negligible compared to comfort. 
        Therefore we create a thoughtful unisex collection of 
        wardrobe essentials And wants to make them accessible to people from all over the world.</p>
    </div>

      <div class="pic1">
        <img src="../../../public/img/cotton.jpg" alt="First slide">
      </div>
    </div>

    <div class="collection">
      <carousel id="home" autoplay="true" :nav="false" :items="3" :margin="30"  :center="false" :dots="false" v-if="wears">
        <div class="item" v-for="wear in wears">
        <router-link tag="span" :to="{ path: '/wear/catgo', query:{type:wear.name}}" style="cursor:pointer">
          <div class="img">
            <img :src="`data:image/jpg;base64,${wear.img.data}`" alt="">
          </div>
          <p>
            {{wear.name}}
          </p>
        </router-link>
        </div>
    </carousel>

    <carousel id="mobile" autoplay="true" :nav="false" :items="1" v-if="wears">

      <div class="item" v-for="wear in wears">
        <router-link tag="span" :to="{ path: '/wear/catgo', query:{type:wear.name}}" style="cursor:pointer">
          <div class="img">
            <img :src="`data:image/jpg;base64,${wear.img.data}`" alt="">
          </div>
          <p>
            {{wear.name}}
          </p>
        </router-link>
        </div>
     
    </carousel>

     <Spinner v-else />

    </div>

    <div class="values">
      <p class="head">Wear your values.</p>
      <p class="under">
        <span class="underSpan">What to wear to feel happy, productive and relax?</span>
        <span class="underSpan">We create a unisex collection with just a few basic pieces that make you feel good.</span>
        <span class="underSpan">
        All products are made of organic cotton and have a quality test to maintain the
        fiber and make sure the product lifetime be longer.
        </span>
        </p>
    </div>

    <div class="movement">
      <div class="img">
        <img src="../../../public/img/cotton.jpg" alt="">
      </div>
      <div class="under">
        <p class="first">Join the movment</p>
        <p class="second">Let us keep you updated</p>

        <div class="mail">
          <form action="">
          <input type="text" placeholder="your@email.com">
          <div class="icon"><i class="far fa-envelope"></i></div>
          </form>
        </div>

      </div>

      
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel2'
var base64Img = require('base64-img');
import axios from 'axios'
import Spinner from './spinner.vue'
export default {
    components: { carousel,Spinner },
    data() {
      return {
        wears:null
      }
    },
    
    created(){
    axios.get(`${process.env.VUE_APP_SERVER}/wear`,{timeout:0.1})
      .then((response)=>{
        this.wears=response.data
        for(var i=0;i<this.wears.length;i++){
          this.wears[i].img.data=new Buffer(this.wears[i].img.data).toString('base64')
        }
        console.log('WORKED')
        }).catch((e)=>{
        console.log(e)
      })
    this.title=this.$route.name
  },
  
}
</script>

<style lang="scss">
@import "../../scss/home.scss";
  
</style>