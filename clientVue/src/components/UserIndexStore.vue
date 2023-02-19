<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div class="user-index-store">
        <div class="table-user">
            <table class="table"> 
                <tr class="my-table__header">
                    <th @click="SortByUserName">UserName<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortBySurName">SurName<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByEmail">Email<i class="material-symbols-outlined">sort</i></th>
                    <th @click="SortByPhoneNumber">PhoneNumber<i class="material-symbols-outlined">sort</i></th>
                    <th>Action</th>
                </tr>
                
                <template v-for="user in users" :key="user._id">
                    <tr class="table-user-row">
                        <transition-group name="user-index-store">
                                <!-- UserOne -->
                                <th class="row" @click="$router.push(`/users/${user._id}`), userClick">{{user.userName}}</th>
                                <td class="row">{{user.surName}}</td>
                                <td class="row">{{user.email}}</td>
                                <td class="row">{{user.phoneNumber}}</td>
                                <td class="row">
                                    <my-button
                                        @click.prevent="changeEditUserId(user._id, user.userName, user.surName, user.email, user.phoneNumber)"
                                         style="margin-left: 10px"
                                    >
                                        Edit
                                    </my-button>
                                    <my-button
                                        @click.prevent="deleteUserId({_id: user._id, userName: user.userName})"
                                         style="margin-left: 10px"
                                    >
                                        Delete
                                    </my-button>
                                </td>     
                        </transition-group>                       
                           
                        <tr :class="isEdit(user._id) ? '' : classStr" class="input__validates">
                            <transition-group name="user-index-store">
                                <th class="row">{{user._id}}</th>

                                <div class="input__validate">
                                    <td class="row"><input v-model="userName" type="text" :style="{'font-weight': 700, color: 'teal'}" disabled></td>
                                    <span v-if="v$.userName.$error && v$.userName.$errors.length"> 
                                        {{ this.v$.userName.$errors[0].$message }}
                                    </span>    
                                </div>

                                <div class="input__validate">
                                    <td class="row"><input v-model="surName" type="text"></td>
                                    <span v-if="v$.surName.$error && v$.surName.$errors.length"> 
                                        {{ this.v$.surName.$errors[0].$message }}
                                    </span>
                                </div>

                                <div class="input__validate">
                                    <td class="row"><input v-model="email" type="text"></td>
                                    <span v-if="v$.email.$error && v$.email.$errors.length"> 
                                        {{ this.v$.email.$errors[0].$message }}
                                    </span>
                                </div>
                                
                                <div class="input__validate">
                                    <td class="row"><input v-model="phoneNumber" type="text"></td>
                                    <span v-if="v$.phoneNumber.$error && v$.phoneNumber.$errors.length"> 
                                        {{ this.v$.phoneNumber.$errors[0].$message }}
                                    </span>
                                </div>
                                
                                <td class="row">
                                    <my-button
                                        @click.prevent="updateUser(user._id, user.userName, user.surName, user.email, user.phoneNumber)"
                                     >
                                        Update
                                    </my-button>
                                </td>
                            </transition-group>
                        </tr>
                        
                    </tr>
                </template>
            </table>

            <!-- Pagination -->
            <div class="my-table-pagination">
                <div class="page"
                    v-for="pageCurrent in pageTotal"
                    :key="pageCurrent"
                    :class="{'page__selected' : page === pageCurrent}"
                    @click="pageClick(pageCurrent)"
                >
                    {{ pageCurrent }}                    
                </div>
            </div>
        </div>  

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
import axios from 'axios' 
import MyDialog from '@/components/UI/MyDialog.vue'
import MyButton from '@/components/UI/MyButton.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
//vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, numeric} from '@vuelidate/validators'

export default {
    name: 'user-index-store',
    components: {
        MyDialog,
        MyButton
    },
    // Sorting on Server
    props: {
        selectedSort: {
            type: String
        },
        // modelValue: {
        //     type: Boolean
        // }
    },
    data() {
        return {
            v$: useVuelidate(),
            _id: '',
            userName: '',
            surName: '',
            email: '',
            phoneNumber: '',
            editUserId: null,
            // Error message
            messageVisible: false,
            messageText: ''
        }
    },
    validations() {
        return {
            userName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12),
                // validateUserName: validate.validateUserName               
            },
            surName: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(12)
            },
            email: {
                required,
                email
            },
            phoneNumber: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10)
            }        
        }
    },
    methods: {
        updateUser(_id) {
            this.editUserId = null;

            this.v$.$validate();
            // Vuelidate + Validate Name (!this.errorUserName == '')
            if (!this.v$.$error) {
                axios.put(`http://localhost:3000/users/${_id}`, {
                    userName: this.userName,
                    surName: this.surName,
                    email: this.email,
                    phoneNumber: this.phoneNumber,
                })
                .then(response => {
                    this.getUsers()
                    // this.$emit('update:modelValue', true)
                })
                .catch((err => {
                    // alert(`Backend: ${err.response.data.message} \n ${err.response.data.errors}`)
                    this.messageText = `Backend: ${err.response.data.message} \n ${err.response.data.errors}`
                    this.messageVisible = true
                }))
            }
            else {
                if (this.v$.surName.$errors[0]) {
                    this.messageText = `FrontEnd: Form failed validation: ${this.v$.surName.$errors[0].$message} `
                    this.messageVisible = true
                }
                else if (this.v$.email.$errors[0]) {
                    this.messageText = `FrontEnd: Form failed validation: ${this.v$.email.$errors[0].$message} `
                    this.messageVisible = true
                }
                else if (this.v$.phoneNumber.$errors[0]) {
                    this.messageText = `FrontEnd: Form failed validation: ${this.v$.phoneNumber.$errors[0].$message} `
                    this.messageVisible = true
                }
                // alert(`FrontEnd: Form failed validation ... `);   
                // console.log(this.v$.$errors);
                // console.log(this.v$.email.$errors[0].$message)
            }
        },
        changeEditUserId(_id, userName, surName, email, phoneNumber) {
            this.editUserId = _id;

            this.userName = userName,
            this.surName = surName,
            this.email = email,
            this.phoneNumber = phoneNumber    
        },
        isEdit(_id) {
            return this.editUserId === _id
        },
        // Error message
        messageDialog() {
            this.messageVisible = false
        },
        ...mapMutations({
            setUsers: 'index/setUsers',
            setEditUserId: 'index/setEditUserId',
            setClassStr: 'index/setClassStr',
            setId: 'index/setId',
            setUserName: 'index/setUserName',
            setSurName: 'index/setSurName',
            setEmail: 'index/setEmail',
            setPhoneNumber: 'index/setPhoneNumber', 
            //Delete User
            setDeleteUser: 'index/setDeleteUser'
        }),
        ...mapActions({
            SortByUserName: 'index/SortByUserName',
            SortBySurName: 'index/SortBySurName',
            SortByEmail: 'index/SortByEmail',
            SortByPhoneNumber: 'index/SortByPhoneNumber',
            getUsers: 'index/getUsers', 
            deleteUserId: 'index/deleteUserId',
            // Pagination
            pageClick: 'index/pageClick',
            //Delete User
            getProfilesInfo: 'index/getProfilesInfo'

        })
    },
    computed: {
        ...mapState({
            users: state => state.index.users,
            editUserId: state => state.index.editUserId,
            // View table Edit
            classStr: state => state.index.classStr,
            _id: state => state.index._id,
            userName: state => state.index.userName,
            surName: state => state.index.surName,
            email: state => state.index.email,
            phoneNumber: state => state.index.phoneNumber,
            // Pagination
            page: state => state.index.page,
            pageTotal: state => state.index.pageTotal,
            //Delete User
            deleteUser: state => state.index.deleteUser
        })
    },
    mounted() {
        this.getUsers();
        this.getProfilesInfo();
    },
    watch: {
        page() {
            this.getUsers();
        },
        selectedSort() {
            this.getUsers(this.selectedSort)    
        }
    }
}
</script>

<style>
/* Animation add and delete */
.user-index-store-item {
  display: inline-block;
  margin-right: 10px;
}
.user-index-store-enter-active,
.user-index-store-leave-active {
  transition: all 0.3s ease;
}
.user-index-store-enter-from,
.user-index-store-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* Animation move */
.user-index-store-move {
  transition: transform 0.5s ease;
}
.classNone {
    display: none;
}
/* Validation */
.input__validates {
    display:flex;
    flex-direction: column;
}
.input__validate {
  display: flex;
  flex-direction: column;
  color: teal;
}
</style>
<style src="@/assets/style/page.css"></style>
<style src="@/assets/style/index.css"></style>