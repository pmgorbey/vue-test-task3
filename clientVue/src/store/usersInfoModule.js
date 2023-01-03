import axios from 'axios'

export const usersInfoModule = {
    state: () => ({
        usersInfoCountPage: 20,
        pageNumber: 1,
        editUserInfoId: null,
        classStr: 'classNone',
        userName: '',
        email: '',
        phoneNumber: '',
        countEvent: '',
        dateNextEvent: '',
        usersInfo: [],
        profiles: []
    }),
    getters: {
        // Paginations 
        pages(state) {
            return Math.ceil(state.usersInfo.length / 10);
        },
        // Count users on page  
        paginatedUsersInfo(state) {
            let from = (state.pageNumber-1) * state.usersInfoCountPage;
            let to = from + state.usersInfoCountPage;
            return state.usersInfo.slice(from, to);
        },
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
        dateNextEvent(state) {
            const array = [];
            for (let i in state.usersInfo) {
                state.usersInfo[i].dateNextEvent = 'Not event';
                for (let j in state.profiles) {
                    if (state.usersInfo[i].userName === state.profiles[j].userName) {                                          
                        let item = state.profiles[j].startDate;
                        let minDate = '2028-01-18T00:00:00.000Z'
                        if (item <= minDate) {
                            let date = new Date(item);
                            state.usersInfo[i].dateNextEvent = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                        } else {
                            minDate = item;
                            let date = new Date(minDate);
                            state.usersInfo[i].dateNextEvent = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                        }
                        // array.push(Date.parse(item));
                        // state.usersInfo[i].dateNextEvent = Math.max.apply(null, array);  
                    } 
                }
            }
            return state.usersInfo.dateNextEvent
        }
    },
    mutations: {
        setUsersInfoCountPage(state, usersInfoCountPage) {
            state.usersInfoCountPage = usersInfoCountPage;
        },
        setPageNumber(state, pageNumber) {
            state.pageNumber = pageNumber;
        },
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

        //Request to Server
        getUsersInfo({state, commit}) {
            axios.get(`http://localhost:3000/users`)
            .then(response => {
                commit('setUsersInfo', response.data);
            })
        },
        getProfilesInfo({state, commit}) {
            axios.get(`http://localhost:3000/profiles`)
            .then(response => {
                commit('setProfiles', response.data);
            })
        },
    },
    namespaced: true
}