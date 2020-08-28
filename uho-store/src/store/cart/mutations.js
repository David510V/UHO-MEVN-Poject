import Vue from 'vue'
const mutations={
    'SendItem'(state,{itemNum,itemId,name,price,img,size,color,count,total}){
      const date=new Date()
      const expire= new Date(date.getTime()+ 1000000)
    
      state.itemsToCart.push({
          itemNum:itemNum,
          itemId:itemId,
          name:name,
          img:img,
          price:price,
          size:size,
          color:color,
          count:count,
          total:total
        })
        state.totalPrice+=total
        state.totalCount+=count
        
      },
      
      'RemoveItem'(state,removeItem){
        state.itemsToCart.splice(state.itemsToCart.indexOf(removeItem),1)
        
        // localStorage.setItem('itemsCart',JSON.stringify(items))
        // localStorage.setItem('totalPrice',state.totalPrice)
        // localStorage.setItem('totalCount',state.totalCount)
        // console.log(localStorage.getItem('itemsCart'))
        
        // location.reload()
        
        if(state.itemsToCart.length===0){
          state.totalPrice=0
          state.totalCount=0
        }
        
      },
  
      'addAll'(state,{price,count}){
        state.totalPrice=price
        state.totalCount=count
        
      },
  
      'reduceAll'(state,{price,count}){
        state.totalPrice=price,
        state.totalCount=count
      },

      // 'autoCart'(state,data){
      //   state.itemsToCart=data.itemsCart,
      //   state.totalPrice=data.totalPrice,
      //   state.totalCount=data.totalCount
      // },

      'noneItems'(state){
        console.log(state.itemsToCart)
        state.itemsToCart=[],
        state.totalPrice=0,
        state.totalCount=0         
      }
}

export default mutations