import {createStore} from 'vuex'
import {usersInfoModule} from '@/store/usersInfoModule.js'
import {usersIndexModule} from '@/store/usersIndexModule.js'
import {profileIndexAllModule} from '@/store/profileIndexAllModule.js'
import {authModule} from '@/store/authModule.js'

export default createStore({
    modules: {
        info: usersInfoModule,
        index: usersIndexModule,
        profile: profileIndexAllModule,
        auth: authModule
    }
})