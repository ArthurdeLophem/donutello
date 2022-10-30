<script setup>
import Donunq from "../scripts/donunqGenerator.js"
import { onMounted } from 'vue'

const generateCanvas = () => {
    const dViewport = document.querySelector(".donunqViewport")
    const donunq = new Donunq(dViewport);
    donunq.createScene();
};

onMounted(() => {
    generateCanvas()
})

// const editDonunq = () => { };
</script>

<template>
    <div class="donunqViewport"></div>
</template>