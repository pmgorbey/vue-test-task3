<template>
    <div class="profile-create">
        <form @submit.prevent>
            <h4>Create Event</h4>
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
                    v-model="title"
                    type="text" 
                    placeholder="Title"
                />
                <span v-if="v$.title.$error"> 
                    {{ this.v$.title.$errors[0].$message }}
                </span>
            </div>
            
            <div class="input__validate">
                <my-input 
                    v-model="description"
                    type="text" 
                    placeholder="Description"
                />
                <span v-if="v$.description.$error"> 
                    {{ this.v$.description.$errors[0].$message }}
                </span>
            </div>
            
            <div class="input__validate">
                <my-input 
                    v-model="startDate"
                    type="date" 
                    placeholder="StartDate"
                />
                <span v-if="v$.startDate.$error"> 
                    {{ this.v$.startDate.$errors[0].$message }}
                </span>
            </div>
            
            <div class="input__validate">
                <my-input 
                    v-model="endDate"
                    type="date" 
                    placeholder="EndDate"
                />
                <span v-if="v$.endDate.$error"> 
                    {{ this.v$.endDate.$errors[0].$message }}
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
import axios from 'axios'
import MyInput from '@/components/UI/MyInput.vue';
//vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength} from '@vuelidate/validators'
import validate from '@/validate/validate.js'

export default {
    name: 'profile-create',
    components: {
        MyInput
    },
    props: {
        modelValue: {
            type: String
        }
    },
    data() {
        return {
            v$: useVuelidate(),
            userName: '',
            title: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    },
    validations() {
        return {
            userName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            title: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(12)
            },
            description: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(32)
            },
            startDate: {
                required,
                verifyStartDate: validate.verifyStartDate
            },
            endDate: {
                required,
                verifyEndDate: validate.verifyEndDate
            }        
        }
    },
    methods: {
        multiple() {
            this.createProfile()
            this.closeDialog()
        },
        createProfile() {
            this.v$.$validate();
            if (!this.v$.$error) {
                alert(`Form successfully submitted ... `);    
                axios.post('http://localhost:3000/profiles', {
                userName: this.userName,
                title: this.title,
                description: this.description,
                startDate: this.startDate,
                endDate: this.endDate
            })
            .then(response => {
                this.userName = '',
                this.title = '',
                this.description = '',
                this.startDate = ''
                this.endDate = ''
            })
                console.log(this.v$.$errors);
            }
            else {
                alert(`Form failed validation ... `);   
                // console.log(this.v$.$errors);
                // console.log(this.v$.email.$errors[0].$message)
            }
        },
        // checkForm(error) {
        //     if (this.userName && this.surName && this.email && this.phoneNumber) {
        //         return true;
        //     }

        //     this.errors = [];

        //     if (!this.userName) {
        //         this.errors.push('Enter a Name ...');
        //         alert('Enter a Name ...')
        //     }
        //     if (!this.title) {
        //         this.errors.push('Enter a Title ...');
        //         alert('Enter a Title ...')
        //     }
        //     if (!this.description) {
        //         this.errors.push('Enter a Description ...');
        //         alert('Enter a Description ...')
        //     }
        //     if (!this.startDate) {
        //         this.errors.push('Enter a Start date ...');
        //         alert('Enter a Start date ...')
        //     }
        //     if (!this.endDate) {
        //         this.errors.push('Enter a End date ...');
        //         alert('Enter a End date ...')
        //     }
        //     error.preventDefault();
        // },
        closeDialog() {
            if (this.v$.$errors.length == 0) {
                this.$emit('update:modelValue', false)
            }
        }
    }
}
</script>

<style>
form {
    display: flex;
    flex-direction: column;
}
h4 {
    text-align: left;
    color: rgb(0, 112, 112);
}
.input__validate {
  display: flex;
  flex-direction: column;
  color: teal;
}
</style>