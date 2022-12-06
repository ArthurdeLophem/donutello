<script setup>
import { ref, reactive, onMounted } from 'vue';
import $mitt from '../scripts/mitt.js';

let topping = ref("chocolat"),
    selector = ref([]),
    topping__container = ref(),
    targetObj

const toppingsData = [
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
    targetObj = toppingsData.find(el => el.eName == event.target.nextElementSibling.innerText);
    $mitt.emit('emitTopping', { 'toppingColor': targetObj.color });
}

$mitt.on('emitToppingPanel', e => {
    topping__container.value.style.transform = "translateX(0px)"
})
$mitt.on('emitVermiPanel', e => {
    topping__container.value.style.transform = "translateX(1000px)"
})
$mitt.on('emitExtraPanel', e => {
    topping__container.value.style.transform = "translateX(1000px)"
})
$mitt.on('requestingDonutData', () => {
    $mitt.emit('topping__data', { 'topping__data': targetObj.color });
})

const closePanel = () => {
    topping__container.value.style.transform = "translateX(1000px)"
}

const defaultActive = () => {
    let defaultTopping;
    selector._rawValue.forEach(el => {
        if (el.children[1].innerHTML === "choco") {
            targetObj = defaultTopping = el.children[1]
        }
    })
    defaultTopping.classList.add("active")
}

onMounted(() => {
    defaultActive();
})
</script>

<template>
    <div class="choose__container" ref="topping__container">
        <div class="close" @click="closePanel">X</div>
        <h3 class="choose__Headline">choose your topping</h3>
        <div class="toppings__select">
            <div class="topping__block" v-for="topping in toppingsData" ref="selector">
                <div class="topping__color" v-on:click="emitDonunq" v-bind:style="{ backgroundColor: topping.color }">
                </div>
                <div class="topping__name">{{ topping.eName }}</div>
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

.topping__color {
    width: 3em;
    height: 1.5em;
    border-radius: 0.3em;
}

.topping__name {
    display: none;
}

.topping__block:hover .topping__name,
.active {
    display: block;
    color: red;
}


.toppings__select {
    display: flex;
    flex-direction: row;
    gap: 1em;
}

#active {
    border: blue 1px solid;
}
</style>