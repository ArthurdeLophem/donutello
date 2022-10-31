<script>
import Donunq from "../scripts/donunqGenerator.js";
const donunq = new Donunq();

const generateCanvas = () => {
    const dViewport = document.querySelector(".donunqViewport")
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
    <div class="donunqViewport"></div>
</template>