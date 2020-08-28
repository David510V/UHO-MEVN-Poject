<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
         <router-link to="/home/wears" style="color: rgb(206, 138, 138);">
         /Wears
        </router-link>
        <router-link to="/home/wears" style="color: rgb(206, 138, 138);" v-if="wear">
         /{{wear.name}}
        </router-link>
        </span>
    </div>


    <div class="big" v-if="wear">{{wear.name}}</div>

    <div class="wearOne" v-if="wear">
      
        <div class="innerWearOne">
          <router-link tag="span" :to="{ path: '/home/wears/wear', query:{type:wear._id}}" style="cursor:pointer">
          <img :src="`data:image/jpg;base64,${wear.img.data}`" alt="">
        </router-link>
          <div class="small">UHO</div>
          
          <div class="name">{{wear.name}}</div>
        
      </div>
      
      <div class="update" v-if="items">
          <p>Number of Types: {{items.length}}</p>
          <p>Wear Name</p>
          <input type="text" v-model="nameWear=wear.name">
          <br><br>
          <p>Wear Img</p>
          <input id="file" type="file" @change="fileChange" accept="image/png, image/jpeg">
          <br>
          <button class="btnUpdate" @click="update()">Update </button>
      </div>

    
    </div>

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
                          <router-link :to="{ path: '/home/items/item', query:{type:item._id}}" style="color: rgb(206, 138, 138);">
                            <div>{{item.name}}</div>
                          </router-link>
                        </td>
                        <td class="itemSize">
                          <div>{{item.category_id}}</div>
                        </td>
                        <td class="itemPrice">
                          <div>{{item.price}}.00 NIS</div>
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
              <router-link :to="{ path: '/home/items/item', query:{type:item._id}}" style="color: rgb(206, 138, 138);">
                            <div>{{item.name}}</div>
                          </router-link>
              <p>{{item.size}}</p>
              
            </div>
          </div>
          <div class="price">{{item.price}}.00 NIS</div>
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

    <Spinner v-else />

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
import Spinner from './spinner.vue'
export default {
 data() {
    return {
      title:this.$route.query.type,
      wear:null,
      file:null,
      items:null,
      imgWear:null,
      nameWear:null
    } 
  },
  components:{Spinner},
  created() {
    if(!this.$store.getters.isAuth){
      this.$router.push({path:'/login'}).catch(() => {})
   }
   else{
   axios.get(`${process.env.VUE_APP_SERVER}/wears/${this.$route.query.type}`)
     .then((response)=>{
      this.wear=response.data[0]
      this.wear.img.data=new Buffer(this.wear.img.data).toString('base64')
      if(this.wear.name==='shop-all'){
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
      axios.get(`${process.env.VUE_APP_SERVER}/items/${this.wear.name}`)
     .then((response)=>{
      console.log(response.data)
      this.items=response.data
      for(var i=0;i<this.items.length;i++){
        this.items[i].img.data=new Buffer(this.items[i].img.data).toString('base64')
      }
      })
     .catch((e)=>{
      console.log(e)
     })
     })
     .catch((e)=>{
      console.log(e)
     })

     
    }
  },

  methods: {
    fileChange(event){  
    console.log(event.target.files[0])
    this.imgWear=event.target.files[0]
    },

    update(){
      var self=this
      var data={
        name:self.nameWear,
        img:self.imgWear
      }
      
      var formData=new FormData()
      formData.append('name',data.name)
      formData.append('img',data.img)
      console.log(formData)
      axios.patch(`${process.env.VUE_APP_SERVER}/wear/${this.$route.query.type}`,formData)
        .then((response)=>{
            console.log(response) 
            console.log("Worked")
            router.push({path:'/home/wears'})
        }).catch((e)=>{
        console.log(formData)
        })
    }
  },
  
}
</script>

<style lang="scss">
@import '../scss/wear.scss';
</style>