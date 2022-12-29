import @http from '@api';

export default {
    namespaced: true,
    state: {
        token: '',
    },
    getters: {
        isAuthentication(state) {
            const isTokenExists = !state.token;

            return isTokenExists;
        }
    },
    mutations() {
        ['AUTH'] (state, token) {
            this.state.token = token
        }
    }
}