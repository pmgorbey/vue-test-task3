<template>
    <navbar :user="user" />
    <div class="app"> 
        <router-view :user="user" />
    </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            user: null,
        }
    },  
    async created() {
      const response = await axios.get('user');
      this.$store.dispatch('auth/user', response.data);
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 20px;
}
</style>
