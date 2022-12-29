<template>
    <div class="user-page">
        <h1>User Page</h1>

        <my-dialog v-model:show="dialogVisible">    
            <user-create>
                @create="createUser"
            </user-create>
        </my-dialog>

        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th @click="SortByUserName">UserName</th>
                    <th @click="SortBySurName">SurName</th>
                    <th @click="SortByEmail">Email</th>
                    <th @click="SortByPhoneNumber">PhoneNumber</th>
                </tr>
                
                <tr class="table-user-row">
                    <th class="row">{{this.userName}}</th>
                    <td class="row">{{this.surName}}</td>
                    <td class="row">{{this.email}}</td>
                    <td class="row">{{this.phoneNumber}}</td>  
                </tr>
            </table>
        </div>   
    </div> <br> <br> <br>
        <div class="user-profile">
        <h1>Users Event</h1>
        
        <my-button
            @click="showDialog"
        >
            CreateEvent
        </my-button>
        
        <my-dialog v-model:show="dialogVisible">    
            <profile-create></profile-create>
        </my-dialog>

        <profile-user-index></profile-user-index>

    </div>
</template>

<script>
import axios from 'axios'
import UserCreate from '@/components/UserCreate.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import ProfileIndex from '@/components/ProfileIndex.vue'
import ProfileCreate from '@/components/ProfileCreate.vue'

export default {
    name: 'user-page',
    components: {
        UserCreate,
        MyDialog,
        MyButton,
        ProfileIndex,
        ProfileCreate
    },
    data() {
        return {
            userOne: [],
            userName: '',
            surName: '',
            email: '',
            phoneNumber: '',  
            Profiles: [],
            dialogVisible: false,
            userName: '',
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            _id: this.$route.params._id
        }
    },
    methods: {
        //From server
        getUsers(_id) {
            axios.get(`http://localhost:3000/users/${this.$route.params._id}`)
            .then(response => {
                this.userOne = response.data;
                this.userName = response.data.userName;
                this.surName = response.data.surName;
                this.email = response.data.email;
                this.phoneNumber = response.data.phoneNumber;
                // console.log(this.userName);

            })
        },
        //From server
        getProfiles(_id) {
            axios.get(`http://localhost:3000/profiles/${this.$route.params._id}`)
            .then(response => {
                console.log(this.id);

            })
        },
        userClick() {
            console.log($route)        
        },
        showDialog() {
            this.dialogVisible = true
        }
    },
    mounted() {
        this.getUsers(),
        this.getProfiles()
    }
}
</script>

<style>
h1 {
    text-align: center;
    color: rgb(0, 112, 112);
}
</style>

