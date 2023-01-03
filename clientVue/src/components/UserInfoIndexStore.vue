<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div class="user-index-info-store">
        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th @click="SortByUserName">UserName<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByEmail">Email<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByPhoneNumber">PhoneNumber<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByCountEvent">CountEvent<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByDateNextEvent">DateNextEvent<i class="material-symbols-outlined">sort</i></th>
                </tr>
                
                <template v-for="userInfo in usersInfo" :key="userInfo._id">
                    <tr class="table-user-row">
                        <transition-group name="user-index-info-store">
                                <th class="row">{{userInfo.userName}}</th>
                                <td class="row">{{userInfo.email}}</td>
                                <td class="row">{{userInfo.phoneNumber}}</td>
                                <td class="row">{{userInfo.countEvent}}</td>
                                <td class="row">{{userInfo.dateNextEvent}}</td>     
                        </transition-group>                       
                           
                        <!-- <tr :class="this.isEdit(userInfo._id) ? '' : classStr"> -->
                        <tr :class="this.isEdit(userInfo._id) ? '' : classStr">
                            <transition-group name="user-index-info-store">
                                <th class="row">{{userInfo._id}}</th>
                                <td class="row"><input v-model="userName" type="text"></td>
                                <td class="row"><input v-model="email" type="text"></td>
                                <td class="row"><input v-model="phoneNumber" type="text"></td>
                                <td class="row"><input v-model="countEvent" type="text"></td>
                                <td class="row"><input v-model="dateNextEvent" type="text"></td>
                            </transition-group>
                        </tr>
                        
                    </tr>
                </template>
            </table>
            
            <!-- Paginations -->
            <div class="my-table-pagination">
                <div class="page"
                    v-for="page in pages"
                    :key="page"
                    :class="{'page__selected' : page === pageNumber}"
                    @click="pageClick(page)"
                >
                    {{ page }}
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import axios from 'axios'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'

export default {
    name: 'user-index-info-store',
    components: {
        MyDialog,
        MyButton
    },
    data() {
        return {
            usersInfoCountPage: 20,
            pageNumber: 1,
            editUserInfoId: null,
            classStr: 'classNone',
            _id: '',
            userName: '',
            email: '',
            phoneNumber: '',
            countEvent: '',
            dateNextEvent: '',
            usersInfo: [],
            profiles: []
        }
    },
    methods: {
        // Paginations
        pageClick(page) {
            this.pageNumber = page;
        },
        // Sort
        SortByUserName() {
            this.usersInfo.sort((a, b) => a.userName.localeCompare(b.userName));
        },
        SortByEmail() {
            this.usersInfo.sort((a, b) => a.email.localeCompare(b.email));
        },
        SortByPhoneNumber() {
            this.usersInfo.sort((a, b) => a.phoneNumber - b.phoneNumber);
        },
        SortByCountEvent() {
            this.usersInfo.sort((a, b) => a.countEvent - b.countEvent);
        },
        SortByDateNextEvent() {
            this.usersInfo.sort((a, b) => a.dateNextEvent.localeCompare(b.dateNextEvent));
        },

        //Request to Server
        getUsersInfo() {
            axios.get(`http://localhost:3000/users`)
            .then(response => {
                this.usersInfo = response.data;
            })
        },
        getProfilesInfo() {
            axios.get(`http://localhost:3000/profiles`)
            .then(response => {
                this.profiles = response.data;
            })
        },
        isEdit(_id) {
            return this.editUserInfoId === _id
        }
    },
    computed: {
        // Paginations 
        pages() {
            return Math.ceil(this.usersInfo.length / 20);
        },
        // Count users on page  
        paginatedUsersInfo() {
            let from = (this.pageNumber-1) * this.usersInfoCountPage;
            let to = from + this.usersInfoCountPage;
            return this.usersInfo.slice(from, to);
        },
        countEvent() {            
            for (let i in this.usersInfo) {
                this.usersInfo[i].countEvent = 0;
                for (let j in this.profiles) {
                    if (this.usersInfo[i].userName === this.profiles[j].userName) {
                        this.usersInfo[i].countEvent++;
                    } 
                }
            }
            return this.usersInfo.countEvent
        },
        dateNextEvent() {
            const array = [];
            for (let i in this.usersInfo) {
                this.usersInfo[i].dateNextEvent = 'Not event';
                for (let j in this.profiles) {
                    if (this.usersInfo[i].userName === this.profiles[j].userName) {                      
                        let item = this.profiles[j].startDate;
                        array.push(Date.parse(item));
                        let date = new Date(item);
                        // this.usersInfo[i].dateNextEvent = Math.max.apply(null, array);
                        this.usersInfo[i].dateNextEvent = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                    } 
                }
            }
            return this.usersInfo.dateNextEvent
        }
    },
    mounted() {
        this.getUsersInfo()
        this.getProfilesInfo()
    }
}
</script>

<style>
h1 {
    text-align: center;
    color: rgb(0, 112, 112);
}
.table-user {
    max-width: 100%;
    margin: 15px auto;
    padding-top: 20px;
    border: 2px solid teal;
}
.table {
     width: 100%;
}
.my-table__header {
    display: flex;
    justify-content: space-around;
}
.my-table__header p, th {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    flex-basis: 20%;
    text-align: center;
    border-bottom: 2px solid teal;
    padding-bottom: 15px;
    cursor: pointer;
    color: rgb(0, 112, 112);
}
td {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    flex-basis: 20%;
    text-align: center;
    border-bottom: 2px solid teal;
    padding-bottom: 15px;
    cursor: pointer;
    color: rgb(0, 112, 112);
}
.my-table-pagination {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: center;
}
.page {
    padding: 7px;
    margin: 0 10px 10px 0;
    
    border-bottom: 2px solid teal;
}
.page:hover {
    background: teal;
    cursor: pointer;
    color: white;
}
.page__selected {
    background: teal;
    cursor: pointer;
    color: white;
}
.table-user-row {
    display: flex;
    justify-content: space-around;
}
.row {
    flex-basis: 20%;
    text-align: left;
    padding: 7px 15px;
    border-bottom: 1px solid teal;
    margin: 15px;
}
.user__btns {
    display: flex;
    margin: 5px;
}
/* Animation add and delete */
.user-index-info-store-item {
  display: inline-block;
  margin-right: 10px;
}
.user-index-info-store-enter-active,
.user-index-info-store-leave-active {
  transition: all 0.3s ease;
}
.user-index-info-store-enter-from,
.user-index-info-store-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animation move */
.user-index-info-store-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
</style>