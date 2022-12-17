<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import $mitt from '../scripts/mitt';
let campaign__container = ref(),
    campaign__size = ref(),
    donutType,
    sButton = ref(),
    cButton = ref()

const openCampaign = (e) => {
    campaign__container.value.classList.add("activePanel")
}

const donutProps = defineProps({
    donutType: {
        type: Object,
        required: true
    }
});

watch(donutProps, () => {
    donutType = JSON.stringify(donutProps.donutType.type).replace(/['"]+/g, '');
    if (donutType == "fetch") {
        cButton.value.innerHTML = sButton.value.innerHTML = "update order"
    }
    if (donutType == "editor") {
        cButton.value.innerHTML = sButton.value.innerHTML = "save to order"
    }
    if (donutType == "fresh") {
        cButton.value.innerHTML = sButton.value.innerHTML = "save to order"
    }
});

const submitDonut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("editor")
    $mitt.emit('saveToStorage', { 'campaignSize': parseInt(campaign__size.value.value) });
}

const closePanel = (e) => {
    campaign__container.value.classList.remove("activePanel")
}
</script>

<template>
    <h1 class="generator__heading">create <strong>your</strong> donut</h1>
    <div class="gen__nav">
        <div class="order__overview">
            <div class="ingr__card">
                <p>topping</p>
                <p><strong>marshmallow</strong></p>
            </div>
            <div class="ingr__card">
                <p>glazuur</p>
                <p><strong>roze kers</strong></p>
            </div>
        </div>
        <div class="order__enticing">
            <div class="price__card">
                <p class="price__amount">$5</p>
                <p class="price__quantity">/donut</p>
            </div>
            <div class="btn__primary" @click="openCampaign">
                <p class="btn__text" ref="sButton"></p>
            </div>
            <div class="campaign__container" ref="campaign__container">
                <div class="campaign__header">
                    <h3><strong>campaign</strong> size:</h3>
                    <p @click="closePanel">X</p>
                </div>
                <div class="campaign__interactive">
                    <input ref="campaign__size" type="number" step="5" name="campaign" inputmode="numeric" min="20"
                        value="20" max="150" id="" required>
                    <div class="btn__primary" @click="submitDonut">
                        <p class="btn__text" ref="cButton"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
strong {
    color: #ed2970;
}

.campaign__container {
    height: 200px;
    width: 400px;
    position: fixed;
    background-color: #EBEBEB;
    transform: translatex(50em) translateY(-3em);
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    justify-content: space-around;
    transition: all 250ms;
}

.activePanel {
    transform: translatex(-1em) translateY(-3em);
}

.campaign__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 1em;
    height: auto;
}

.campaign__header h3,
.campaign__header p {
    margin: 0;
}

.campaign__header p {
    cursor: pointer;
}


.campaign__interactive {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 3em;
}

input {
    padding: 0.5em 1em;
    background-color: #99999b;
    border: none;
    color: black;
    font-weight: 600;
    font-size: 1.5em;
    border-radius: 3px;
    transition: all 250ms;
    width: 50px;
    height: 50px;
    align-self: center;
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input:focus {
    outline: none !important;
    border: 2px solid #ed2970;
    box-shadow: 0 0 5px #ed2970;
}

.generator__heading {
    font-size: 2.4em;
    position: absolute;
    transform: translateX(1em) translateY(1em);
}

.gen__nav {
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 2em 0;
    gap: 10em;
    justify-content: space-between;
    align-items: center;
    margin: 0 2em;
}

.order__enticing,
.order__overview {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2em;
}

.ingr__card {
    background-color: #EBEBEB;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 25px;
    gap: 2em;
}

.ingr__card p {
    font-weight: bold;
}

.price__card {
    background-color: #EBEBEB;
    border-radius: 18px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 20px;
}

.price__amount {
    font-size: 1.8em;
    font-weight: bold;
}

.price__quantity {
    font-weight: bold;
}
</style>