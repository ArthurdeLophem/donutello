<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { extrasData, glazesData, toppingsData } from '../configs/donuttelloData';
import router from './../router';
import $mitt from '../scripts/mitt.js';

let selector = ref([]),
    topping__container = ref(),
    glaze__container = ref(),
    extra__container = ref(),
    topping__name = ref(),
    glaze__name = ref(),
    extra__name = ref(),
    targetObj, activePanel, donutData = { extra: "maltesers", glaze: "choco", topping: "choco" };

const showActiveSelect = (e) => {
    switch (activePanel) {
        case "extra":
            extra__name.value.forEach(el => {
                el.classList.remove("active")
            })
            e.target.nextElementSibling.classList.add("active")
            break;
        case "glaze":
            glaze__name.value.forEach(el => {
                el.classList.remove("active")
            })
            e.target.nextElementSibling.classList.add("active")
            break;
        case "topping":
            topping__name.value.forEach(el => {
                el.classList.remove("active")
            })
            e.target.nextElementSibling.classList.add("active")
            break;
    }
}

const emitDonunq = (e) => {
    showActiveSelect(e);
    switch (activePanel) {
        case "extra":
            targetObj = extrasData.find(el => el.eName == e.target.nextElementSibling.innerText);
            $mitt.emit('emitExtras', { 'extraType': targetObj.eName });
            donutData.extra = targetObj.eName;
            break;
        case "glaze":
            targetObj = glazesData.find(el => el.eName == e.target.nextElementSibling.innerText);
            $mitt.emit('emitGlazes', { 'glazeColor': targetObj.color });
            donutData.glaze = targetObj.eName;
            break;
        case "topping":
            targetObj = toppingsData.find(el => el.eName == e.target.nextElementSibling.innerText);
            $mitt.emit('emitToppings', { 'toppingColor': targetObj.color });
            donutData.glaze = targetObj.eName;
            break;
    }
}

$mitt.on('emitExtraPanel', () => {
    extra__container.value.style.transform = "translateX(0px)";
    topping__container.value.style.transform = "translateX(1000px)";
    glaze__container.value.style.transform = "translateX(1000px)";
    activePanel = "extra";
})
$mitt.on('emitGlazePanel', () => {
    glaze__container.value.style.transform = "translateX(0px)";
    extra__container.value.style.transform = "translateX(1000px)";
    topping__container.value.style.transform = "translateX(1000px)";
    activePanel = "glaze";
})
$mitt.on('emitToppingPanel', () => {
    topping__container.value.style.transform = "translateX(0px)";
    glaze__container.value.style.transform = "translateX(1000px)";
    extra__container.value.style.transform = "translateX(1000px)";
    activePanel = "topping";
})
$mitt.on('saveToStorage', () => {
    const donuts = []
    if (window.localStorage.getItem('donuts')) {
        let donutArr = (JSON.parse(window.localStorage.getItem('donuts')))
        donutArr.forEach(el => donuts.push(el))
    }
    donuts.push(donutData)
    window.localStorage.setItem('donuts', JSON.stringify(donuts))
    console.log(donuts)
    setTimeout(() => {
        $mitt.all.clear();
        router.push({ name: 'Order' })
    }, 1000)
})

const closePanel = (e) => {
    e.target.parentElement.style.transform = "translateX(1000px)"
}

const defaultActive = () => {
    targetObj = { extra: "maltesers", glaze: "choco", topping: "choco" }
    selector.value.forEach(el => {
        if (el.children[1].innerHTML == targetObj.extra) {
            el.children[1].classList.add("active")
        }
        if (el.children[1].innerHTML == targetObj.glaze) {
            el.children[1].classList.add("active")
        }
        if (el.children[1].innerHTML == targetObj.topping) {
            el.children[1].classList.add("active")
        }
    })
}

onMounted(() => {
    defaultActive();
})
</script>

<template>
    <div class="interactive__panel">
        <div class="choose__container" ref="extra__container">
            <div class="close" @click="closePanel">X</div>
            <h3 class="choose__Headline">choose your extras</h3>
            <div class="select__container">
                <div class="select__block" v-for="extra in extrasData" ref="selector">
                    <div class="select__color" @click="emitDonunq" v-bind:style="{ backgroundColor: extra.color }">
                    </div>
                    <div class="select__name" ref="extra__name">{{ extra.eName }}</div>
                </div>
            </div>
        </div>
        <div class="choose__container" ref="glaze__container">
            <div class="close" @click="closePanel">X</div>
            <h3 class="choose__Headline">choose your glaze</h3>
            <div class="select__container">
                <div class="select__block" v-for="glaze in glazesData" ref="selector">
                    <div class="select__color" v-on:click="emitDonunq" v-bind:style="{ backgroundColor: glaze.color }">
                    </div>
                    <div class="select__name" ref="glaze__name">{{ glaze.eName }}</div>
                </div>
            </div>
        </div>
        <div class="choose__container" ref="topping__container">
            <div class="close" @click="closePanel">X</div>
            <h3 class="choose__Headline">choose your sprinkles</h3>
            <div class="select__container">
                <div class="select__block" v-for="topping in toppingsData" ref="selector">
                    <div class="select__color" @click="emitDonunq" v-bind:style="{ backgroundColor: topping.color }">
                    </div>
                    <div class="select__name" ref="topping__name">{{ topping.eName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.interactive__panel {
    right: 0;
    height: 100vh;
    position: absolute;
}

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

.select__color {
    width: 3em;
    height: 1.5em;
    border-radius: 0.3em;
}

.select__name {
    /* display: none; */
    opacity: 0;
    position: absolute;
    font-weight: 600;
}

.select__block:hover .select__name {
    /* display: block; */
    opacity: 1;
    color: red;
}

.active {
    opacity: 1;
    color: red;
}

.select__container {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    row-gap: 2em;
    column-gap: 1em;
}
</style>