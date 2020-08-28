<template>
  <div class="login">

    <div class="title">
        <span class="first">
        <router-link to="/" style="color: rgb(206, 138, 138);">
        Home
        </router-link>
        </span>
        <span class="second">
          / {{title}}
        </span>
    </div>

  <div style="text-align:center;">
    <h1>Thank For Buying! </h1>
    <router-link to="/" style="color: rgb(206, 138, 138);">
        <h3>Return Home</h3>
      </router-link>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title:this.$route.name
    } 
  },
  mounted() {
    console.log(this.title)
  },
}
</script>

<style lang="scss">
@import "../../scss/login.scss";

</style>