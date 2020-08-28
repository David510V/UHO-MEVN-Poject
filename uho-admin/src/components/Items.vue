<template>
  <div>
    <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home/
        </router-link>
        </span>
    </div>


    <div class="big">{{title}}</div>
      <router-link to="/home/items/additem" style="color: rgb(206, 138, 138);">
      <button class="addBtn">Add Item</button>
       </router-link>

      <div class="container-fluid" v-if="items">
         <div class="row">
             
             <div class="col-sm-12 col-12">
                 <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" class="productOrder"><span>Img</span></th>
                        <th scope="col" class="numOrder"><span>Item Name</span></th>
                        <th scope="col" class="sizeOrder"><span>Category</span></th>
                        <th scope="col" class="quantityOrder"><span>Price</span></th>
                        <th scope="col" class="totalOrder"><span>Items Left</span></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="(item,index) in items" :index="index">
                        <th scope="row" class="item">
                          <div class="theItem">
                            <div class="img">
                              <img class="img-fluid rounded" :src="`data:image/jpg;base64,${item.img.data}`" alt="Responsive image">
                            </div>
                          </div>
                        </th>
                      
                        <td class="itemSize">
                          <div class="name">{{item.name}}</div>
                          <router-link :to="{ path: '/home/items/item', query:{type:item._id}}" style="color: rgb(206, 138, 138);">
                            <button class="editBtn" >Edit Item</button>
                          </router-link>
                        </td>
                        <td class="itemSize">
                          <div>{{item.category_id}}</div>
                        </td>
                        <td class="itemPrice">
                          <div class="innerItemPrice">{{item.price}}.00 NIS</div>
                        </td>
                        <td class="quantity">
                          <div class="stuff">
                            <span class="count">Number Of items left after orders</span>
                          </div>
                        </td>
                       
                        </tr>
                        
                    </tbody>
                    </table>
             </div>
         </div>

     </div>   


    <div class="mobileItem" v-if="items">

       <div class="theItem" v-for="(item,index) in items" :index="index" style="margin-top:10vh">
          <div class="innerItem" >
  
            <div class="img">
                <img class="img-fluid rounded" :src="`data:image/jpg;base64,${item.img.data}`" alt="Responsive image">
             </div>
            <div class="details" >
              <p>UHO</p>
              <p>{{item.name}}</p>
              <p>{{item.size}}</p>
              
            </div>
          </div>
          <div class="price">{{item.price}}.00 NIS</div>
           <router-link :to="{ path: '/home/items/item', query:{type:item._id}}" style="color: rgb(206, 138, 138);">
             <button class="editBtn" >Edit Item</button>
           </router-link>
          <div class="flexOne">

            <div class="quantity">
              <div class="num">Items Left: 4</div>
              
            </div>

            <div class="total">
              <p style="margin:0">Category:</p>
              <p>{{item.category_id}}</p>
            </div>
          </div>
      </div> 
     </div>

     <Spinner v-else/>
  </div>
</template>

<script>
import router from '../router/index.js'
import axios from 'axios'
import Spinner from './spinner.vue'

export default {
  data() {
    return {
       title:this.$route.name,
      items:null
    }
  },
  components:{Spinner},
created() {
    if(!this.$store.getters.isAuth){
      this.$router.push({path:'/login'}).catch(() => {})
   }
   else{
   axios.get(`${process.env.VUE_APP_SERVER}/item`)
     .then((response)=>{
      this.items=response.data
        for(var i=0;i<this.items.length;i++){
           this.items[i].img.data=new Buffer(this.items[i].img.data).toString('base64')
        }
     })
     .catch((e)=>{
      console.log(e)
     })

     
    }
  },
}
</script>

<style lang="scss">
@import '../scss/items.scss';
</style>