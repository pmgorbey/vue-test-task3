<template>
    <form @submit.prevent>
        <h4>Create User</h4>
        <my-input
            v-focus
            v-model="userName"
            type="text" 
            placeholder="Name"
        />
        <my-input 
            v-model="surName"
            type="text" 
            placeholder="SurName"
        />

        <my-input 
            v-model="email"
            type="email" 
            placeholder="Email"
        />
        <my-input 
            v-model="phoneNumber"
            type="tel" 
            placeholder="PhoneNumber"
        />
        <my-button 
            @click="multiple"
        >
            Create
        </my-button>
        <!-- <my-button 
            @click="$emit('update:modelValue', false)"
        >
            Close
        </my-button> -->
    </form>
</template>

<script>
import axios from 'axios';
import {mapActions} from 'vuex'
import MyInput from '@/components/UI/MyInput.vue';

export default {
    name: 'user-create',
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
            userName: '',
            surName: '',
            email: '',
            phoneNumber: ''        
        }
    },
    methods: {
        multiple() {
            this.createUser();
            this.closeDialog();
        },
        createUser() {
            axios.post('http://localhost:3000/users', {
                userName: this.userName,
                surName: this.surName,
                email: this.email,
                phoneNumber: this.phoneNumber,
            })
            .then(response => {
                this.getUsers, 
                this.userName = '',
                this.surName = '',
                this.email = '',
                this.phoneNumber = '' 
            })
        },
        closeDialog() {
            this.$emit('update:modelValue', false)
        },
         ...mapActions({
            getUsers: 'index/getUsers',
        })
    },
    mounted() {
        this.getUsers()
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>