<template>
    <div class="user-profile">
        <h1>Users Profile</h1>
        
        <my-button
            @click="showDialog"
        >
            CreateEvent
        </my-button>
        
        <my-dialog v-model:show="dialogVisible">    
            <profile-create></profile-create>
        </my-dialog>

        <profile-index></profile-index>

    </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import ProfileCreate from '@/components/ProfileCreate.vue'
import ProfileIndex from '@/components/ProfileIndex.vue'

export default {
    name: 'user-profile',
    components: {
        MyDialog,
        MyButton,
        ProfileCreate,
        ProfileIndex
    },
    data() {
        return {
            profiles: [],
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