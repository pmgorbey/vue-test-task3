import axios from 'axios'

export const usersModule = {
    state: () => ({
        userName: '',
        surName: '',
        email: '',
        phoneNumber: ''        
    }),
    getters: {

    },
    mutations: {
        setUserName(state, userName) {
            state.userName = userName;
        },
        setAge(state, surName) {
            state.surName = surName;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setPhoneNumber(state, phoneNumber) {
            state.phoneNumber = phoneNumber;
        }
    },
    actions: {
        createUser({state, commit}) {
            axios.post('http://localhost:3000/users', {
                userName: state.userName,
                surName: state.surName,
                email: state.email,
                phoneNumber: state.phoneNumber,
            })
            .then(response => {
                commit(state.setUserName, ''),
                commit(state.setUserName, ''),
                commit(state.setEmail, ''),
                commit(state.setPhoneNumber, '')
                
            })
        }
    }, 
    namespaced: true
}