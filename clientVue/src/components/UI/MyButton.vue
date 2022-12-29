<!--Component Button-->
<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
.btn {
    margin-top: 15px;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    align-self: flex-end;
    min-width: 100px;
    font-weight: 800;
}
</style>