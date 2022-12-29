<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div class="profile-index">
        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th @click="SortByUserName">UserName<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByTitle">Title<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByDescription">Description<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByStartDate">StartDate<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByEndDate">EndDate<i class="material-symbols-outlined">sort</i></th>
                    <th>Action</th>
                </tr>
                
                <template v-for="profile in profiles" :key="profile._id">
                    <tr class="table-user-row">
                        <transition-group name="profile-index">
                                <th class="row">{{profile.userName}}</th>
                                <td class="row">{{profile.title}}</td>
                                <td class="row">{{profile.description}}</td>
                                <td class="row">{{profile.startDate}}</td>
                                <td class="row">{{profile.endDate}}</td>
                                <td class="row">
                                    <my-button
                                        @click.prevent="changeEditProfileId(profile._id, profile.userName, profile.title, profile.description, profile.startDate, profile.endDate)"
                                         style="margin-left: 10px"
                                    >
                                        Edit
                                    </my-button>
                                    <my-button
                                        @click.prevent="deleteProfileId(profile._id)"
                                         style="margin-left: 10px"
                                    >
                                        Delete
                                    </my-button>
                                </td>     
                        </transition-group>                       
                           
                        <tr :class="this.isEdit(profile._id) ? '' : classStr">
                            <transition-group name="profile-index">
                                <th class="row">{{profile._id}}</th>
                                <td class="row"><input v-model="userName" type="text"></td>
                                <td class="row"><input v-model="title" type="text"></td>
                                <td class="row"><input v-model="description" type="text"></td>
                                <td class="row"><input v-model="startDate" type="date"></td>
                                <td class="row"><input v-model="endDate" type="date"></td>
                                <td class="row">
                                    <my-button
                                        @click.prevent="updateProfile(profile._id)"
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
import ProfileCreate from '@/components/ProfileCreate.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'

export default {
    name: 'profile-index',
    components: {
        ProfileCreate,
        MyDialog,
        MyButton
    },
    data() {
        return {
            profilesCountPage: 20,
            pageNumber: 1,
            profiles: [],
            editProfileId: null,
            classStr: 'classNone',
            _id: '',
            userName: '',
            title: '',
            description: '',
            startDate: '',
            endDate: ''
        }
    },
    methods: {
        // Paginations
        pageClick(page) {
            this.pageNumber = page;
        },
        // Sort
        SortByUserName() {
            this.profiles.sort((a, b) => a.userName.localeCompare(b.userName));
        },
        SortByTitle() {
            this.profiles.sort((a, b) => a.title.localeCompare(b.title));
        },
        SortByDescription() {
            this.profiles.sort((a, b) => a.description.localeCompare(b.description));
        },
        SortByStartDate() {
            this.profiles.sort((a, b) => a.startDate.localeCompare(b.startDate));
        },
        SortByEndDate() {
            this.profiles.sort((a, b) => a.endDate.localeCompare(b.endDate));
        },

        //Request to Server
        getProfiles() {
            axios.get(`http://localhost:3000/profiles`)
            .then(response => {
                this.profiles = response.data;
            })
        },
        updateProfile(_id) {
            this.editProfileId = null;

            axios.put(`http://localhost:3000/profiles/${_id}`, {
                userName: this.userName,
                title: this.title,
                description: this.description,
                startDate: this.startDate,
                endDate: this.endDate
            })
            .then(response => {
                this.getProfiles()
            })
        },
        deleteProfileId(_id) {
            axios.delete(`http://localhost:3000/profiles/${_id}`)
            .then(response => {
                this.getProfiles()
            })
        },
        changeEditProfileId(_id, userName, title, description, startDate, endDate) {
            this.editProfileId = _id;

            this.userName = userName,
            this.title = title,
            this.description = description,
            this.startDate = startDate,    
            this.endDate = endDate
        },

        isEdit(_id) {
            return this.editProfileId === _id
        }
    },
    computed: {
        // Paginations 
        pages() {  
            return Math.ceil(this.profiles.length / 20);
        },
        // Count users on page
        paginatedProfiles() {
            let from = (this.pageNumber-1) * this.profilesCountPage;
            let to = from + this.profilesCountPage;
            return this.profiles.slice(from, to);
        }
    },
    mounted() {
        this.getProfiles()
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
.profile-index-item {
  display: inline-block;
  margin-right: 10px;
}
.profile-index-enter-active,
.profile-index-leave-active {
  transition: all 0.3s ease;
}
.profile-index-enter-from,
.profile-index-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animation move */
.profile-index-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
</style>