<template>
    <div class="navbar">
        <div @click="$router.push('/')"><strong style="color: rgb(0, 112, 112);">ThinkMobiles</strong></div>
        <div class="navbar__btns">
            <my-button
                @click="$router.push('/')"
                style="margin-left: 10px"
            >
                MainPage
            </my-button>
            <my-button
                @click="$router.push('/users')"
                style="margin-left: 10px"
            >
                UsersPage
            </my-button>
            <my-button
                @click="$router.push('/store')"
                style="margin-left: 10px"
            >
                UsersStore
            </my-button>
            <my-button
                @click="$router.push('/usersinfo')"
                style="margin-left: 10px"
            >
                UserInfo
            </my-button>
            <my-button
                @click="$router.push('/users-info-store')"
                style="margin-left: 10px"
            >
                UserInfoStore
            </my-button>
            <my-button 
                @click="$router.push('/userprofile')"
                style="margin-left: 10px"
            >
                UserProfile
            </my-button>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style scoped>
.navbar {
    height: 65px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns {
    margin-left: auto;
}
</style>