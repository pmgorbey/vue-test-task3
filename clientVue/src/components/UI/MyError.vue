<template>
    <div class="error-component">
            <div v-if="error" class="alert">
               {{ error }}
           </div> 
    </div>
</template>

<script>
export default {
    name: 'error-component',
    props: {
        error: {
            type: String
        }
    }
}
</script>

<style>
.alert {
    color:lawngreen;
}
</style>   