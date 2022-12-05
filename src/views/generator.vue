<script setup>
import donutConfigurator from '../components/generatorNav.vue';
import donutViewport from '../components/threeViewport.vue';
import donutVermi from '../components/donutVermi.vue';
import donutToppings from '../components/donutToppings.vue';
import donutExtras from '../components/donutExtras.vue';
</script>

<template>
    <donutViewport />
    <donutConfigurator />
    <div class="interactive__panel">
        <donutVermi />
        <donutToppings />
        <donutExtras />
    </div>
</template>

<style scoped>
.interactive__panel {
    right: 0;
    position: absolute;
    height: 100vh;
}
</style>