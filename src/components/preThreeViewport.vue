<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import Donunq from "../scripts/donutGenerator.js";
import $mitt from '../scripts/mitt.js';

const donutViewport = ref(""),
    donunq = new Donunq(),
    editDonut = JSON.parse(window.localStorage.getItem("previewer"));

const generateCanvas = async () => {
    donunq.createScene(donutViewport.value);
    donunq.createDonunq();
    return true;
}

const editor = async () => {
    let res = await generateCanvas();
    if (res == true && editDonut) {
        setTimeout(() => {
            donunq.configureExtras(editDonut.extraObj.eName);
            donunq.configureGlaze(editDonut.glazeObj.color);
            donunq.configureTopping(editDonut.toppingObj.color);
        }, 1000);
    }
}

onMounted(() => {
    editor()
})
</script>

<template>
    <div class="donutViewport" ref="donutViewport"></div>
</template>

<style scoped>
.donutViewport {
    height: 100%;
    width: 100%;
}
</style>