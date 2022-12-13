<script setup>
import donutConfigurator from '../components/generatorNav.vue';
import donutViewport from '../components/threeViewport.vue';
import configPanels from '../components/configurePanels.vue';
import { baseDonutUrl } from '../../config';
import { reactive } from 'vue';

const urlParams = new URLSearchParams(window.location.search),
    orderId = urlParams.get('orderId'),
    token = urlParams.get('token'),
    donutId = urlParams.get('donutId')
let donutData

if (donutId && orderId && token) {
    fetch(baseDonutUrl + "/" + orderId + "/" + donutId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response =>
        response.json()
    ).then(data => {
        donutData = data.data
        console.log(donutData)
        // bakeDonut();
    }).catch(
        error => console.log(error)
    )
}

</script>

<template>
    <donutViewport />
    <donutConfigurator />
    <configPanels />
</template>