import router from '../../router'
import axios from 'axios'
import Vue from 'vue';
// Vue.forceUpdate();

require('dotenv').config()

const actions={ 
    register:({commit},userData)=>{
        axios.post(`${process.env.VUE_APP_SERVER}/user`,
        {
            email:userData.email,
            password:userData.password,
            nickname:userData.nickname
        })
        .then((response)=>{
            var er=null
            commit('errorLog',er)
            commit('logUser',response.data)
           
            console.log(response) 
            console.log("This is lOcal storage: "+localStorage)
            console.log("Worked")
            router.push('/').catch((e)=>{})
        }).catch((e)=>{
            var er="Email Has Already Used"
            commit('errorLog',er)
        })
    },

    login:({commit},logUser)=>{
        axios.post(`${process.env.VUE_APP_SERVER}/user/login`,{
            email:logUser.email,
            password:logUser.password
        }).then((response)=>{
            var er=null
            commit('errorLog',er)
            commit('logUser',response.data)
            const date=new Date()
            const expire= new Date(date.getTime()+ 1000000)
            
            console.log(response) 
            console.log("This is lOcal storage: "+localStorage)
            console.log("Worked")
            router.push({path:'/'}).catch((e)=>{})
        })
        .catch((e)=>{
            var er="Wrong User or Password"
            commit('errorLog',er)
            // this.$router.push("/login").catch(()=>{});
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
        
            // localStorage.removeItem('token_id')
            // localStorage.removeItem('token')
            // localStorage.removeItem('userId')
            // localStorage.removeItem('nickname')
            // localStorage.removeItem('email')
            // localStorage.removeItem('expiresIn')
            // localStorage.removeItem('expire')
            console.log("This is lOcal storage: "+localStorage)
            console.log("Worked")
            
            commit('logOutUser')
           
        
    }
 }

export default actions