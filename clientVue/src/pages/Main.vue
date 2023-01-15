<template>
<div class="wrapper">
  <div class="wrapper__back">
    <h3 v-if="user"> Hi, {{user.email}}</h3>
    <h3 v-if="!user">You are not logged in ... </h3>
  </div> 
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  }
}
</script>

<style scoped>
.wrapper {
    background: rgb(200, 201, 201);
    box-shadow: 3px 3px rgb(107, 106, 106), -0.5em 0 .4em rgb(107, 107, 107);
}

.wrapper__back {
    min-height: calc(100px);
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    border: 0;
    display: block;
    margin: 0px auto;
    text-align: center;
    padding: 14px 10px;
    width: 550px;
    border-radius: 10px; 
}

a:hover, a:link, a:visited, a:active {
  text-decoration:none;
  text-transform: uppercase;
  color:rgb(209, 207, 207);
  font-size: 30px;
} 

h1, h3 {
  font-weight: bold;
  color: rgb(1, 87, 87);
  font-size: 24px;
  margin: 25px;
} 
</style>