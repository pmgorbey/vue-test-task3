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
            
            <!-- Pagination -->
            <div class="my-table-pagination">
                <div class="page"
                    v-for="pageCurrent in pageTotalInfo"
                    :key="pageCurrent"
                    :class="{'page__selected' : pageInfo === pageCurrent}"
                    @click="pageClick(pageCurrent)"
                >
                    {{ pageCurrent }}
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    name: 'user-index-info-store',
    components: {
        MyDialog,
        MyButton
    },
    // Sorting on Server
    props: {
        selectedSort: {
            type: String
        }
    },
    methods: {
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
            // Pagination
            pageClick: 'info/pageClick'
        })
    },
    computed: {
        ...mapState({
            editUserInfoId: state => state.info.editUserInfoId,
            classStr: state => state.info.classStr,
            _id: state => state.info._id,
            userName: state => state.info.userName,
            email: state => state.info.email,
            phoneNumber: state => state.info.phoneNumber,
            countEvent: state => state.info.countEvent,
            dateNextEvent: state => state.info.dateNextEvent,
            usersInfo: state => state.info.usersInfo,
            profiles: state => state.info.profiles,
            // Pagination
            pageInfo: state => state.info.pageInfo,
            pageTotalInfo: state => state.info.pageTotalInfo
        }),
        ...mapGetters({
            countEvent: 'info/countEvent',
            dateNextEvent: 'info/dateNextEvent'            
        })
    },
    mounted() {
        this.getUsersInfo()
        this.getProfilesInfo()
        
    },
    watch: {
        pageInfo() {
            this.getUsersInfo()
        },
        selectedSort() {
            this.getUsersInfo(this.selectedSort)
        }
    }
}
</script>

<style>
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
<style src="@/assets/style/page.css"></style>
<style src="@/assets/style/index.css"></style>