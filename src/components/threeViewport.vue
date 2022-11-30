<script setup>
import { onMounted } from 'vue';

import Donunq from "../scripts/donutGenerator.js";
import $mitt from '../scripts/mitt.js';

const donunq = new Donunq();

const generateCanvas = () => {
    const dViewport = document.querySelector(".donutViewport")
    donunq.createScene(dViewport);
}

const editDonunq = (flavour, extra) => {
    donunq.configureDonunq(flavour, extra)
}

$mitt.on('emitExtras', e => {
    // editDonunq(e.flavour, e.extra)
    console.log("emitted")
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