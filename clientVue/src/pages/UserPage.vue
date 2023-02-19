<template>
    <div class="user-page">
        <h1>User Page</h1>

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
            <profile-create 
                v-model="dialogVisible" 
                :user="userName"
            >
            </profile-create>
        </my-dialog>

        <profile-index
            :userFilter="userName"
        />

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
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import ProfileIndex from '@/components/ProfileIndex.vue'
import ProfileCreate from '@/components/ProfileCreate.vue'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
    name: 'user-page',
    components: {
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
            user: ''
        }
    },
    methods: {
        ...mapActions({
            messageDialog: 'profile/messageDialog'
        }),

        //From server
        getUsers(_id) {
            axios.get(`http://localhost:3000/users/${this.$route.params._id}`)
            .then(response => {
                this.userOne = response.data;
                this.userName = response.data.userName;
                this.surName = response.data.surName;
                this.email = response.data.email;
                this.phoneNumber = response.data.phoneNumber;
            })
        },
        userClick() {
            console.log($route)        
        },
        showDialog() {
            this.dialogVisible = true
        }
    },
    computed: {
        ...mapState({
            messageVisible: state => state.profile.messageVisible,
            messageText: state => state.profile.messageText
        })
    },
    mounted() {
        this.getUsers()
    }, 
}
</script>

<style>
h1 {
    text-align: center;
    color: rgb(0, 112, 112);
}
.delete__content {
    padding: 10px;
    color: red;
}
.delete__btns {
    display: flex;
    justify-content:flex-end;
    height: 40px;
    text-align: center;
    color: rgb(0, 112, 112);
}
</style>

