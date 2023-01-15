export const authModule = {
    state: () => ({
        user: ''
    }),
    getters: {
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
       user(context, user) {
            context.commit('setUser', user)
        }
    },
    namespaced: true
}