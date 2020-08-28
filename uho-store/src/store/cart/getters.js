const getters={
    itemsToCart(state,getters){
        return state.itemsToCart
      },
      totalPrice(state,getters){
        return state.totalPrice
      },
      totalCount(state,getters){
        return state.totalCount
      }
}
export default getters