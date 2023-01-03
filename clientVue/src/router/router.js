import {createRouter, createWebHistory} from 'vue-router';

import Main from '@/pages/Main.vue'
import UsersPage from '@/pages/UsersPage.vue'
import UserPage from '@/pages/UserPage.vue'
import UserProfile from '@/pages/UserProfile.vue'
import Login from '@/components/Login.vue'
import Registration from '@/components/Registration.vue'
import UsersStore from '@/pages/UsersPageStore.vue'
import UserInfoStore from '@/pages/UserInfoStore.vue'

const routes = [
    {
        path: '/',
        component: Main 
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
        path: '/store',
        component: UsersStore 
    },
    {
        path: '/users/:_id',
        component: UserPage 
    },
    {
        path: '/users-info-store',
        component: UserInfoStore 
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
