<script>
import Donunq from "../scripts/donunqGenerator.js";

const generateCanvas = () => {
    const dViewport = document.querySelector(".donunqViewport")
    const donunq = new Donunq(dViewport);
    donunq.createScene();
}

const editDonunq = (flavour) => {
    console.log(flavour)
}

export default {
    created() {
        this.emitter.on('editDonunq', e => {
            editDonunq(e.eventContent)
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