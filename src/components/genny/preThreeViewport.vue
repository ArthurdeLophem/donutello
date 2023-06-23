<script setup>
import { ref, onMounted } from 'vue';
import Donunq from "../../scripts/donutGenerator.js";
import { baseDonutUrl } from '../../../config';
import router from '../../router';
import { glazesData, toppingsData } from '../../configs/donuttelloData';

const donutViewport = ref(""),
    donunq = new Donunq(),
    editDonut = JSON.parse(window.localStorage.getItem("previewer")),
    urlParams = new URLSearchParams(window.location.search),
    orderId = urlParams.get('orderId'),
    donutId = urlParams.get('donutId');
let donut = {}

const generateCanvas = async () => {
    donunq.createScene(donutViewport.value);
    donunq.createDonunq();
}

const bakeDonut = () => {
    console.log(donut)
    let topping = toppingsData.find(el => el.eName == donut.topping)
    let glaze = glazesData.find(el => el.eName == donut.glaze)
    setTimeout(() => {
        donunq.configureExtras(donut.extra);
        donunq.configureGlaze(glaze.color);
        donunq.configureTopping(topping.color);
    }, 500)
}

// fetch(baseDonutUrl + "/" + orderId + "/" + donutId, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         "Authorization": "Bearer " + localStorage.getItem('token')
//     }
// }).then(response =>
//     response.json()
// ).then(data => {
//     donut = data.data
//     bakeDonut();
// }).catch(
//     error => console.log(error)
// )

const previousTab = () => {
    router.go(-1)
}

onMounted(() => {
    generateCanvas()
})
</script>

<template>
    <div class="donutViewport" ref="donutViewport"></div>
    <h1 class="generator__heading">create <strong>your</strong> donut</h1>
    <div class="gen__nav">
        <div class="order__enticing">
            <div class="btn__primary" @click="previousTab">
                <p class="btn__text">go back to order</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.donutViewport {
    height: 100%;
    width: 100%;
}

strong {
    color: #ed2970;
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
    justify-content: flex-end;
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