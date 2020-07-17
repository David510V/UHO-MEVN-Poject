<template>
  <div>
      <div class="nav">
          <div class="menu">
              <div class="menuIcon" v-on:click="open()">
                  <div class="menuBurger">

                  </div>
              </div>
          </div>
          <div class="logo">
              <img src="../../public/img/logo.png" alt="">
          </div>
          <div class="icons">
              <i class="fas fa-search"></i>
              <i class="fas fa-user"></i>
              <i class="far fa-caret-square-down"></i>
          </div>
      </div>

      <div ref="openN" id="openN" class="openNav" v-if="show">
          <p v-on:click="open()" >X</p>
          <a href="">Home</a>
          <a href="">Wear</a>
          <a href="">About</a>
          <a href="">Shop All</a>
      </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            show:false
        }
    },
    created(){
        console.log(this.$refs.openN)
    },
    methods: {
        open(){
            const app= document.getElementById("app")
            const menuBtn=document.querySelector('.menuIcon')
            const openN=document.querySelector('.openNav')
                if(!this.show){
                    menuBtn.classList.add('open')
                    app.style.opacity="50%"
                    app.style.background="rgb(107, 106, 106)"
                    app.style.transition='0.5s all ease'
                    this.show=true 
                    console.log(openN)
                }
                else{
                    menuBtn.classList.remove('open')
                    app.style.opacity="100%"
                    app.style.background="white"
                    app.style.transition='0.5s all ease'
                    openN.style.animation="outNav 0.5s linear"
                    this.show=false
                    console.log(openN.style.animation)
                }
        },
    },
}
</script>

<style lang="scss">
@import "../scss/header.scss";
</style>