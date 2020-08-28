<template>
  <div class="cart">
    <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        
        <span class="third">
         / USERS
        </span>
    </div>

    <div class="big">USERS</div>


      <div class="container-fluid" v-if="users">
         <div class="row">
             
             <div class="col-sm-12 col-12">
                 <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" class="product"><span>User Nickname</span></th>
                        <th scope="col" class="price"><span>Email</span></th>
                        <th scope="col" class="quantity"><span>Orders</span></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="(user,index) in users" :index="index">
                        <th scope="row" class="item">
                          <div class="theItem">
                           <div>{{user.nickname}}</div>
                          </div>
                        </th>
                        
                        <td class="email">
                          <div class="stuff">
                            <span class="count">{{user.email}}</span>
                          </div>
                        </td>
                        <router-link :to="{ path: '/home/users/:id', query:{type:user._Id}}" style="color: rgb(206, 138, 138);">
                        <td class="profile">
                          <div class="innerProfile">
                            {{user.nickname}} Profile
                          </div>
                        </td>
                        </router-link>
                        </tr>
                        
                       
                    </tbody>
                    </table>
                  </div>
              </div>
          <div class="row" style="margin-top:10vh; margin-left:5vw;">
            <div class="col-sm-4 col-12">
              <h5>Total Users: {{totalCount}}</h5><hr>  
            </div>
        </div>
      </div>




<div class="mobileItem" v-if="users">

       <div class="theItem" v-for="(user,index) in users" :index="index" style="margin-top:10vh" >
          <div class="innerItem" >
           
            <div class="details" >
              <p>UHO</p>
              <p>{{user.nickname}}</p>
              <p>{{user.email}}</p>
              
            </div>
          </div>
          
          <router-link :to="{ path: '/home/users/:id', query:{type:user._Id}}" style="color: rgb(206, 138, 138);">
            <div class="profile">{{user.nickname}} Profile</div>
          </router-link>
      </div> 
      <div class="row" style="margin-top:10vh; margin-left:5vw;">
         <div class="col-sm-4 col-12">
            <h5>Total Users: {{totalCount}}</h5><hr>
        </div>
    </div>
</div>

 <Spinner v-else />

  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import router from '../router/index.js'
import axios from 'axios';
import Spinner from './spinner.vue'
export default {
    data() {
      return {
        users:null,
        totalCount:0
      }
    },
    components:{Spinner},
     created() {
      if(!this.$store.getters.isAuth){
        this.$router.push({path:'/login'}).catch(() => {})
   }
   else{
  axios.get(`${process.env.VUE_APP_SERVER}/user`)
     .then((response)=>{
      console.log(response.data)
      this.users=response.data
      this.totalCount=response.data.length
     })
     .catch((e)=>{
      console.log(e)
     })
    }
   }
}
</script>

<style lang="scss">
@import '../scss/users.scss';
</style>