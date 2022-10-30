<script>
import Donunq from "../scripts/donunqGenerator.js";

const generateCanvas = () => {
    const dViewport = document.querySelector(".donunqViewport")
    const donunq = new Donunq(dViewport);
    donunq.createScene();
}

const editDonunqFlavour = (flavour) => {
    console.log(flavour)
}

const editDonunqExtra = (extra) => {
    console.log(extra)
}

export default {
    created() {
        this.emitter.on('editDonunqFlavour', e => {
            editDonunqFlavour(e.eventContent)
        })

        this.emitter.on('editDonunqExtra', e => {
            editDonunqExtra(e.eventContent)
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