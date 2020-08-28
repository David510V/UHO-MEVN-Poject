import router from "../../router";

const actions={ 
    sendItem: ({commit}, order) => {
        commit('SendItem', order);
        
      },
  
      removeItem:({commit},removeItem)=>{
        commit('RemoveItem',removeItem)
        
      },
      
      add:({commit},updateAdd)=>{
        commit('addAll',updateAdd)
      },
  
      reduce:({commit},updateReduce)=>{
        commit('reduceAll',updateReduce)
      },
  
}

export default actions