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
            userName: '',
            surName: '',
            email: '',
            phoneNumber: ''
        }
    },
    methods: {
         multiple() {
            this.createUser({userName: this.userName, surName: this.surName, email: this.email, phoneNumber: this.phoneNumber});
            this.closeDialog();
        },
        closeDialog() {
            this.$emit('update:modelValue', false)
        },
        ...mapMutations({
            setUserName: 'index/setUserName',
            setSurName: 'index/setSurName',
            setEmail: 'index/setEmail',
            setPhoneNumber: 'index/setPhoneNumber' 
        }),
        ...mapActions({
            createUser: 'index/createUser'
        })
    }, 
    computed: {
        ...mapState({
            userName: state => state.index.userName,
            surName: state => state.index.surName,
            email: state => state.index.email,
            phoneNumber: state => state.index.phoneNumber
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