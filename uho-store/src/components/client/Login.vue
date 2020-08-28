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
      <div class="big">login</div>
      <div class="errorLog" v-if="errorLog">{{errorLog}}</div>
      <div class="formLogin">
        <p>Email:</p>
        <input type="text" v-model="email" placeholder="your@email.com">
        <p class="pass">Password:</p>
        <input type="text" v-model="password" placeholder="password">
        <br>
        <button @click="login()">Log In!</button>
        <p class="toSign">Dont have an Account? <router-link class="signupLink" tag="span" to="/signup"> Sign Up! </router-link> </p>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
     // title:this.$route.name,
      email:'',
      password:'',
      
    } 
  },
  created() {
    if(this.$store.getters.isAuth){
        return router.push({path:'/'})
   }
  },
  computed: {
    errorLog:function(){
      return this.$store.getters.errorShow
    }
  },
  methods: {
    login(){
      var self=this
      var logUser={
        email:self.email,
        password:self.password
      }
      
      
      this.$store.dispatch('login',logUser)
      this.$store.dispatch('removeItems')
    }    
  },
  mounted() {
    console.log(this.title)
  },
}
</script>

<style lang="scss">
@import "../../scss/login.scss";
</style>