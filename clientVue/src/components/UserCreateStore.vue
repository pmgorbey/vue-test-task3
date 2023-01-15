<template>
    <div class="user-create-store">
        <form @submit.prevent>
            <h4>Create User</h4>
            <div class="input__validate">
                <my-input 
                    v-focus
                    v-model="userName"
                    type="text" 
                    placeholder="UserName"
                />
                <span v-if="v$.userName.$error"> 
                    {{ this.v$.userName.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <my-input 
                    v-model="surName"
                    type="text" 
                    placeholder="SurName"
                />
                <span v-if="v$.surName.$error"> 
                    {{ this.v$.surName.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <my-input 
                    v-model="email"
                    type="email" 
                    placeholder="Email"
                />
                <span v-if="v$.email.$error"> 
                    {{ this.v$.email.$errors[0].$message }}
                </span>
            </div>
            <div class="input__validate">
                <my-input 
                    v-model="phoneNumber"
                    type="tel" 
                    placeholder="PhoneNumber"
                />
                <span v-if="v$.phoneNumber.$error"> 
                    {{ this.v$.phoneNumber.$errors[0].$message }}
                </span>
            </div>
            <my-button 
                @click="multiple"
            >
                Create
            </my-button>
        </form>
    </div>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
//vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, numeric} from '@vuelidate/validators'
import validate from '@/validate/validate.js'

export default {
    name: 'user-create-store',
    components: { 
        MyInput 
    },
    props: {
        modelValue: {
            type: Boolean
        }
    },
    data() {
        return {
            v$: useVuelidate(),
            userName: '',
            surName: '',
            email: '',
            phoneNumber: ''
        }
    },
    validations() {
        return {
            userName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12),
                validateUserName: validate.validateUserName
            },
            surName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            email: {
                required,
                email
            },
            phoneNumber: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10)
            }        
        }
    },
    methods: {
         multiple() {
            // this.createUser({userName: this.userName, surName: this.surName, email: this.email, phoneNumber: this.phoneNumber});
            this.validateUser();
            this.closeDialog();
        },
        closeDialog() {
            if (this.v$.$errors.length == 0) {
                this.$emit('update:modelValue', false)
            }
        },
        validateUser() {
            this.v$.$validate();
            if (!this.v$.$error) {
                alert(`Form successfully submitted ... `);    
                this.createUser({userName: this.userName, surName: this.surName, email: this.email, phoneNumber: this.phoneNumber});
                // console.log(this.v$.$errors);
            }
            else {
                alert(`Form failed validation ... `);   
                // console.log(this.v$.$errors);
                // console.log(this.v$.email.$errors[0].$message)
            }
        },
        ...mapMutations({
            setUserName: 'index/setUserName',
            setSurName: 'index/setSurName',
            setEmail: 'index/setEmail',
            setPhoneNumber: 'index/setPhoneNumber' 
        }),
        ...mapActions({
            createUser: 'index/createUser'
        })
    }, 
    computed: {
        ...mapState({
            userName: state => state.index.userName,
            surName: state => state.index.surName,
            email: state => state.index.email,
            phoneNumber: state => state.index.phoneNumber
        }),
        ...mapGetters({
            users: 'index/users'
        })
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
.input__validate {
  display: flex;
  flex-direction: column;
  color: teal;
}
</style>