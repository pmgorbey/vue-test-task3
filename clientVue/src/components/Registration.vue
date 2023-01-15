<template>
    <div class="wrapper">
        <!-- <form @submit.prevent="handleSubmit" class="box" action="http://localhost:3000/register" method="post">  -->
        <form @submit.prevent="handleSubmit" class="box">

            <h1>Registration</h1>

            <div class="input__validate">
              <input v-focus type="text" v-model="firstName" name="firstName" placeholder="First Name">  
              <span v-if="v$.firstName.$error"> 
                    {{ this.v$.firstName.$errors[0].$message }}
              </span>  
            </div>

            <div class="input__validate">
              <input type="text" v-model="lastName" name="lastName" placeholder="Last Name">   
              <span v-if="v$.lastName.$error"> 
                    {{ this.v$.lastName.$errors[0].$message }}
              </span>
            </div>

            <div class="input__validate">
              <input type="email" v-model="email" name="email" placeholder="Email">   
              <span v-if="v$.email.$error"> 
                    {{ this.v$.email.$errors[0].$message }}
              </span>
            </div>

            <div class="input__validate">
              <input type="password" v-model="password" name="password" placeholder="Password">
              <span v-if="v$.password.$error"> 
                    {{ this.v$.password.$errors[0].$message }}
              </span>
            </div>

            <div class="input__validate">
              <input type="password" v-model="passwordConfirm" name="passwordConfirm" placeholder="Confirm Password">
              <span v-if="v$.passwordConfirm.$error"> 
                    {{ this.v$.passwordConfirm.$errors[0].$message }}
              </span>
            </div>

            <input type="submit" name="" value="Sign Up">

        </form>
    </div>
</template>

<script>
import axios from 'axios'
import MyInput from '@/components/UI/MyInput.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
//vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, email, sameAs} from '@vuelidate/validators'

export default {
    name: 'registration',
    components: { 
        MyInput,
        MyDialog
    },
    data() {
        return {
            v$: useVuelidate(),
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    },
    validations() {
        return {
            firstName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            lastName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(12)
            },
            passwordConfirm: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(12),
                passwordConfirm: sameAs(this.password)
            }        
        }
    },
    methods: {
        async handleSubmit() {
            try{
                this.v$.$validate();
                if (!this.v$.$error) {
                    alert(`Form successfully submitted ... `);    
                    await axios.post('register', {
                      firstName: this.firstName,
                      lastName: this.lastName,
                      email: this.email,
                      password: this. password,
                      passwordConfirm: this.passwordConfirm
                    });  
                    this.$router.push('/login');
                }
                else {
                    alert(`Form failed validation ... `);   
                }
            } catch(err) {
              console.log(err);
            }
        }
    }
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
    background-color: rgba(0, 0, 0, 0.4);
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

.box input[type = "text"], .box input[type = "email"], .box input[type = "password"]{
  border: 0;
  background: none;
  display: block;
  margin: 10px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 10px 10px;
  width: 200px;
  outline: none;
  color: rgb(221, 220, 220); 
  border-radius: 24px;
  transition: 0.25s;
}

.box input[type = "text"]:focus, .box input[type = "email"]:focus, .box input[type = "password"]:focus{
  width: 280px;
  border-color: #2ecc71;
}

.box input[type = "submit"]{
  border: 0;
  background: none;
  display: block;
  margin: 10px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 14px 40;
  width: 110px;
  outline: none;
  color: rgb(221, 220, 220); 
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}

.box input[type = "submit"]:hover{
  background: #2ecc71;
}

.input__validate {
  display: flex;
  flex-direction: column;
  color: lawngreen;
  font-size: 16px;
}
</style>