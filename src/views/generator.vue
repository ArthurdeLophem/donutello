<script setup>
import donutConfigurator from '../components/generatorNav.vue';
import donutViewport from '../components/threeViewport.vue';
import donutExtras from '../components/donutExtras.vue';
import donutToppings from '../components/donutToppings.vue';
</script>

<template>
    <donutViewport />
    <donutConfigurator />
    <div class="interactive__panel">
        <donutExtras />
        <donutToppings />
    </div>
</template>

<style scoped>
.interactive__panel {
    right: 0;
    position: absolute;
    height: 100vh;
}
</style>