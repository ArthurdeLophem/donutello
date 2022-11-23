<script>
import Donunq from "../scripts/donutGenerator.js";
const donunq = new Donunq();

const generateCanvas = () => {
    const dViewport = document.querySelector(".donutViewport")
    donunq.createScene(dViewport);
}

const editDonunq = (flavour, extra) => {
    donunq.configureDonunq(flavour, extra)
}

export default {
    created() {
        this.emitter.on('emitDonunq', e => {
            editDonunq(e.flavour, e.extra)
        })
    },

    mounted() {
        generateCanvas()
    }
}
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