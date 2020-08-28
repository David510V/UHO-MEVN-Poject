<template>
  <div class="cart">
    <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        
        <span class="third">
         / ORDERS
        </span>
    </div>

    <div class="big">Orders</div>


      <div class="container-fluid" v-if="orders">
         <div class="row">
             
             <div class="col-sm-12 col-12">
                 <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" class="productOrder"><span>Item</span></th>
                        <th scope="col" class="numOrder"><span>Orderd By:</span></th>
                        <th scope="col" class="sizeOrder"><span>Item Size</span></th>
                        <th scope="col" class="priceOrder"><span>Item PRICE</span></th>
                        <th scope="col" class="quantityOrder"><span>QUANTITY</span></th>
                        <th scope="col" class="totalOrder"><span>TOTAL</span></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="(item,index) in orders" :index="index">
                        <th scope="row" class="item">
                          <div class="theItem">
                            <div class="img">
                              <img class="img-fluid rounded" :src="`data:image/jpg;base64,${item.itemImg}`" alt="Responsive image">
                            </div>
                            <div class="details">
                              <p>{{item.itemName}}</p>
                              <p>{{item.itemSize}}</p>
                               <p>{{item.itemColor}}</p>
                            </div>
                          </div>
                        </th>
                        <td class="itemUser">
                          <router-link :to="{ path: '/home/users/:id', query:{type:item.userId}}" style="color: rgb(206, 138, 138);">
                          <div>{{item.userId}}</div>
                          </router-link>
                        </td>
                        <td class="itemSize">
                          <div>{{item.itemSize}}</div>
                        </td>
                        <td class="itemPrice">
                          <div>{{item.itemPrice}}.00 NIS</div>
                        </td>
                        <td class="quantity">
                          <div class="stuff">
                            <span class="count">{{item.itemCount}}</span>
                            
                          </div>
                        </td>
                        <td class="total">{{item.total}}.00 NIS</td>
                        </tr>
                        
                    </tbody>
                    </table>
             </div>
         </div>

         <div class="row" style="margin-top:10vh; margin-left:1vw;">
            <div class="col-sm-4 col-12">
              <h5>Total Orders: {{totalCount}}</h5><hr>  
            </div>
        </div>
     </div>


     <div class="mobileItem" v-if="orders">

       <div class="theItem" v-for="(item,index) in orders" :index="index" style="margin-top:10vh">
          <div class="innerItem" >
  
            <div class="img">
                <img class="img-fluid rounded" :src="`data:image/jpg;base64,${item.itemImg}`" alt="Responsive image">
             </div>
            <div class="details" >
              <p>UHO</p>
              <p>{{item.itemName}}</p>
              <p>{{item.itemSize}}</p>
              <p>{{item.itemColor}}</p>
            </div>
          </div>
          <div class="price">{{item.itemPrice}}.00 NIS</div>
          <div class="flexOne">

            <div class="quantity">
              <div class="num">Quantity {{item.itemCount}}</div>
              
            </div>

            <div class="total">
              <p>{{item.total}}.00 NIS</p>
            </div>
          </div>
      </div> 

       <div class="row" style="margin-top:10vh; margin-left:1vw;">
            <div class="col-sm-4 col-12">
              <h5>Total Orders: {{totalCount}}</h5><hr>  
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

// console.log(this.itemsCart)
export default {

    data() {
      return {
        orders:null,
        totalCount:null
      }
    },

    components:{Spinner},

    created() {
      if(!this.$store.getters.isAuth){
      this.$router.push({path:'/login'}).catch(() => {})
   }
   else{
    axios.get(`${process.env.VUE_APP_SERVER}/useradmin/collection/orders`)
      .then((response)=>{
        console.log(response.data)
        this.orders=response.data
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
@import '../scss/orders.scss';
</style>