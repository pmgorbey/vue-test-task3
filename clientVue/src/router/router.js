import {createRouter, createWebHistory} from 'vue-router';

import Main from '@/pages/Main.vue'
import UsersPage from '@/pages/UsersPage.vue'
import UserPage from '@/pages/UserPage.vue'
import UserInfo from '@/pages/UserInfo.vue'
import UserProfile from '@/pages/UserProfile.vue'
import AuthLogon from '@/pages/AuthLogon.vue'


import Login from '@/components/Login.vue'
import Registration from '@/components/Registration.vue'

const routes = [
    {
        path: '/',
        component: Main 
    },
    {
        path: '/authlogon',
        component: AuthLogon 
    },
    {
        path: '/login',
        component: Login 
    },
    {
        path: '/registration',
        component: Registration 
    },
    {
        path: '/users',
        component: UsersPage 
    },
    {
        path: '/users/:_id',
        component: UserPage 
    },
    {
        path: '/usersinfo',
        component: UserInfo 
    },
    {
        path: '/userprofile',
        component: UserProfile 
    },
]

const router = createRouter({
    routes,
    history: createWebHistory() 

})
export default router;
