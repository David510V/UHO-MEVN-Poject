<template>
  <div class="login">

    <div class="title">
        <span class="first">
        <router-link tag="span" to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        <span class="third">
          / {{title}}
        </span>
    </div>


    <div class="theLogin">
      <div class="big">Welcome Admin</div>

      <div class="formLogin">
        <p>Email:</p>
        <input type="text" v-model="email" placeholder="your@email.com">
        <p class="pass">Password:</p>
        <input type="text" v-model="password" placeholder="password">
        <br>
        <button @click="login()">Log In!</button>
        <p class="toSign">You not an admin? <a class="signupLink" tag="span" href="https://uho-store.netlify.app/"> Return to Store! </a> </p>
      </div>
      
    </div>
  </div>
</template>

<script>
import router from '../router/index.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default {
  data() {
    return {
      title:this.$route.name,
      email:'',
      password:''
    } 
  },
  created() {
    if(this.$store.getters.isAuth){
       this.$router.push({path:'/'}).catch(() => {})
   }
  //  else{
  //   this.$router.push({path:'/'}).catch(() => {})
  //  }
  },
  methods: {
    login(){
      var self=this
      var logUser={
        email:self.email,
        password:self.password
      }
      this.$store.dispatch('login',logUser)

    }    
  },
  mounted() {
    console.log(this.title)
  },
}
</script>

<style lang="scss">
@import "../scss/login.scss";
</style>