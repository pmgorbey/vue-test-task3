<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div class="user-index-store">
        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th @click="SortByUserName">UserName<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortBySurName">SurName<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByEmail">Email<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByPhoneNumber">PhoneNumber<i class="material-symbols-outlined">sort</i></th>
                    <th>Action</th>
                </tr>
                
                <template v-for="user in users" :key="user._id">
                    <tr class="table-user-row">
                        <transition-group name="user-index-store">
                                <!-- <th class="row" @click="$router.push(`user`)">{{user.userName}}</th> -->
                                <!-- UserOne -->
                                <th class="row" @click="$router.push(`/users/${user._id}`), userClick">{{user.userName}}</th>
                                <td class="row">{{user.surName}}</td>
                                <td class="row">{{user.email}}</td>
                                <td class="row">{{user.phoneNumber}}</td>
                                <td class="row">
                                    <my-button
                                        @click.prevent="changeEditUserId(user._id, user.userName, user.surName, user.email, user.phoneNumber)"
                                         style="margin-left: 10px"
                                    >
                                        Edit
                                    </my-button>
                                    <my-button
                                        @click.prevent="deleteUserId(user._id)"
                                         style="margin-left: 10px"
                                    >
                                        Delete
                                    </my-button>
                                </td>     
                        </transition-group>                       
                           
                        <tr :class="this.isEdit(user._id) ? '' : classStr">
                            <transition-group name="user-index-store">
                                <th class="row">{{user._id}}</th>
                                <td class="row"><input v-model="userName" type="text"></td>
                                <td class="row"><input v-model="surName" type="text"></td>
                                <td class="row"><input v-model="email" type="text"></td>
                                <td class="row"><input v-model="phoneNumber" type="text"></td>
                                <td class="row">
                                    <my-button
                                        @click.prevent="updateUser(user._id)"
                                     >
                                        Update
                                    </my-button>
                                </td>
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
    name: 'user-index-store',
    components: {
        MyDialog,
        MyButton
    },
    data() {
        return {

        }
    },
    methods: {
        // updateUser(_id) {
        //     this.editUserId = null;

        //     axios.put(`http://localhost:3000/users/${_id}`, {
        //         userName: this.userName,
        //         surName: this.surName,
        //         email: this.email,
        //         phoneNumber: this.phoneNumber,
        //     })
        //     .then(response => {
        //         this.getUsers()
        //     })
        // },
        changeEditUserId(_id, userName, surName, email, phoneNumber) {
            this.editUserId = _id;

            this.userName = userName,
            this.surName = surName,
            this.email = email,
            this.phoneNumber = phoneNumber    
        },

        isEdit(_id) {
            return this.editUserId === _id
        },
        ...mapMutations({
            setUserCountPage: 'index/setUserCountPage',
            setPageNumber: 'index/setPageNumber',
            setUsers: 'index/setUsers',
            setEditUserId: 'index/setEditUserId',
            setClassStr: 'index/setClassStr',
            setId: 'index/setId',
            setUserName: 'index/setUserName',
            setSurName: 'index/setSurName',
            setEmail: 'index/setEmail',
            setPhoneNumber: 'index/setPhoneNumber' 
        }),
        ...mapActions({
            SortByUserName: 'index/SortByUserName',
            SortBySurName: 'index/SortBySurName',
            SortByEmail: 'index/SortByEmail',
            SortByPhoneNumber: 'index/SortByPhoneNumber',
            getUsers: 'index/getUsers', 
            updateUser: 'index/updateUser',
            deleteUserId: 'index/deleteUserId'
            // changeEditUserId: 'index/changeEditUserId',
            // isEdit: 'index/isEdit'
        })
    },
    computed: {
        ...mapState({
            usersCountPage: state => state.index.usersCountPage,
            pageNumber: state => state.index.pageNumber,
            users: state => state.index.users,
            editUserId: state => state.index.editUserId,
            classStr: state => state.index.classStr,
            _id: state => state.index._id,
            userName: state => state.index.userName,
            surName: state => state.index.surName,
            email: state => state.index.email,
            phoneNumber: state => state.index.phoneNumber
    }),
        ...mapGetters({
            pages: 'index/pages',
            paginatedUsers: 'index/paginatedUsers'
        })
    },
    mounted() {
        this.getUsers();
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
.user-index-store-item {
  display: inline-block;
  margin-right: 10px;
}
.user-index-store-enter-active,
.user-index-store-leave-active {
  transition: all 0.3s ease;
}
.user-index-store-enter-from,
.user-index-store-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animation move */
.user-index-store-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
</style>