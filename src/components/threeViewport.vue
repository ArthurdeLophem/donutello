<script setup>
import { ref, onMounted, onBeforeMount, watch, reactive } from 'vue';
import Donunq from "../scripts/donutGenerator.js";
import $mitt from '../scripts/mitt.js';
import { extrasData, glazesData, toppingsData } from '../configs/donuttelloData';

const donutViewport = ref(""),
    donunq = new Donunq(),
    editDonut = JSON.parse(window.localStorage.getItem("editor"));
let fetchData,
    data;

const donutProps = defineProps({
    donutData: {
        type: Object,
        required: true
    }
});

watch(donutProps, () => {
    fetchData = donutProps.donutData.data
    data = { id: fetchData._id, extra: fetchData.extra, glaze: fetchData.glaze, topping: fetchData.topping }
    editor()
});

const generateCanvas = () => {
    donunq.createScene(donutViewport.value);
    donunq.createDonunq();
}

const editor = () => {
    generateCanvas()
    if (editDonut) {
        setTimeout(() => {
            donunq.configureExtras(editDonut.extraObj.eName);
            donunq.configureGlaze(editDonut.glazeObj.color);
            donunq.configureTopping(editDonut.toppingObj.color);
        }, 1000);
    } else {
        setTimeout(() => {
            let topping = toppingsData.find(el => el.eName == data.topping)
            let glaze = glazesData.find(el => el.eName == data.glaze)
            donunq.configureExtras(data.extra.eName);
            donunq.configureGlaze(glaze.color);
            donunq.configureTopping(topping.color);
        }, 1000);
    }
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
    donunq.configureTopping(e.toppingColor);
})
$mitt.on('emitGlazes', e => {
    donunq.configureGlaze(e.glazeColor);
})
$mitt.on('emitExtras', e => {
    donunq.configureExtras(e.extraType);
})

onMounted(() => {
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