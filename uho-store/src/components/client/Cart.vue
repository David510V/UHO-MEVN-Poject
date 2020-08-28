<template>
  <div class="cart">
    <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        
        <span class="third">
         / CART
        </span>
    </div>

    <div class="big">Cart</div>


      <div class="container-fluid">
         <div class="row">
             
             <div class="col-sm-12 col-12">
                 <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" class="product"><span>PRODUCT</span></th>
                        <th scope="col" class="price"><span>PRICE</span></th>
                        <th scope="col" class="quantity"><span>QUANTITY</span></th>
                        <th scope="col" class="total"><span>TOTAL</span></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="(item,index) in itemsCart" :index="index">
                        <th scope="row" class="item">
                          <div class="theItem">
                            <span @click="removeItem(item.itemNum)"><i class="far fa-trash-alt iconbtn"></i></span>
                            <div class="img">
                              <img class="img-fluid rounded" :src="`data:image/jpg;base64,${item.img}`" alt="Responsive image">
                            </div>
                            <div class="details">
                              <p>{{item.name}}</p>
                              <p>{{item.size}}</p>
                               <p>{{item.color}}</p>
                            </div>
                          </div>
                        </th>
                        <td class="itemPrice">
                          <div>{{item.price}}.00 NIS</div>
                        </td>
                        <td class="quantity">
                          <div class="stuff">
                            <span class="count">{{item.count}}</span>
                            <div class="addItem">

                              <span class="minus" @click="reduce(item.itemNum)">
                                <span class="innerMinus">-</span>
                              </span>

                              <span class="plus" @click="add(item.itemNum)">
                                <span class="innerPlus">+</span>
                              </span>

                            </div>
                          </div>
                        </td>
                        <td class="total">{{item.total}}.00 NIS</td>
                        </tr>
                        
                       
                    </tbody>
                    </table>
             </div>
         </div>
     </div>


     <div class="mobileItem">

       <div class="theItem" v-for="(item,index) in itemsCart" :index="index" style="margin-top:10vh">
          <div class="innerItem" >
           <span @click="removeItem(item.itemNum)"> <i class="far fa-trash-alt iconbtn"></i> </span>
            <div class="img">
                <img class="img-fluid rounded" :src="`data:image/jpg;base64,${item.img}`" alt="Responsive image">
             </div>
            <div class="details" >
              <p>UHO</p>
              <p>{{item.name}}</p>
              <p>{{item.size}}</p>
              <p>{{item.color}}</p>
            </div>
          </div>
          <div class="price">{{item.price}}.00 NIS</div>
          <div class="flexOne">

            <div class="quantity">
              <div class="num">{{item.count}}</div>
              <div class="addItem">
                 <span class="minus" @click="reduce(item.itemNum)">
                    <span class="innerMinus">-</span>
                 </span>

                 <span class="plus" @click="add(item.itemNum)">
                    <span class="innerPlus">+</span>
                  </span>

              </div>
            </div>

            <div class="total">
              <p>{{item.total}}.00 NIS</p>
            </div>
          </div>
      </div> 

     </div>

      <div class="row" style="margin-top:10vh; margin-left:5vw;">
             <div class="col-sm-4 col-12">
            <h5>Total cost: {{totalPrice}}.00 ILS </h5><hr>
            <h5>Number of Items: {{totalCount}}</h5><hr>
            <br>
           <div id="check"><button @click="checkOut()">Check out</button></div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import router from '../../router'
import axios from 'axios';
export default {
 

    data() {
      return {
        auth:this.$store.getters.isAuth,
        totalPrice:this.$store.getters.totalPrice,
        totalCount:this.$store.getters.totalCount,
        itemsCart:this.$store.getters.itemsToCart
      }
    },
    beforeCreate() {
     console.log('Cart Created')
     
    },
    methods: {
     
      add(num){
        var self=this
        var Item= self.itemsCart.find(item => item.itemNum===num)
        Item.count++
        Item.total+=Item.price
        self.totalPrice+=Item.price
        self.totalCount++

        const updateAdd={
          price:self.totalPrice,
          count:self.totalCount
        }
        this.$store.dispatch('add',updateAdd)
        console.log(self.totalPrice)
        
      },
      reduce(num){
        var self=this
        var Item= self.itemsCart.find(item => item.itemNum===num)
        Item.count--
        Item.total-=Item.price
        self.totalPrice=self.totalPrice-Item.price
        self.totalCount=self.totalCount-1

        const updateReduce={
          price:self.totalPrice,
          count:self.totalCount
        }

        this.$store.dispatch('reduce',updateReduce)
       
        if(Item.count===0){
          this.removeItem(num)
        }

        console.log("work")
      },
       removeItem(itemNum){
        
        var self=this
        var removeItem= self.itemsCart.find(item => item.itemNum===itemNum)
        
        self.totalPrice=self.totalPrice-removeItem.total
        self.totalCount=self.totalCount-removeItem.count

        const updateReduce={
          price:self.totalPrice,
          count:self.totalCount
        }
        console.log(removeItem)
        console.log(this.itemsCart)
        this.$store.dispatch('reduce',updateReduce)
        this.$store.dispatch('removeItem',removeItem)
        
      },

     async checkOut(){
        var self=this
        if(!self.auth){
         return router.push('/login')
        }
        for(var i=0;i<self.itemsCart.length;i++){
         await axios.post(`${process.env.VUE_APP_SERVER}/order`,{
            itemNum:self.itemsCart[i].itemNum,
            itemId:self.itemsCart[i].itemId,
            itemName:self.itemsCart[i].name,
            itemImg:self.itemsCart[i].img,
            itemPrice:self.itemsCart[i].price,
            itemSize:self.itemsCart[i].size,
            itemColor:self.itemsCart[i].color,
            itemCount:self.itemsCart[i].count,
            total:self.itemsCart[i].total,
            userId:localStorage.getItem('userId')
          }).then((response)=>{
             console.log("Did It")
          }).catch((e)=>{
            console.log("Not Work")
            console.log(e)
          })
        }
        this.$store.commit('noneItems')
        await router.push('/thank')
      
        
        console.log(self.itemsCart)
      }
    },
}
</script>

<style lang="scss">
@import '../../scss/cart.scss';
</style>