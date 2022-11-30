<script setup>
import { onMounted } from 'vue';

import Donunq from "../scripts/donutGenerator.js";
import $mitt from '../scripts/mitt.js';

const donunq = new Donunq();

const generateCanvas = () => {
    const dViewport = document.querySelector(".donutViewport")
    donunq.createScene(dViewport);
}

$mitt.on('emitExtras', e => {
    donunq.configureExtra(e.extraColor);
})

onMounted(() => {
    generateCanvas()
})


</script>

<template>
    <div class="donutViewport"></div>
</template>

<style scoped>
.donutViewport {
    height: 100%;
    width: 100%;
}
</style>