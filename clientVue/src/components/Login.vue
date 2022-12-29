<template>
    <div class="wrapper">
        <form @submit.prevent class="box" action="http://localhost:3000/login" method="post"> 
            <h1>Login</h1>
            <input type="text" name="name" placeholder="Username">
            <input type="password" name="password" placeholder="Password">
            <input @click="userLogin" type="submit" value="Login">
        </form>
    </div>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue';
import MyDialog from '@/components/UI/MyDialog.vue';

export default {
    name: 'login',
    components: { 
        MyInput,
        MyDialog 
    },
    data() {
      return {
        
      }
    },
    methods: {
      async userLogin() {
          await this.request('http://localhost:3000/login', 'POST', user)
            // this.users.push(newUser);
            // this.dialogVisible = false
      },
      // From backend
      async request(url, method = 'GET', data = null) {
          try {
              const headers = {}
              let body 

              if(data) {
                  headers['Content-Type'] = 'application/json' 
                  body = JSON.stringify(data)
              }

              const response = await fetch(url, {
                  method,
                  headers,
                  body
              })
              return await response.json();
          } catch(error) {
              console.warn(error.message);
          }            
        }
    },
    // async mounted() {
    //     this.users = await this.request('http://localhost:3000/login');
    // },
}
</script>

<style scoped>
.wrapper {
    min-height: calc(100vh - 100px);
    font-family: "Montserrat", sans-serif;
    font-size: 18px;
    background: rgb(200, 201, 201);
    box-shadow: 3px 3px rgb(107, 106, 106), -0.5em 0 .4em rgb(107, 107, 107);
}

form {
    background-color: rgba(61, 61, 61, 0.4);
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

form div {
    margin-bottom: 20px;
    display: flex;
}

form div label {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-info {
  justify-content: space-between;
  gap: 20px;
}

input,
textarea {
  min-height: 30px;
  border: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 18px;
  padding: 3px 5px;
  outline: none;
}

.contacts li {
  list-style-type: circle;
  padding-left: 20px;
  list-style-position: inside;
}

.button {
  margin-top: 20px;
  color:rgb(0, 183, 255);
}

.box {
  width: 350px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: teal;
  text-align: center;
}

.box h1 {
  color: rgb(221, 220, 220);
  text-transform: uppercase;
  font-weight: 500;
}

.box input[type = "text"], .box input[type = "password"]{
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: rgb(221, 220, 220); 
  border-radius: 24px;
  transition: 0.25s;
}

.box input[type = "text"]:focus, .box input[type = "password"]:focus{
  width: 280px;
  border-color: #2ecc71;
}

.box input[type = "submit"]{
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 40;
  width: 100px;
  outline: none;
  color: rgb(221, 220, 220); 
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}

.box input[type = "submit"]:hover{
  background: #2ecc71;
}
</style>
