<template>
    <div class="user-info">
        <h1>Users Info</h1>
        <user-info-index></user-info-index>
    </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import UserInfoIndex from '@/components/UserInfoIndex.vue' 

export default {
    name: 'user-info',
    components: {
        MyDialog,
        MyButton,
        UserInfoIndex
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