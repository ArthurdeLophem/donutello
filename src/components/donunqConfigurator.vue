<script>
export default {
    data() {
        return {
            selectedFlavour: 'chocolat',
            selectedExtra: 'boring'
        }
    },
    methods: {
        emitDonunq() {
            this.emitter.emit('emitDonunq', { 'flavour': this.selectedFlavour, 'extra': this.selectedExtra })
        }
    }
}
</script>

<template>
    <div class="configurePanel">
        <div class="flavour">
            <p class="flavour__title">choose your flavour: <span style="color:blue">{{ selectedFlavour }}</span></p>
            <select v-model="selectedFlavour" v-on:change="emitDonunq" class="flavour__selector" name="flavours"
                id="flavours">
                <option selected value="chocolat">chocolat</option>
                <option value="fraise">fraise</option>
                <option value="myrtille">myrtille</option>
            </select>
        </div>
        <div class="extras">
            <p class="extras__title">want some extras: <span style="color:blue">{{ selectedExtra }}</span></p>
            <select v-model="selectedExtra" v-on:change="emitExtra" class="extras__selector" name="extras" id="extras">
                <option selected value="boring">no I'm Boring</option>
                <option value="vermicelles">vermicelles</option>
                <option value="teknodisco">teknodisco</option>
            </select>
        </div>
    </div>
</template>