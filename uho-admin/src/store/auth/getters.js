const getters={
    nickname(state){
        return state.nickname
    },
 
    isAuth(state){
     if(state.token !==null){
         return true
     }
     return false
    },
 
    errorShow(state){
        return state.message
    }
 }
 export default getters