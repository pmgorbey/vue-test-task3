import axios from 'axios'

export const usersInfoModule = {
    state: () => ({
        editUserInfoId: null,
        classStr: 'classNone',
        userName: '',
        email: '',
        phoneNumber: '',
        //Indicators
        countEvent: [],
        dateNextEvent: [],
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
                for (let j in state.countEvent) {
                    if (state.usersInfo[i].userName === state.countEvent[j]._id) {
                        state.usersInfo[i].countEvent = state.countEvent[j].countTask;
                    } 
                }
            }
            return state.usersInfo.countEvent
        },
        //Next event date
        dateNextEvent(state) {
            for (let i in state.usersInfo) {
                state.usersInfo[i].dateNextEvent = 'Not event';

                for (let j in state.dateNextEvent) {
                    if (state.usersInfo[i].userName === state.dateNextEvent[j]._id) {   
                        state.usersInfo[i].dateNextEvent = new Date(state.dateNextEvent[j].startDate).toLocaleDateString();   
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
            state.dateNextEvent = dateNextEvent;
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
        // Sort by Vue
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
        async getUsersInfo({state, commit}, selectedSort) {
            if (!selectedSort) {
                await axios.get(`http://localhost:3000/usersInfo?pageInfo=${state.pageInfo}`)
                .then(response => {
                    commit('setUsersInfo', response.data.users);
                    commit('setPageTotalInfo', response.data.pageTotalInfo)
                    commit('setDateNextEvent', response.data.dateNextEvent);
                    commit('setCountEvent', response.data.countTask);
                })
            } else {
                await axios.get(`http://localhost:3000/usersInfo?pageInfo=${state.pageInfo}&sort=${selectedSort}`)
                .then(response => {
                    commit('setUsersInfo', response.data.users);
                    commit('setPageTotalInfo', response.data.pageTotalInfo)
                    commit('setDateNextEvent', response.data.dateNextEvent);
                    commit('setCountEvent', response.data.countTask);
                })
            }
        },
        async getProfilesInfo({state, commit}) {
            await axios.get(`http://localhost:3000/profiles`)
            .then(response => {
                commit('setProfiles', response.data.profiles);
            })
        },
    },
    namespaced: true
}
