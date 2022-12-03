<script setup>
import { onMounted } from 'vue';

import Donunq from "../scripts/donutGenerator.js";
import $mitt from '../scripts/mitt.js';

const donunq = new Donunq();

const generateCanvas = () => {
    const dViewport = document.querySelector(".donutViewport")
    donunq.createScene(dViewport);
}

const checkIntersects = (e) => {
    donunq.raycaster(e);
}

const checkObject = (e) => {
    const targetObj = donunq.intersectObj(e);
    if (targetObj === "Torus003") {
        $mitt.emit('emitBasePanel', { 'targetObj': "base" });
    } else if (targetObj === "Torus003_2") {
        $mitt.emit('emitExtraPanel', { 'targetObj': "extras" });
    } else if (targetObj === "Torus003_1") {
        $mitt.emit('emitToppingPanel', { 'targetObj': "topping" });
    }
}

$mitt.on('emitExtras', e => {
    donunq.configureExtra(e.extraColor);
})

$mitt.on('emitTopping', e => {
    donunq.configureTopping(e.toppingColor);
})

onMounted(() => {
    generateCanvas()
})
</script>

<template>
    <div class="donutViewport" @mousemove="checkIntersects" @mouseup="checkObject"></div>
</template>

<style scoped>
.donutViewport {
    height: 100%;
    width: 100%;
}
</style>