<template>
    <div class="user-profile">
        <h1>Users Profile</h1>
        <div class="users__btns">
            <!-- Create Event -->
            <!-- <my-button
                @click="showDialog"
            >
                CreateEvent
            </my-button> -->
            <!-- Sorting on the server -->
            <MySelect 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        
        <my-dialog v-model:show="dialogVisible">    
            <profile-create-all v-model="dialogVisible"></profile-create-all>
        </my-dialog>

        <profile-index-all
            v-model:selectedSort="selectedSort"
        ></profile-index-all>

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
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import ProfileCreateAll from '@/components/ProfileCreateAll.vue'
import ProfileIndexAll from '@/components/ProfileIndexAll.vue'
import {mapActions, mapGetters, mapState} from 'vuex'


export default {
    name: 'user-profile',
    components: {
        MyDialog,
        MyButton,
        MySelect,
        ProfileCreateAll,
        ProfileIndexAll
    },
    data() {
        return {
            profiles: [],
            dialogVisible: false,
            selectedSort: '',
            sortOptions: [
                {value: 'userName', name: 'By UserName'},
                {value: 'title', name: 'By Title'},
                {value: 'descrption', name: 'By Description'},
                {value: 'startDate', name: 'By StartDate'},
                {value: 'endDate', name: 'By EndDate'}
            ]
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        },
        ...mapActions({
            messageDialog: 'profile/messageDialog'
        })
    },
    computed: {
        ...mapState({
            messageVisible: state => state.profile.messageVisible,
            messageText: state => state.profile.messageText
        })
    }
}
</script>

<style>
h1 {
    text-align: center;
    color: rgb(0, 112, 112);
}
.users__btns {
    display: flex;
    justify-content:flex-end;
    /* justify-content: space-between; */
    height: 40px;
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