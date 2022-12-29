<template>
    <div class="users-page">
        <h1>Users Page</h1>
       
        <my-button
            @click="showDialog"
        >
            CreateUser
        </my-button>

        <my-dialog v-model:show="dialogVisible">    
            <user-create>
                @create="createUser"
            </user-create>
        </my-dialog>
        
        <user-index></user-index>
    
    </div>
</template>

<script>
import UserCreate from '@/components/UserCreate.vue'
import UserIndex from '@/components/UserIndex.vue'
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'

export default {
    name: 'users-page',
    components: {
        UserCreate,
        UserIndex,
        MyDialog,
        MyButton
    },
    data() {
        return {
            users: [],
            dialogVisible: false,
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

