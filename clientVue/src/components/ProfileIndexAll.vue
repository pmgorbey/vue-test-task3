<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div class="profile-index-all">
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
                        <transition-group name="profile-index-all">
                                <th class="row">{{profile.userName}}</th>
                                <td class="row">{{profile.title}}</td>
                                <td class="row">{{profile.description}}</td>
                                <td class="row">{{new Date(profile.startDate).toLocaleDateString()}}</td>
                                <td class="row">{{new Date(profile.endDate).toLocaleDateString()}}</td>
                                <td class="row">
                                    <my-button
                                        @click.prevent="changeEditProfileId({
                                            _id: profile._id, 
                                            userName: profile.userName, 
                                            title: profile.title, 
                                            description: profile.description, 
                                            startDate: profile.startDate, 
                                            endDate: profile.endDate
                                        })"
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
                           
                        <tr :class="isEdit(profile._id) ? '' : classStr">
                            <transition-group name="profile-index-all">
                                <th class="row">{{profile._id}}</th>
                                <td class="row"><input v-model="profile.userName" type="text" :style="{'font-weight': 700, color: 'teal'}" disabled></td>
                                <td class="row"><input v-model="profile.title" type="text"></td>
                                <td class="row"><input v-model="profile.description" type="text"></td>
                                <td class="row"><input v-model="profile.startDate" type="date"></td>
                                <td class="row"><input v-model="profile.endDate" type="date"></td>
                                <td class="row">
                                    <my-button
                                        @click.prevent="updateProfile({
                                            _id: profile._id, 
                                            userName: profile.userName, 
                                            title: profile.title, 
                                            description: profile.description, 
                                            startDate: profile.startDate, 
                                            endDate: profile.endDate
                                        })"
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
import ProfileCreate from '@/components/ProfileCreate.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    name: 'profile-index-all',
    components: {
        ProfileCreate,
        MyDialog,
        MyButton
    },
    props: {
        userFilter: {
            type: String
        },
        // Sorting on Server
        selectedSort: {
            type: String
        }
    },
    methods: {
        ...mapActions({
            pageClick: 'profile/pageClick',
            SortByUserName: 'profile/SortByUserName',
            SortByTitle: 'profile/SortByTitle',
            SortByDescription: 'profile/SortByDescription',
            SortByStartDate: 'profile/SortByStartDate',
            SortByEndDate: 'profile/SortByEndDate',
            getProfilesAll: 'profile/getProfilesAll',
            deleteProfileId: 'profile/deleteProfileId',
            changeEditProfileId: 'profile/changeEditProfileId',
            isEdit: 'profile/isEdit',
            updateProfile: 'profile/updateProfile',
            messageDialog: 'profile/messageDialog'
        }),
        isEdit(_id) {
            return this.editProfileId === _id
        }
    },
    computed: {
        ...mapState({
            profiles: state => state.profile.profiles,
            page: state => state.profile.page,
            pageTotal: state => state.profile.pageTotal,
            editProfileId: state => state.profile.editProfileId,
            classStr: state => state.profile.classStr
        }),
        ...mapGetters({
            profiles: 'profile/getPrifiles',
            page: 'profile/getPage',
            pageTotal: 'profile/getPageTotal',
            getProfileId: 'profile/getEditProfileId'
        })
    },
    mounted() {
        this.getProfilesAll()
    },
    watch: {
        page() {
            this.getProfilesAll()
        },
        selectedSort() {
            this.getProfilesAll(this.selectedSort)
        }
    }
}
</script>

<style scoped>
/* Animation add and delete */
.profile-index-all-item {
  display: inline-block;
  margin-right: 10px;
}
.profile-index-all-enter-active,
.profile-index-all-leave-active {
  transition: all 0.3s ease;
}
.profile-index-all-enter-from,
.profile-index-all-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Animation move */
.profile-index-all-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
</style>
<style src="@/assets/style/page.css"></style>
<style src="@/assets/style/index.css"></style>