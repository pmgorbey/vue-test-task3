<template>
    <div class="users-page-store">
        <h1>Users Store</h1>
        <div class="users__btns">
            <my-button
                @click="showDialog"
            >
                CreateUser
            </my-button>
            
            <!-- Sorting on the server -->
            <MySelect 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
               
        <my-dialog v-model:show="dialogVisible" >    
            <user-create-store 
                v-model="dialogVisible"
            >
                @click="closeDialog"
                @click="validateUser"
            </user-create-store>
        </my-dialog>
      
        <!-- Users -->
        <!-- v-model="messageVisible" -->
        <user-index-store
            v-model:selectedSort="selectedSort"
            :sortAndSearchPosts='sortAndSearchPosts'
        ></user-index-store>
        
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
import UserCreateStore from '@/components/UserCreateStore.vue'
import UserIndexStore from '@/components/UserIndexStore.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
    name: 'users-page-store',
    components: {
        UserCreateStore,
        UserIndexStore,
        MyDialog,
        MyButton,
        MySelect,
        MyInput
    },
    props: {
        unpdateInput: {
            type: String
        }
    },
    data() {
        return {
            // users: [],
            dialogVisible: false,
            // Sort Backecnd
            selectedSort: '',
            sortOptions: [
                {value: 'userName', name: 'By userName'},
                {value: 'surName', name: 'By surName'},
                {value: 'email', name: 'By email'},
                {value: 'phoneNumber', name: 'By phone'}
            ]
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        },
        ...mapActions({
            messageDialog: 'index/messageDialog'
        })
    },
    computed: {
        ...mapState({
            messageVisible: state => state.index.messageVisible,
            messageText: state => state.index.messageText
        }),
        ...mapGetters({ 
            users: 'index/users'
        })
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    color: rgb(0, 112, 112);
}
.users__btns {
    display: flex;
    justify-content: space-between;
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


