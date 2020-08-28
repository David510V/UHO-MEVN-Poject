<template>
  <div>
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


    <div class="signUp">
    <div class="theLogin">
      <div class="big">signup</div>
      <div class="errorLog" v-if="$v.email.$error">Youre Email Is Not Valid</div>
      <div class="errorLog" v-if="errorLog">{{errorLog}}</div>
      <div class="errorLog" v-if="$v.nickname.$error">Nickname more then 4 words</div>
      <div class="errorLog" v-if="$v.passRepeat.$error">Password Dont Match</div>
      <div class="errorLog" v-if="$v.password.$error">Password more then 4 notes</div>
      <div class="formLogin">
        <p>NickName:</p>
        <input type="text" v-model="nickname" @input="$v.nickname.$touch()" placeholder="Nick_Name">

        <p class="pass">Email:</p>
        <input type="text" v-model="email"  @input="$v.email.$touch()" placeholder="your@email.com">

        <p class="pass">Password:</p>
        <input type="text" v-model="password" @input="$v.password.$touch()" placeholder="password">
        

        <p class="pass">Repeat Password:</p>
        <input type="text" v-model="passRepeat" @input="$v.passRepeat.$touch()" placeholder="repeat password">

        

        <br>
        <button @click="register()" :disabled="$v.$invalid">Sign Up</button>
      </div>
      
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {required,minLength,sameAs,email} from 'vuelidate/lib/validators'
export default {
data() {
    return {
      title:this.$route.name,
      nickname:'',
      email:'',
      password:'',
      passRepeat:''
    } 
  },
  validations:{
      email:{
        required:required,
        email:email
      },
      nickname:{
        required:required,
        minLength:minLength(4)
      },
      password:{
        required:required,
        minLength:minLength(4)
      },
      passRepeat:{
        sameAsPassword:sameAs('password')
      }
  },
  computed: {
    errorLog:function(){
      return this.$store.getters.errorShow
    }
  },
  methods: {
    register(){
      var self=this
      if(this.nickname===''){
        alert('Fill Out NickName')
      }
      if(this.password!==this.passRepeat){
        alert('Password Dont Match')
      }
      var userData={
        nickname:self.nickname,
        email:self.email,
        password:self.password
      }
      
      this.$store.dispatch('register',userData)
      // this.$store.dispatch('removeItems')
    }
  },

}
</script>

<style lang="scss">
@import "../../scss/signup.scss";
</style>