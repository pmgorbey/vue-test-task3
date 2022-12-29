<template>
    <div class="profile-create">
        <form @submit.prevent>
            <h4>Create Event</h4>
            <my-input
                v-focus
                v-model="userName"
                type="text" 
                placeholder="UserName"
            />
            <my-input 
                v-model="title"
                type="text" 
                placeholder="Title"
            />

            <my-input 
                v-model="description"
                type="text" 
                placeholder="Description"
            />
            <my-input 
                v-model="startDate"
                type="date" 
                placeholder="StartDate"
            />
            <my-input 
                v-model="endDate"
                type="date" 
                placeholder="EndDate"
            />
            <my-button 
                @click="createProfile"
            >
                Create
            </my-button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import MyInput from '@/components/UI/MyInput.vue';

export default {
    name: 'profile-create',
    components: {
        MyInput
    },
    data() {
        return {
            userName: '',
            title: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    },
    methods: {
        createProfile() {
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

                this.dialogVisible = false
            })
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
</style>