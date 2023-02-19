<template>
    <div class="wrapper">
        <form @submit.prevent="handleSubmit" class="box"> 

            <MyError v-if="error" :error="error" />

            <h1>Login</h1>
            <input v-focus type="email" v-model="email" name="email" placeholder="Email">
            <input type="password" v-model="password" name="password" placeholder="Password">
            <input @click="userLogin" type="submit" value="Login">
        </form>

        <!-- Message -->
        <my-dialog v-model:show="messageVisible" class="dialog__error">    
            <div class="delete__content">
                <h3>{{messageText}}</h3>
            </div>
            <div class="delete__btns">
                <my-button @click="messageDialog">Close</my-button>
            </div>
        </my-dialog>

    </div>
</template>

<script>
import axios from 'axios'
import MyInput from '@/components/UI/MyInput.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyError from '@/components/UI/MyError.vue'

export default {
    name: 'login',
    components: { 
        MyInput,
        MyDialog,
        MyError 
    },
    data() {
      return {
        email: '',
        password: '',
        error: '',
        // Error message
        messageVisible: false,
        messageText: ''
      }
    },
    methods: {
      async handleSubmit() {
        try{
          const response = await axios.post('login', {
                email: this.email,
                password: this.password
            })   

          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('auth/user', response.data.user);
          this.$router.push('/');
        } catch(err) {
          this.error = 'Invalid UserName or Password ...';
          if (err) {
              this.messageText = `Form failed validation, please enter correct data`
              this.messageVisible = true
          }  
        }   
      },
      // Error message
      messageDialog() {
          this.messageVisible = false;
      }
    }
}
</script>

<style scoped src="@/assets/style/login.css">
</style>
