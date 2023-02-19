import axios from 'axios'

export const usersInfoModule = {
    state: () => ({
        editUserInfoId: null,
        classStr: 'classNone',
        userName: '',
        email: '',
        phoneNumber: '',
        countEvent: '',
        dateNextEvent: '',
        usersInfo: [],
        profiles: [],
        // Pagination
        pageInfo: 1,
        pageTotalInfo: 0
    }),
    getters: {
        //Count events
        countEvent(state) {            
            for (let i in state.usersInfo) {
                state.usersInfo[i].countEvent = 0;
                for (let j in state.profiles) {
                    if (state.usersInfo[i].userName === state.profiles[j].userName) {
                        state.usersInfo[i].countEvent++;
                    } 
                }
            }
            return state.usersInfo.countEvent
        },
        //Next event date
        dateNextEvent(state) {
            const array = [];
            for (let i in state.usersInfo) {
                array[i] = []
                state.usersInfo[i].dateNextEvent = 'Not event';

                for (let j in state.profiles) {
                    if (state.usersInfo[i].userName === state.profiles[j].userName) {   
                        array[i][j] = new Date(state.profiles[j].startDate).toLocaleDateString();   
                        
                        for (let i in array) {
                            if (array[i][j]) {
                                let min = array[i][0]
                                if (min < array[i][j]) {
                                    state.usersInfo[i].dateNextEvent = min
                                } else {
                                    state.usersInfo[i].dateNextEvent = array[i][j]
                                }
                            }
                        }
                    } 
                }
            }
            return state.usersInfo.dateNextEvent
        }
    },
    mutations: {
        setEditUserInfoId(state, editUserInfoId) {
            state.editUserInfoId = editUserInfoId;
        },
        setClassStr(state, classStr) {
            state.classStr = classStr;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setPhoneNumber(state, phoneNumber) {
            state.phoneNumber = phoneNumber;
        },
        setCountEvent(state, countEvent) {
            state.countEvent = countEvent;
        },
        setDateNextEvent(state, dateNextEvent) {
            state.setDateNextEvent = dateNextEvent;
        },
        setUsersInfo(state, usersInfo) {
            state.usersInfo = usersInfo;
        },
        setProfiles(state, profiles) {
            state.profiles = profiles;
        },
        // Paginstion
        setPageInfo(state, pageInfo) {
            state.pageInfo = pageInfo
        },
        setPageTotalInfo(state, pageTotalInfo) {
            state.pageTotalInfo = pageTotalInfo
        }
    },
    actions: {
        // Sort
        SortByUserName({state}) {
            state.usersInfo.sort((a, b) => a.userName.localeCompare(b.userName));
        },
        SortByEmail({state}) {
            state.usersInfo.sort((a, b) => a.email.localeCompare(b.email));
        },
        SortByPhoneNumber({state}) {
            state.usersInfo.sort((a, b) => a.phoneNumber - b.phoneNumber);
        },
        SortByCountEvent({state}) {
            state.usersInfo.sort((a, b) => a.countEvent - b.countEvent);
        },
        SortByDateNextEvent({state}) {
            state.usersInfo.sort((a, b) => a.dateNextEvent.localeCompare(b.dateNextEvent));
        },
        // Pagination
        pageClick({commit}, pageCurrent) {
            commit('setPageInfo', pageCurrent)           
        },
        //Request to Server
        getUsersInfo({state, commit}, selectedSort) {
            if (!selectedSort) {
                axios.get(`http://localhost:3000/usersInfo?pageInfo=${state.pageInfo}`)
                .then(response => {
                    commit('setUsersInfo', response.data.users);
                    commit('setPageTotalInfo', response.data.pageTotalInfo)
                })
            } else {
                axios.get(`http://localhost:3000/usersInfo?pageInfo=${state.pageInfo}&sort=${selectedSort}`)
                .then(response => {
                    commit('setUsersInfo', response.data.users);
                    commit('setPageTotalInfo', response.data.pageTotalInfo)
                })
            }
        },
        getProfilesInfo({state, commit}) {
            axios.get(`http://localhost:3000/profiles`)
            .then(response => {
                commit('setProfiles', response.data.profiles);
            })
        },
    },
    namespaced: true
}