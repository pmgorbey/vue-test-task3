<template>
    <div class="users-page-store">
        <h1>Users Store</h1>
        <my-button
            @click="showDialog"
        >
            CreateUser
        </my-button>

        <my-dialog v-model:show="dialogVisible" >    
            <user-create-store v-model="dialogVisible">
                @click="createUser"
                @click="closeDialog"
            </user-create-store>
        </my-dialog>
        
        <user-index-store></user-index-store>
    
    </div>
</template>

<script>
import UserCreateStore from '@/components/UserCreateStore.vue'
import UserIndexStore from '@/components/UserIndexStore.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'

export default {
    name: 'users-page-store',
    components: {
        UserCreateStore,
        UserIndexStore,
        MyDialog,
        MyButton
    },
    data() {
        return {
            users: [],
            dialogVisible: false,
            str: 'Hello Petro'
        }
    },
    methods: {
        showDialog() {
            this.dialogVisible = true
        }
    }
}
</script>

<style>
h1 {
    text-align: center;
    color: rgb(0, 112, 112);
}
</style>


