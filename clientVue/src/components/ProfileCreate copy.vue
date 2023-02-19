<template>
    <div class="profile-create">
        <form @submit.prevent>
            <h4>Create Event</h4>
            <div class="input__validate">
                <my-input
                    v-model="userName"
                    type="text" 
                    placeholder="UserName"
                    :style="{'font-weight': 700, color: 'teal'}"
                    disabled
                />
                <!-- <span v-if="v$.userName.$error"> 
                    {{ this.v$.userName.$errors[0].$message }}
                </span> -->
            </div>
            
            <div class="input__validate">
                <my-input
                    v-focus 
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

        
        <!-- BackendMessage -->
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
        },
        messageVisible: {
            type: String
        }
    },
    data() {
        return {
            v$: useVuelidate(),
            userName: this.user,
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            // Error message
            messageVisible: false,
            messageText: ''
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
                this.messageText = `FrontEnd: Form successfully submitted ... `
                this.$emit('update:messageVisible', true) 

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
                this.messageText = `FrontEnd: Form successfully submitted ... `
                this.messageVisible = true 
            })
                console.log(this.v$.$errors);
                this.messageText = `FrontEnd: Form successfully submitted ... `
                // this.messageVisible = true
                this.$emit('update:messageVisible', true) 
                
            }
            else {
                // alert(`Form failed validation ... `);   
                // console.log(this.v$.$errors);
                // console.log(this.v$.email.$errors[0].$message)
            }
        },
        closeDialog() {
            if (this.v$.$errors.length == 0) {
                this.$emit('update:modelValue', false)
            }
        },
        // Error message
        messageDialog() {
            this.messageVisible = false
        },
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