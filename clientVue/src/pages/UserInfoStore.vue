<template>
    <div class="user-info-store">
        <h1>Users Info Store</h1>
        <user-info-index-store></user-info-index-store>
    </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import UserInfoIndexStore from '@/components/UserInfoIndexStore.vue' 

export default {
    name: 'user-info-store',
    components: {
        MyDialog,
        MyButton,
        UserInfoIndexStore
    },
    data() {
        return {
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