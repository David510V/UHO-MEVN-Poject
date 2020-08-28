<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        <span class="second">
          <router-link to="/home/items" style="color: rgb(206, 138, 138);">
         / Items
        </router-link>
        </span>
        <span class="third">
         / {{item.name}}
        </span>
    </div>
      <div class="big">
                {{item.name}}
            </div>
            <div class="small">
              UHO
            </div>

   <div class="wearOne" v-if="item">
      
        <div class="innerWearOne">
          
          <img :src="`data:image/jpg;base64,${item.img.data}`" alt="">
        
          <div class="small">UHO</div>
          
          <div class="name">{{item.name}}</div>
        
      </div>
      
      <div class="update" v-if="item">
          <p>Number of Types: {{item.length}}</p>
          <p>Item Name</p>
          <input class="inputUpdate" type="text" v-model="itemName=item.name">
          <br><br>
          <p>Item Price</p>
          <input class="inputUpdate" type="number" v-model="itemPrice=item.price">
          <br><br>
          <p>Category</p>
          <select class="form-control" id="sel1" v-model="category=item.category_id" @change="optionChange" >
              <option v-for="(option,index) in options" :key="index" >{{option.name}}</option>
            </select>
          <br><br>
          <p>Item Img</p>
          <input id="file" type="file" @change="fileChange" accept="image/png, image/jpeg">
          <br><br>
          <button class="btnUpdate" @click="update()">Update </button>
      </div>
    </div>

  <Spinner v-else />

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
import Spinner from './spinner.vue'

var numItem=0
export default {
 data() {
    return {
      title:null,
      item:null,
      itemName:null,
      itemPrice:null,
      category:null,
      itemImg:null,
      options:null,
      addTo:false
    } 
  },
  
  components:{Spinner},

  created() {
    this.title=this.$route.query.type
    axios.get(`${process.env.VUE_APP_SERVER}/item/${this.$route.query.type}`) 
    .then((response)=>{
      this.item=response.data
      this.item.img.data=new Buffer(this.item.img.data).toString('base64')
    }).catch((e)=>{
      console.log(e)
    })

    axios.get(`${process.env.VUE_APP_SERVER}`)
    .then((response)=>{
      this.options=response.data
    })
    .catch((e)=>{
      console.log(e)
    })
  },

  methods: {
    optionChange(event){
      this.category=event.target.value
    },
    fileChange(event){
      this.itemImg=event.target.files[0]
    },
    update(){
      var self=this
      var formData=new FormData()
      var data={
        name:self.itemName,
        price:Number(self.itemPrice),
        category:self.category,
        img:self.itemImg
      }
      formData.append('name',data.name)
      formData.append('price',data.price)
      formData.append('category_id',data.category)
      formData.append('img',data.img)
      console.log(data)
      axios.patch(`${process.env.VUE_APP_SERVER}/item/${this.$route.query.type}`,formData)
      .then((response)=>{
        console.log(response)
        router.push({path:'/home/items'})
      })
      .catch((e)=>{
        console.log(e)
      })
    }
  },
}


</script>

<style lang="scss">
@import '../scss/item.scss';

</style>