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
                           
                        <tr :class="this.isEdit(profile._id) ? '' : classStr">
                            <transition-group name="profile-index">
                                <th class="row">{{profile._id}}</th>
                                <td class="row"><input v-model="profile.userName" type="text" disabled></td>
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
import ProfileCreate from '@/components/ProfileCreate.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

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
    methods: {
        ...mapActions({
            pageClick: 'profile/pageClick',
            SortByUserName: 'profile/SortByUserName',
            SortByTitle: 'profile/SortByTitle',
            SortByDescription: 'profile/SortByDescription',
            SortByStartDate: 'profile/SortByStartDate',
            SortByEndDate: 'profile/SortByEndDate',
            getProfiles: 'profile/getProfiles',
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
            classStr: state => state.profile.classStr,

        }),
        ...mapGetters({
            profiles: 'profile/getPrifiles',
            page: 'profile/getPage',
            pageTotal: 'profile/getPageTotal',
            getProfileId: 'prifile/getEditProfileId'
        }),
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