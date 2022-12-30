<template>
    <select 
        :value="modelValue" 
        @change="changeOption"
    >
        <option disabled value="">Choose something from the list</option>
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

</style>