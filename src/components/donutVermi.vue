<script setup>
import { ref, reactive, onMounted } from 'vue';
import $mitt from '../scripts/mitt.js';

let extra = ref("chocolat"),
    selector = ref([]),
    vermi__container = ref();

const vermisData = [
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
    const targetObj = vermisData.find(el => el.eName == event.target.nextElementSibling.innerText);
    $mitt.emit('emitvermis', { 'vermiColor': targetObj.color });
}

$mitt.on('emitVermiPanel', e => {
    console.log(e, vermi__container)
    vermi__container.value.style.transform = "translateX(0px)";
})
$mitt.on('emitToppingPanel', e => {
    vermi__container.value.style.transform = "translateX(1000px)"
})
$mitt.on('emitvermiPanel', e => {
    vermi__container.value.style.transform = "translateX(1000px)"
})

const closePanel = () => {
    vermi__container.value.style.transform = "translateX(1000px)"
}

</script>

<template>
    <div class="choose__container" ref="vermi__container">
        <div class="close" @click="closePanel">X</div>
        <h3 class="choose__Headline">choose your vermis</h3>
        <div class="vermis__select">
            <div class="vermi__block" v-for="vermi in vermisData" ref="selector">
                <div class="vermi__color" @click="emitDonunq" v-bind:style="{ backgroundColor: vermi.color }"></div>
                <div class="vermi__name">{{ vermi.eName }}</div>
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

.vermi__color {
    width: 3em;
    height: 1.5em;
    border-radius: 0.3em;
}

.vermi__name {
    display: none;
}

.vermi__block:hover .vermi__name,
.active {
    display: block;
    color: red;
}


.vermis__select {
    display: flex;
    flex-direction: row;
    gap: 1em;
}

#active {
    border: blue 1px solid;
}
</style>