<template>
  <div>
      <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        <router-link class="second" to="/home/Wears" >
        /wears
        </router-link>
        </span>
    </div>


    <div class="big">Add Wear</div>

    <div class="addWear">
      <div class="text">
        <p>In Here You can add A new Wear category for your store.
            Just put the Name and upload an nice good looking image, 

            and that's it! you have a very new category!
        </p>
      </div>
      
      <div class="update">
          <p>Wear Name</p>
          <input type="text" v-model="nameWear">
          <br><br>
          <p>Wear Img</p>
          <input id="file" type="file" @change="fileChange" accept="image/png, image/jpeg">      
      </div>
    </div>

    <button class="addOneWear" @click="update()">Add New One</button>
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
      imgWear:null,
      nameWear:null
    } 
  },
  beforeMount() {
    
  },

  created() {
    if(!this.$store.getters.isAuth){
       this.$router.push({path:'/login'}).catch(() => {})
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
      axios.post(`${process.env.VUE_APP_SERVER}/wear`,formData)
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
@import '../scss/addwear.scss';
</style>