<script setup>
import { ref, onMounted, watch } from 'vue';
import Donunq from "../../scripts/donutGenerator.js";
import $mitt from '../../scripts/mitt.js';
import { glazesData, toppingsData } from '../../configs/donuttelloData';

const donutViewport = ref(""),
    donunq = new Donunq();
let fetchData,
    donutType,
    donut,
    topping,
    glaze,
    initial = true

const donutProps = defineProps({
    donutData: {
        type: Object,
        required: true
    },
    donutType: {
        type: Object,
        required: true
    }
});

watch(donutProps, () => {
    fetchData = donutProps.donutData.data;
    donutType = donutProps.donutType;
    switch (donutType.type) {
        case "fetch":
            topping = toppingsData.find(el => el.eName == fetchData.topping)
            glaze = glazesData.find(el => el.eName == fetchData.glaze)
            donut = { id: fetchData._id, extra: fetchData.extra, glaze: glaze.color, topping: topping.color }
            break;
        case "editor":
            donut = { extra: fetchData.extra, glaze: fetchData.glaze, topping: fetchData.topping }
            break;
        case "fresh":
            donut = { extra: fetchData.extra, glaze: "#6c3b1e", topping: "#6c3b1e", }
            console.log(donut)
            break;
    }
    if (initial == true) {
        editor()
    }
});

const generateCanvas = () => {
    donunq.createScene(donutViewport.value);
    donunq.createDonunq();
}

const editor = () => {
    setTimeout(() => {
        donunq.configureExtras(donut.extra);
        donunq.configureGlaze(donut.glaze);
        donunq.configureTopping(donut.topping);
        initial = false;
    }, 1000);
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
$mitt.on('closeModel', (e) => {
    donunq.ender();
})
$mitt.on('repositionModel', (e) => {
    donunq.unEnder();
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