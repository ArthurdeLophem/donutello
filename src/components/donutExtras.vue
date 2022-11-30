<script setup>
import { ref, reactive, onMounted } from 'vue';

let extra = ref("chocolat")
const extrasData = [
    {
        color: "#c51d34",
        eName: "framboos"
    },
    {
        color: "#d2691e",
        eName: "choco"
    },
    {
        color: "#000000",
        eName: "darkk"
    }
]

const emitDonunq = () => {
    this.emitter.emit('emitExtras', { 'extra': extra })
}

</script>

<template>
    <div class="choose__container">
        <h3 class="choose__Headline">choose your extras</h3>
        <div class="extras__select">
            <div class="extra__block" v-for="extra in extrasData">
                <div class="extra__color" v-on:click="emitDonunq" v-bind:style="{ backgroundColor: extra.color }"></div>
                <div class="extra__name">{{ extra.eName }}</div>
            </div>
        </div>
    </div>9
</template>

<style scoped>
strong {
    color: #ed2970;
}

.choose__Headline {
    margin-top: 0;
}

.choose__container {
    position: absolute;
    background-color: whitesmoke;
    right: 0;
    margin: 1em 3em;
    padding: 3em 2em;
}

.extra__color {
    width: 3em;
    height: 1.5em;
    border-radius: 0.3em;
}

.extra__name {
    display: none;
}

.extra__block:hover .extra__name {
    display: block;
    color: red;
}

.extras__select {
    display: flex;
    flex-direction: row;
    gap: 1em;
}

#active {
    border: blue 1px solid;
}
</style>