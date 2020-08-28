<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        <span class="second">
          <router-link to="/home/users" style="color: rgb(206, 138, 138);">
         / Users
        </router-link>
        </span>
        
        <span class="third">
         / {{user.name}}
        </span>
        </div>
          <div class="big">
            {{user[0].nickname}}
          </div>
          <div class="small">
              {{user[0].email}}
          </div>

          <div class="mid">
              orders
          </div>

    <div class="container-fluid" v-if="orders">
         <div class="row">
             
             <div class="col-sm-12 col-12">
                 <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" class="product"><span>Item</span></th>
                        <th scope="col" class="num"><span>Orderd By:</span></th>
                        <th scope="col" class="size"><span>Item Size</span></th>
                        <th scope="col" class="price"><span>Item PRICE</span></th>
                        <th scope="col" class="quantity"><span>QUANTITY</span></th>
                        <th scope="col" class="total"><span>TOTAL</span></th>
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
     </div>

    <div class="row" style="margin-top:10vh; margin-left:5vw;" v-if="orders">
            <div class="col-sm-4 col-12">
             <h5>Total cost: {{totalCount}}.00 ILS </h5><hr>
             <h5>Number of Items: {{totalPrice}}</h5><hr>
             <br>
            
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
              <div class="num">Quantity: {{item.itemCount}}</div>
              
            </div>

            <div class="total">
              <p>{{item.total}}.00 NIS</p>
            </div>
          </div>
      </div> 

         <div class="row" style="margin-top:10vh; margin-left:5vw;">
            <div class="col-sm-4 col-12">
             <h5>Total cost: {{totalCount}}.00 ILS </h5><hr>
             <h5>Number of Items: {{totalPrice}}</h5><hr>
             <br>
            
          </div>
        </div>

     </div>


     <Spinner v-else/> 

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
import Spinner from './spinner.vue'
export default {
 data() {
    return {
      title:null,
      user:null,
      orders:null,
      totalPrice:null,
      totalCount:0
    } 
  },

  components:{Spinner},
  
  created() {
    this.title=this.$route.query.type
    axios.get(`${process.env.VUE_APP_SERVER}/user/${this.$route.query.type}`) 
    .then((response)=>{
      this.user=response.data
      
      console.log(response.data)
    }).catch((e)=>{
        router.push({path:'/home/orders'})
      console.log(e)
    })

    axios.get(`${process.env.VUE_APP_SERVER}/userItems/${this.$route.query.type}`)
    .then((response)=>{
        this.orders=response.data
        this.totalPrice=response.data.length
    })
    .catch((e)=>{
        console.log(e)
    })
  },

  
}


</script>

<style lang="scss">
@import '../scss/user.scss';

</style>