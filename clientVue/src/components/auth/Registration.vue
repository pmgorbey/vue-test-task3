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
            passwordConfirm: '',
            // Error message
            messageVisible: false,
            messageText: ''
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
                    // (`Form successfully submitted ... `);    
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
                    // (`Form failed validation ... `); 
                    if (this.v$.firstName.$errors[0] || this.v$.lastName.$errors[0] || this.v$.email.$errors[0] || this.v$.password.$errors[0] || this.v$.passwordConfirm.$errors[0]) {
                       this.messageText = `Form failed validation, please enter correct data`
                       this.messageVisible = true
                    }  
                }
            } catch(err) {
              console.log(err);
            }
        },
        // Error message
        messageDialog() {
            this.messageVisible = false;
        }
    }
}
</script>

<style scoped src="@/assets/style/register.css">
</style>