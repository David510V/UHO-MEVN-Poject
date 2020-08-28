<template>
  <div id="app">
    <appHead></appHead>
    <router-view/>
    <appFoot></appFoot>
  </div>
</template>

<script>
// What
import header from './views/header.vue'
import foot from './views/footer.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import dotenv from 'dotenv'
Vue.use(VueRouter)

dotenv.config()
export default {
   components:{
    appHead:header,
    appFoot:foot
  },

  mounted() {
    this.mountedFin("mounted")
  },
  destroyed() {
    this.destroyedFin("destroyed")
  },
  
  methods: {
    mountedFin(arg){
      return 'mounted'
            console.log(arg)
    },
    destroyedFin(arg){
      console.log(arg)
    },
  },
 
 
}
</script>
<style lang="scss">
#app {
  font-family: 'Montserrat', sans-serif;
  position: relative;
  top: 0;
  transition:0.5s all ease;
  a:hover{
    text-decoration: none !important;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}


@media (min-width: 300px) and (max-width: 500px){
  #app{
    padding: 0;
  }
}
</style>
