<script setup>
import { ref, onMounted } from 'vue';
import Donunq from "../scripts/donutGenerator.js";
import $mitt from '../scripts/mitt.js';

const donutViewport = ref(""),
    donunq = new Donunq();

const generateCanvas = () => {
    donunq.createScene(donutViewport.value);
}

const checkIntersects = (e) => {
    donunq.raycaster(e);
}

const checkObject = (e) => {
    const targetObj = donunq.intersectObj(e);
    if (targetObj === "donutLayer_1") {
        $mitt.emit('emitToppingPanel', { 'targetObj': "topping" });
    }
    else if (targetObj === "donutLayer" || targetObj === "donutLayer_3" || targetObj === "donutLayer_4" || targetObj === "donutLayer_5") {
        $mitt.emit('emitExtraPanel', { 'targetObj': "extras" });
    } else if (targetObj === "donutLayer_6") {
        $mitt.emit('emitGlazePanel', { 'targetObj': "glaze" });
    }
}

$mitt.on('emitToppings', e => {
    donunq.configureVermi(e.toppingColor);
})
$mitt.on('emitGlazes', e => {
    donunq.configureTopping(e.glazeColor);
})
$mitt.on('emitExtras', e => {
    donunq.configureExtras(e.extraType);
})

onMounted(() => {
    generateCanvas()
})
</script>

<template>
    <div class="donutViewport" ref="donutViewport" @mousemove="checkIntersects" @mouseup="checkObject"></div>
</template>

<style scoped>
.donutViewport {
    height: 100%;
    width: 100%;
}
</style>