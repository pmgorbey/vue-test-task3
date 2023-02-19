import axios from 'axios'

export const profileIndexAllModule = {
    state: () => ({
        profiles: [],
        editProfileId: null,
        classStr: 'classNone',
        _id: '',
        userName: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        //Pagination
        page: 1,
        pageTotal: 0,
        //BackendMessage
        messageVisible: false,
        messageText: '',
        // Error message
        messageVisible: false,
        messageText: ''
    }),
    getters: {
        getPrifiles(state) {
            return state.profiles
        },
        getPage(state) {
            return state.page
        },
        getPageTotal(state) {
            return state.pageTotal
        },
        getEditProfileId(state, editProfileId) {
            state.editProfileId = editProfileId
        }
    },
    mutations: {
        setProfiles(state, profiles) {
            state.profiles = profiles
        },
        setPage(state, page) {
            state.page = page
        },
        setPageTotal(state, pageTotal) {
            state.pageTotal = pageTotal
        },
        setEditProfileId(state, editProfileId) {
            state.editProfileId = editProfileId
        },
        setId(state, _id) {
            state,_id = _id
        },
        setUserName(state, userName) {
            state.userName = userName
        },
        setTitle(state, title) {
            state.title = title
        },
        setDescription(state, description) {
            state.description = description
        },
        setStartDate(state, startDate) {
            state.startDate = startDate
        },
        setEndDate(state, endDate) {
            state.endDate = endDate
        },
        //BackendMessage
        setMessageVisible(state, messageVisible) {
            state.messageVisible = messageVisible
        },
        setMessageText(state, messageText) {
            state.messageText = messageText
        },
        // Error message
        setMessageVisible(state, messageVisible) {
            state.messageVisible = messageVisible
        },
        setMessageText(state, messageText) {
            state.messageText = messageText
        }
    },
    actions: {
        // Paginations
        pageClick({commit}, pageCurrent) {
            commit('setPage', pageCurrent)
        },
        // Sort
        SortByUserName({state}) {
            state.profiles.sort((a, b) => a.userName.localeCompare(b.userName));
        },
        SortByTitle({state}) {
            state.profiles.sort((a, b) => a.title.localeCompare(b.title));
        },
        SortByDescription({state}) {
            state.profiles.sort((a, b) => a.description.localeCompare(b.description));
        },
        SortByStartDate({state}) {
            state.profiles.sort((a, b) => a.startDate.localeCompare(b.startDate));
        },
        SortByEndDate({state}) {
            state.profiles.sort((a, b) => a.endDate.localeCompare(b.endDate));
        },

        //Request to Server
        async getProfilesAll({state, commit}, selectedSort) {
            if (!selectedSort) {
                await axios.get(`http://localhost:3000/profiles?page=${state.page}`)
                .then(response => {
                    commit('setProfiles', response.data.profiles)
                    commit('setPageTotal', response.data.pageTotal)
                })
            } else {
                await axios.get(`http://localhost:3000/profiles?page=${state.page}&sort=${selectedSort}`)
                .then(response => {
                    commit('setProfiles', response.data.profiles)
                    commit('setPageTotal', response.data.pageTotal)
                })
            }
        },

        //Request to Server
        async getProfiles({state, commit}, selectedSort) {
            await axios.get(`http://localhost:3000/profiles?page=${state.page}`)
            .then(response => {
                commit('setProfiles', response.data.profiles)
                commit('setPageTotal', response.data.pageTotal)
            })
        },

        async createProfile({commit, dispatch, state}, data) {
            await axios.post('http://localhost:3000/profiles', {
                userName: data.userName,
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate
            })
            .then(response => {
                dispatch('getPrifiles')
                commit('setMessageText', `BackEnd: Form successfully submitted ... `)
                commit('setMessageVisible', true)
            })
            .catch(err => {
                // commit('setMessageText', `BackEnd: ${err.response.data.errors}`)
                commit('setMessageText', `BackEnd: ${err.response.data.message}`)
                commit('setMessageVisible', true)
            })
        },

        async deleteProfileId({dispatch}, _id) {
            await axios.delete(`http://localhost:3000/profiles/${_id}`)
            .then(response => {
                dispatch('getProfiles')
            })
        },

        async updateProfile({commit, dispatch}, data) {
            await axios.put(`http://localhost:3000/profiles/${data._id}`, {
                userName: data.userName,
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate
            })
            .then(response => {
                dispatch('getProfiles')
            })
            .catch((err => {
                // alert(`Backend: ${err.response.data.message} \n ${err.response.data.errors}`)
                commit('setMessageVisible', true)
                commit('setMessageText', `BackEnd: ${err.response.data.message} \n ${err.response.data.errors}`)
                dispatch('getProfiles')
            }))
            commit('setEditProfileId', null)
        },

        changeEditProfileId({commit}, data) {
            commit('setEditProfileId', data._id)

            commit('setUserName', data.userName)
            commit('setTitle', data.title)
            commit('setDescription', data.description)
            commit('setStartDate', data.startDate)
            commit('setEndDate', data.endDate)
        },

        //BackendMessage
        messageDialog({commit, dispatch}) {
            commit('setMessageVisible', false)
            dispatch('getProfiles');
        }
    },
    namespaced: true
}