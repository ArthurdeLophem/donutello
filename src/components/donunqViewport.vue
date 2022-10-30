<script setup>
import Donunq from "../scripts/donunqGenerator.js"

generateCanvas = () => {
    // still need to pass the viewport to the constructor
    const donunq = new Donunq();
    donunq.createScene();
}

</script>

<template>
    <div class="donunqViewport" @load="generateCanvas"></div>
</template>