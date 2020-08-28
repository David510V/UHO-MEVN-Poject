<template>
  <div class="header">
      <div class="nav">
          <div class="menu" >
              <div class="menuIcon" v-on:click="open()">
                  <div class="menuBurger" v-if="auth">

                  </div>
              </div>
              <i class="userMobile" v-if="nickname">
                 Hi, {{nickname}}
             </i>
          </div>
          
          <div class="logo">
              <router-link class="router" tag="span" :to="{ path: '/'}" style="cursor:pointer" >
              <p >UHO</p>
              </router-link>
          </div>
          <div class="icons">
            
             <router-link :to="{ path: '/'}" style="color:black!important">
             <i class="user2" v-if="nickname" @click="logOut()" style="cursor:pointer;">
                Log Out 
             </i>
             </router-link>
              <i class="fas fa-search d-none"></i>
              <router-link :to="{ path: '/'}" style="color:black!important">
                <i class="fas fa-user" ></i>
              </router-link>
             
          </div>
      </div>

    <div ref="navOpen" id="navOpen" class="navOpen">
         
          <div class="innerOpenN">
            <router-link class="router" tag="span" :to="{ path: '/'}">
            <a href=""><span v-on:click="open()">Home</span></a>
            </router-link>

            <router-link class="router" tag="span" :to="{ path: '/home/items'}">
            <a href=""><span v-on:click="open()">Items</span></a>
            </router-link>

            <router-link class="router" tag="span" :to="{ path: '/home/wears'}">
            <a href=""><span v-on:click="open()">Wears</span></a>
            </router-link>

            <router-link tag="span" :to="{ path: '/wear/catgo', query:{type:'shop-all'}}" style="cursor:pointer">
            <a href=""><span v-on:click="open()">Shop All</span></a>
            </router-link>
          </div>

          
      </div>
      <div ref="openN" id="openN" class="openNav">
          <p v-on:click="open()" >X</p>
          <div class="innerOpenN">
            
            <router-link class="router" tag="span" :to="{ path: '/'}">
            <a href="" v-on:click="open()">Home</a>
            </router-link>
            
            <router-link class="router" tag="span" :to="{ path: '/home/items'}">
            <a href="" v-on:click="open()">Items</a>
            </router-link>
            
            <router-link class="router" tag="span" :to="{ path: '/home/wears'}">
            <a href="" v-on:click="open()">Wears</a>
            </router-link>
            
            <router-link tag="span" :to="{ path: '/wear/catgo', query:{type:'shop-all'}}">
            <a href="" v-on:click="open()">Shop All</a>
            </router-link>
            
          </div>
          <div class="register">
              <router-link :to="{ path: '/login'}" style="color:black!important">
              <span v-if="auth"><i class="far fa-user"></i> <span class="title"  v-on:click="logOut(), open()">logout</span></span>
              <span v-else><i class="far fa-user"></i> <span class="title" v-on:click="open()">Login</span></span>
              </router-link>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
// import router from '../../../lotemshop/src/router';
export default {
    computed: {
        // ...mapGetters("auth",["isAuth","nickname"]),
        auth(){
            return this.$store.getters.isAuth
        },
        nickname(){
            return this.$store.getters.nickname
        }
    },
    data() {
        return {
            show:false,
            login:'login',
            
        }
    },
    
    methods: {
        open(){
            const app= document.getElementById("app")
            const menuBtn=document.querySelector('.menuIcon')
            const openN=document.querySelector('.openNav')
            const navOpen=document.querySelector('#navOpen')
                if(!this.show){
                    menuBtn.classList.add('open')
                    app.classList.add('moveNavApp')
                    openN.classList.add('moveNav')
                    navOpen.classList.add('navOpenMove')
                    this.show=true 
                    console.log(openN)
                }
                else{
                    menuBtn.classList.remove('open')
                    app.classList.remove('moveNavApp')
                    openN.classList.remove('moveNav')
                    navOpen.classList.remove('navOpenMove')
                    this.show=false
                    console.log(openN.style.animation)
                }
        },

        logOut(){
            this.$store.dispatch('logOut')
            this.$store.dispatch('removeItems')
        }
    },
}
</script>

<style lang="scss">
@import "../scss/header.scss";

</style>