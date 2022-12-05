<script setup>
import { ref, reactive, onMounted } from 'vue';
import $mitt from '../scripts/mitt.js';

let extra = ref("chocolat"),
    selector = ref([]),
    extra__container = ref();

const extrasData = [
    {
        color: "#c51d34",
        eName: "maltesers"
    },
    {
        color: "#d2691e",
        eName: "twix"
    },
    {
        color: "#000000",
        eName: "snickers"
    },
    {
        color: "#000000",
        eName: "leo"
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
    $mitt.emit('emitExtras', { 'extraType': targetObj.eName });
}

$mitt.on('emitExtraPanel', e => {
    console.log(e, extra__container)
    extra__container.value.style.transform = "translateX(0px)";
})
$mitt.on('emitToppingPanel', e => {
    extra__container.value.style.transform = "translateX(1000px)"
})
$mitt.on('emitVermiPanel', e => {
    extra__container.value.style.transform = "translateX(1000px)"
})

const closePanel = () => {
    extra__container.value.style.transform = "translateX(1000px)"
}

</script>

<template>
    <div class="choose__container" ref="extra__container">
        <div class="close" @click="closePanel">X</div>
        <h3 class="choose__Headline">choose your extras</h3>
        <div class="extras__select">
            <div class="extra__block" v-for="extra in extrasData" ref="selector">
                <div class="extra__color" @click="emitDonunq" v-bind:style="{ backgroundColor: extra.color }"></div>
                <div class="extra__name">{{ extra.eName }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
strong {
    color: #ed2970;
}

.close {
    cursor: pointer;
    font-weight: 800;
    position: absolute;
    right: 1em;
    top: 1em;
}

.choose__Headline {
    margin-top: 0;
}

.choose__container {
    background-color: whitesmoke;
    position: absolute;
    top: 0;
    right: 0;
    margin: 1em 3em;
    padding: 3em 2em;
    transition: all 250ms;
    transform: translateX(1000px);
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