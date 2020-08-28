<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        <router-link class="second" to="/home/items" >
        /items
        </router-link>
        </span>
    </div>


    <div class="big">Add Item</div>

    <div class="addWear" v-if="options">
      <div class="text">
        <p>In Here You can add A new Item for your store.
            Just:
            -put a name. <br>
            -set a price. <br>
            -choose a category <br>
            .and upload an nice good looking image, 
            <br>
            That's it! you have a very new item!
        </p>
      </div>
      
      <div class="update">
          <p>Item Name:</p>
          <input class="inputUpdate" type="text" v-model="itemName">
          <br><br>
          <p>Item Price:</p>
          <input class="inputUpdate" type="text" v-model="itemPrice">
          <br><br>
          <p>Category:</p>
          <select class="form-control" id="sel1" v-model="category" @change="optionChange" >
              <option v-for="(option,index) in options" :key="index" >{{option.name}}</option>
            </select>
          <br><br>
          <p>Item Img:</p>
          <input id="file" type="file" @change="fileChange" accept="image/png, image/jpeg">      
      
      </div>
        <button class="addOneWear" @click="update()">Add New One</button>
    </div>

    <Spinner v-else />

  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'
export default {
 data() {
    return {
      title:this.$route.query.type,
      file:null,
      itemImg:null,
      itemName:null,
      itemPrice:null,
      options:null,
      category:null
    } 
  },
  beforeMount() {
    
  },

  created() {
    if(!this.$store.getters.isAuth){
       this.$router.push({path:'/login'}).catch(() => {})
   }
    axios.get(`${process.env.VUE_APP_SERVER}/wear`)
    .then((response)=>{
      this.options=response.data
    })
    .catch((e)=>{
      console.log(e)
    })
  },

  methods: {
    optionChange(event){
      console.log(this.category)
      this.category=event.target.value
    },
    fileChange(event){
      console.log(event.target.files[0])
      this.itemImg=event.target.files[0]
    },
    update(){
      var self=this
      var data={
        name:self.itemName,
        price:Number(self.itemPrice),
        category:self.category,
        img:self.itemImg
      }
      var formData=new FormData()
      formData.append('name',data.name)
      formData.append('price',data.price)
      formData.append('category_id',data.category)
      formData.append('img',data.img)
      axios.post(`${process.env.VUE_APP_SERVER}/item`,formData)
        .then((response)=>{
            console.log(response) 
            console.log("Worked")
            router.push({path:'/home/items'})
        }).catch((e)=>{
        console.log(formData)
        })
    }
  },
  
}
</script>

<style lang="scss">
@import '../scss/addwear.scss';
</style>