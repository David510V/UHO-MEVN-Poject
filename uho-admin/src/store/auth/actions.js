import router from '../../router'
import axios from 'axios'
import Vue from 'vue';
// Vue.forceUpdate();

require('dotenv').config()

const actions={ 
    

    login:({commit},logUser)=>{
        axios.post(`${process.env.VUE_APP_SERVER}/useradmin/login`,{
            email:logUser.email,
            password:logUser.password
        }).then((response)=>{
            commit('logUser',response.data)
           
            console.log(response) 
            console.log("This is local storage: "+localStorage)
            console.log("Worked")
            router.push({path:'/'})
            
        })
        
    },

    tryAutoLog:({commit})=>{
        console.log("TryAutoLog")
        const token=localStorage.getItem('token')
        const nickname=localStorage.getItem('nickname')
        const expiration=localStorage.getItem('expire')
        const userId=localStorage.getItem('userId')
        const now=new Date()
        if(!token){
            console.log("Token Not Found")
            return 
        }
        if(expiration<now){
            console.log("Time Expired")
            return
        }
            
        commit('autoLog',{
            token:token,
            userId:userId,
            nickname:nickname
        })
    },



    logOut:({commit})=>{
        
            console.log("Worked")
            
            commit('logOutUser')
            router.push({path:'/login'})
           
        
    }
 }

export default actions