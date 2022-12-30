<template>
    <div class="profile-create">
        <form @submit.prevent='checkForm'>
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
            userName: '',
            title: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    },
    methods: {
        multiple() {
            this.createProfile()
            this.closeDialog()
        },
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
        },
        checkForm(error) {
            if (this.userName && this.surName && this.email && this.phoneNumber) {
                return true;
            }

            this.errors = [];

            if (!this.userName) {
                this.errors.push('Enter a Name ...');
                alert('Enter a Name ...')
            }
            if (!this.title) {
                this.errors.push('Enter a Title ...');
                alert('Enter a Title ...')
            }
            if (!this.description) {
                this.errors.push('Enter a Description ...');
                alert('Enter a Description ...')
            }
            if (!this.startDate) {
                this.errors.push('Enter a Start date ...');
                alert('Enter a Start date ...')
            }
            if (!this.endDate) {
                this.errors.push('Enter a End date ...');
                alert('Enter a End date ...')
            }
            error.preventDefault();
        },
        closeDialog() {
            this.$emit('update:modelValue', false)
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