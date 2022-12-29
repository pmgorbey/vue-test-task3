<template>
<div class="wrapper">
    <div class="wrapper__back">
      <ul>
        <h1>MEVN</h1>
        <li><a href="/login">Login</a></li>
        <br>  
        <li><a href="/registration">Registration</a></li>
      </ul>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrapper {
    background: rgb(200, 201, 201);
    box-shadow: 3px 3px rgb(107, 106, 106), -0.5em 0 .4em rgb(107, 107, 107);
}

.wrapper__back {
    min-height: calc(100vh - 110px);
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    background: teal;
    color:  teal; 
    border: 0;
    display: block;
    margin: 0px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 14px 10px;
    width: 550px;
    border-radius: 10px; 
}

a:hover, a:link, a:visited, a:active {
  text-decoration:none;
  text-transform: uppercase;
  /* font-weight:bold; */
  color:rgb(209, 207, 207);
  font-size: 30px;
} 

h1 {
  font-weight: bold;
  color: rgb(1, 87, 87);
  font-size: 44px;
  margin: 25px;
} 
</style>