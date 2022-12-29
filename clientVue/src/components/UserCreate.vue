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
            @click="createUser"

        >
            Create
        </my-button>
    </form>
    
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue';
import axios from 'axios';

export default {
    name: 'user-create',
    components: { 
        MyInput 
    },
    data() {
        return {
            userName: '',
            age: '',
            email: '',
            phoneNumber: ''
        }
    },
    methods: {
        createUser() {
            axios.post('http://localhost:3000/users', {
                userName: this.userName,
                surName: this.surName,
                email: this.email,
                phoneNumber: this.phoneNumber,
            })
            .then(response => {
                this.userName = '',
                this.surName = '',
                this.email = '',
                this.phoneNumber = ''
                this.dialogVisible = false
            })
        }
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>