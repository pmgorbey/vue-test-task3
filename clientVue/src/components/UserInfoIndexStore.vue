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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    name: 'user-index-info-store',
    components: {
        MyDialog,
        MyButton
    },
    data() {
        return {

        }
    },
    methods: {
        // Paginations
        pageClick(page) {
            this.pageNumber = page;
        },
        isEdit(_id) {
            return this.editUserInfoId === _id
        },
        ...mapMutations({
            usersInfoCountPage: 'info/usersInfoCountPage',
            pageNumber: 'info/pageNumber',
            editUserInfoId: 'info/editUserInfoId',
            classStr: 'info/classStr',
            userName: 'info/userName',
            email: 'info/email',
            phoneNumber: 'info/phoneNumber',
            countEvent: 'info/countEvent',
            dateNextEvent: 'info/dateNextEvent',
            usersInfo: 'info/usersInfo',
            profiles: 'info/profiles',
        }),
        ...mapActions({
            // Sort
            SortByUserName: 'info/SortByUserName',
            SortByEmail: 'info/SortByEmail',
            SortByPhoneNumber: 'info/SortByPhoneNumber',
            SortByCountEvent: 'info/SortByCountEvent',
            SortByDateNextEvent: 'info/SortByDateNextEvent',
    
            //Request to Server
            getUsersInfo: 'info/getUsersInfo',
            getProfilesInfo: 'info/getProfilesInfo',
        })
    },
    computed: {
        ...mapState({
            usersInfoCountPage: state => state.info.usersInfoCountPage,
            pageNumber: state => state.info.pageNumber,
            editUserInfoId: state => state.info.editUserInfoId,
            classStr: state => state.info.classStr,
            _id: state => state.info._id,
            userName: state => state.info.userName,
            email: state => state.info.email,
            phoneNumber: state => state.info.phoneNumber,
            countEvent: state => state.info.countEvent,
            dateNextEvent: state => state.info.dateNextEvent,
            usersInfo: state => state.info.usersInfo,
            profiles: state => state.info.profiles
        }),
        ...mapGetters({
            pages: 'info/pages',
            paginatedUsers: 'info/paginatedUsers',
            countEvent: 'info/countEvent',
            dateNextEvent: 'info/dateNextEvent'            
        })
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