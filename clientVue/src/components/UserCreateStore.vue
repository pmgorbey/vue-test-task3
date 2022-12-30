<template>
    <div class="user-create-store">
        <form @submit.prevent>
        <h4>Create User</h4>
        <my-input
            v-focus
            v-model="userName"
            type="text" 
            placeholder="Name"
        />
        <my-input 
            v-model="surName"
            type="text" 
            placeholder="SurName"
        />
        <my-input 
            v-model="email"
            type="email" 
            placeholder="Email"
        />
        <my-input 
            v-model="phoneNumber"
            type="tel" 
            placeholder="PhoneNumber"
        />
        <my-button 
            @click="multiple"
        >
            Create
        </my-button>
    </form>
    </div>
</template>

<script>
import MyInput from '@/components/UI/MyInput.vue';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
    name: 'user-create-store',
    components: { 
        MyInput 
    },
    props: {
        modelValue: {
            type: Boolean
        }
    },
    data() {
        return {
      
        }
    },
    methods: {
         multiple() {
            this.createUser();
            this.closeDialog();
        },
        closeDialog() {
            this.$emit('update:modelValue', false)
        },
        ...mapMutations({
            setUserName: 'users/setUserName',
            setSurName: 'users/setSurName',
            setEmail: 'users/setEmail',
            setPhoneNumber: 'users/setPhoneNumber' 
        }),
        ...mapActions({
            createUser: 'users/createUser'
        })
    }, 
    computed: {
        ...mapState({
            userName: state => state.users.userName,
            surName: state => state.users.surName,
            email: state => state.users.email,
            phoneNumber: state => state.users.phoneNumber
        })
    }
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>