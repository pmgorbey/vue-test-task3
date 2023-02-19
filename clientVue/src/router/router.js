import {createRouter, createWebHistory} from 'vue-router';

import Main from '@/pages/Main.vue'
import UserPage from '@/pages/UserPage.vue'
import UserProfile from '@/pages/UserProfile.vue'
import Login from '@/components/auth/Login.vue'
import Registration from '@/components/auth/Registration.vue'
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
        path: '/register',
        component: Registration 
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
