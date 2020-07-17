<template>
  <div id="app">
    <appHead></appHead>
    <router-view/>
    <appFoot></appFoot>
  </div>
</template>

<script>
import header from './views/header.vue'
import foot from './views/footer.vue'
export default {
   components:{
    appHead:header,
    appFoot:foot
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //1.8vh 2.2vw 2vh 2.2vw
  padding: 1.8vh 2.2vw 2vh 2.2vw;
  color: #2c3e50;
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
