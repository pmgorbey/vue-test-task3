<template>
    <div class="user-profile">
        <h1>Users Profile</h1>
        
        <my-button
            @click="showDialog"
        >
            CreateEvent
        </my-button>
        
        <my-dialog v-model:show="dialogVisible">    
            <profile-create-all v-model="dialogVisible"></profile-create-all>
        </my-dialog>

        <profile-index-all></profile-index-all>

    </div>
</template>

<script>
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import ProfileCreateAll from '@/components/ProfileCreate.vue'
import ProfileIndexAll from '../components/ProfileIndexAll.vue'

export default {
    name: 'user-profile',
    components: {
        MyDialog,
        MyButton,
        ProfileCreateAll,
        ProfileIndexAll
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