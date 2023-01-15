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
            return Math.ceil(state.users.length / 10);
        },
        // Count users on page
        paginatedUsers(state) {
            let from = (state.pageNumber-1) * state.usersCountPage;
            let to = from + state.usersCountPage;
            return state.users.slice(from, to);
        },
        users(state) {
            return state.users;
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
            state.users.sort((a, b) => a.surName.localeCompare(b.surName));
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
        async createUser({dispatch}, data) {
            await axios.post('http://localhost:3000/users', {
                userName: data.userName,
                surName: data.surName,
                email: data.email,
                phoneNumber: data.phoneNumber,
            })
            .then(response => {
                dispatch('getUsers')
            })
        },
        async deleteUserId({ dispatch}, _id) {
            await axios.delete(`http://localhost:3000/users/${_id}`)
            .then(response => {
                dispatch('getUsers')
            })
        }
    },
    namespaced: true
}