import {createStore} from 'vuex'
import {usersModule} from '@/store/usersModule.js'

export default createStore({
    modules: {
        users: usersModule
    }
})