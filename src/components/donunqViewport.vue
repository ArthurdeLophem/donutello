<script>
import Donunq from "../scripts/donunqGenerator.js";
const donunq = new Donunq();

const generateCanvas = () => {
    const dViewport = document.querySelector(".donunqViewport")
    donunq.createScene(dViewport);
}

const editDonunqFlavour = (flavour) => {
    donunq.configureDonunqFlavour(flavour)
}

const editDonunqExtra = (extra) => {
    donunq.configureDonunqExtra(extra)
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