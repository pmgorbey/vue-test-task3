<template>
    <div class="user-info-store">
        <h1>Users Info Store</h1>
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
        <user-info-index-store
            v-model:selectedSort="selectedSort"
        >
        </user-info-index-store>
        
    </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import UserInfoIndexStore from '@/components/UserInfoIndexStore.vue' 

export default {
    name: 'user-info-store',
    components: {
        MyDialog,
        MyButton,
        MySelect,
        UserInfoIndexStore
    },
    data() {
        return {
            dialogVisible: false,
            selectedSort: '',
            sortOptions: [
                {value: 'userName', name: 'By UserName'},
                {value: 'email', name: 'By Email'},
                {value: 'phoneNumber', name: 'By PhoneNumber'}
            ]
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
.users__btns {
    display: flex;
    justify-content:flex-end;
    /* justify-content: space-between; */
    height: 40px;
    text-align: center;
    color: rgb(0, 112, 112);
}
</style>