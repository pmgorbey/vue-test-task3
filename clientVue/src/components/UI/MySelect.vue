<template>
    <select 
        :value="modelValue" 
        @change="changeOption"
        class="select"
    >
        <option disabled value="">Sorting on the Server</option>
        <option 
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
import selectMixin from '@/mixins/selectMixin.js'

export default {
    name: 'my-select',
    mixins: [ selectMixin ]
}
</script>

<style>
.select {
    text-align: center;
    border: 1px solid teal;
    color: rgb(0, 112, 112);
    font-weight: 800;
    padding: 5px;
}
</style>