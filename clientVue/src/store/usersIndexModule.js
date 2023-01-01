import axios from 'axios'

export const usersIndexModule = {
    state: () => ({
        usersCountPage: 20,
        pageNumber: 1,
        users: [],
        editUserId: null,
        classStr: 'classNone',
        _id: '',
        userName: '',
        surName: '',
        email: '',
        phoneNumber: ''
    }),
    getters: {
        // Paginations 
        pages(state) {
            return Math.ceil(state.users.length / 20);
        },
        // Count users on page
        paginatedUsers(state) {
            let from = (state.pageNumber-1) * state.usersCountPage;
            let to = from + state.usersCountPage;
            return state.users.slice(from, to);
        }
    },
    mutations: {
        setUserCountPage(state, usersCountPage) {
            state.usersCountPage = usersCountPage;
        },
        setPageNumber() {
            state.pageNumber = pageNumber;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setEditUserId(state, editUserId) {
            state.editUserId = editUserId;
        },
        setClassStr(state, classStr) {
            state.classStr = classStr;
        },
        setId(state, _id) {
            state._id = _id;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setSurName(state, surName) {
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
        // Sort
        SortByUserName({state, commit}) {
            state.users.sort((a, b) => a.userName.localeCompare(b.userName));
        },
        SortBySurName({state, commit}) {
            state.users.sort((a, b) => a.userName.localeCompare(b.userName));
        },
        SortByEmail({state, commit}) {
            state.users.sort((a, b) => a.email.localeCompare(b.email));
        },
        SortByPhoneNumber({state, commit}) {
            state.users.sort((a, b) => a.phoneNumber - b.phoneNumber);
        },

        //Request to Server
        getUsers({state, commit}) {
            axios.get(`http://localhost:3000/users`)
            .then(response => {
                commit('setUsers', response.data);
            })
        },
        // async createUser({state, dispatch, commit}, payload) {
        //     await axios.post('http://localhost:3000/users', payload
        //     // {    
        //     //     userName: state.userName,
        //     //     surName: state.surName,
        //     //     email: state.email,
        //     //     phoneNumber: state.phoneNumber,
        //     // }
        //     )
        //     .then(response => {
        //         dispatch('getUsers')
        //         // state.userName = '',
        //         // state.surName = ','
        //         // state.email = '',
        //         // state.phoneNumber = ''
        //     })
        // },
        async createUser({state, dispatch}) {
            await axios.post('http://localhost:3000/users', {    
                userName: state.userName,
                surName: state.surName,
                email: state.email,
                phoneNumber: state.phoneNumber,
            }
            )
            .then(response => {
                dispatch('getUsers')
                state.userName = '',
                state.surName = ','
                state.email = '',
                state.phoneNumber = ''
            })
        },
        deleteUserId({ dispatch}, _id) {
            axios.delete(`http://localhost:3000/users/${_id}`)
            .then(response => {
                dispatch('getUsers')
            })
        },
        updateUser({state, commit, dispatch}, _id) {
            commit(setEditUserId, null)
            
            axios.put(`http://localhost:3000/users/${_id}`, {
                userName: state.userName,
                surName: state.surName,
                email: state.email,
                phoneNumber: state.phoneNumber,
            })
            .then(response => {
                dispatch('getUsers')
            })
        },
        // changeEditUserId({state}, _id, userName, surName, email, phoneNumber) {
        //     state.editUserId = _id;

        //     state.userName = userName,
        //     state.surName = surName,
        //     state.email = email,
        //     state.phoneNumber = phoneNumber    
        // },

        // isEdit({state}, _id) {
        //     return state.editUserId === _id
        // },
    },
    namespaced: true
}