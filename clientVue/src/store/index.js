import {createStore} from 'vuex'
import {usersModule} from '@/store/usersModule.js'
import {usersIndexModule} from '@/store/usersIndexModule.js'

export default createStore({
    modules: {
        users: usersModule,
        index: usersIndexModule
    }
})