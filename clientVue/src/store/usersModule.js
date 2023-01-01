// import axios from 'axios'

// export const usersModule = {
//     state: () => ({
//         userName: '',
//         surName: '',
//         email: '',
//         phoneNumber: ''        
//     }),
//     getters: {

//     },
//     mutations: {
//         setUserName(state, userName) {
//             state.userName = userName;
//         },
//         setSurName(state, surName) {
//             state.surName = surName;
//         },
//         setEmail(state, email) {
//             state.email = email;
//         },
//         setPhoneNumber(state, phoneNumber) {
//             state.phoneNumber = phoneNumber;
//         }
//     },
//     actions: {
//         async createUser({state, dispatch, commit}) {
//             await axios.post('http://localhost:3000/users', {
                
//                 userName: state.userName,
//                 surName: state.surName,
//                 email: state.email,
//                 phoneNumber: state.phoneNumber,
//             })
//             .then(response => {
//                 dispatch('getUsers')
//                 state.userName = '',
//                 state.surName = ','
//                 state.email = '',
//                 state.phoneNumber = ''
//             })
//         }
//     }, 
//     namespaced: true
// }