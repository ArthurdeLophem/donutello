<script setup>
import { ref, reactive, onMounted } from 'vue';
import $mitt from '../scripts/mitt.js';

let extra = ref("chocolat"),
    selector = ref([]);

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

const showActive = (event) => {
    selector._rawValue.forEach(element => {
        element.firstElementChild.classList.remove("active");
        element.lastElementChild.classList.remove("active");
    });
    event.target.classList.add("active");
    event.target.nextElementSibling.classList.add("active");
}

const emitDonunq = (event) => {
    showActive(event);
    const targetObj = extrasData.find(el => el.eName == event.target.nextElementSibling.innerText);
    $mitt.emit('emitExtras', { 'extraColor': targetObj.color });
}

</script>

<template>
    <div class="choose__container">
        <h3 class="choose__Headline">choose your extras</h3>
        <div class="extras__select">
            <div class="extra__block" v-for="extra in extrasData" ref="selector">
                <div class="extra__color" v-on:click="emitDonunq" v-bind:style="{ backgroundColor: extra.color }"></div>
                <div class="extra__name">{{ extra.eName }}</div>
            </div>
        </div>
    </div>
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

.extra__block:hover .extra__name,
.active {
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