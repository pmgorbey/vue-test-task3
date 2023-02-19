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
                
                <template v-for="profile in userFilter" :key="profile._id">
                    <tr class="table-user-row">
                        <transition-group name="profile-index">
                                <th class="row">{{profile.userName}}</th>
                                <td class="row">{{profile.title}}</td>
                                <td class="row">{{profile.description}}</td>
                                <td class="row">{{new Date(profile.startDate).toLocaleDateString()}}</td>
                                <td class="row">{{new Date(profile.endDate).toLocaleDateString()}}</td>
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
                                <td class="row"><input v-model="userName" type="text" disabled></td>
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

            <!-- Pagination -->
            <div class="my-table-pagination">
                <div class="page"
                    v-for="pageCurrent in pageTotal"
                    :key="pageCurrent"
                    :class="{'page__selected' : page === pageCurrent}"
                    @click="pageClick(pageCurrent)"
                >
                    {{ pageCurrent }}                    
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
    props: {
        userFilter: {
            type: String
        }
    },
    data() {
        return {
            profiles: [],
            editProfileId: null,
            classStr: 'classNone',
            _id: '',
            userName: '',
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            //Pagination
            page: 1,
            pageTotal: 0
        }
    },
    methods: {
        // Pagination on Server
        pageClick(pageCurrent) {
            this.page = pageCurrent;
        },
        // Sort on Vue
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
            axios.get(`http://localhost:3000/profiles?page=${this.page}`)
            .then(response => {
                this.profiles = response.data.profiles;
                this.pageTotal = response.data.pageTotal;
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
            .catch((err => {
                alert(`Backend: ${err.response.data.message} \n ${err.response.data.errors}`)
            }))
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
        userFilter() {
            return this.profiles.filter((p) => {
                return p.userName == this.userFilter;
            })
        }
    },
    mounted() {
        this.getProfiles()
    },
    watch: {
        page() {
            this.getProfiles()
        }
    }
}
</script>

<style scoped>
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
<style src="@/assets/style/page.css"></style>
<style src="@/assets/style/index.css"></style>