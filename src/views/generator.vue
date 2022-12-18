<script setup>
import donutConfigurator from '../components/genny/generatorNav.vue';
import donutViewport from '../components/genny/threeViewport.vue';
import configPanels from '../components/genny/configurePanels.vue';
import { baseDonutUrl } from '../../config';
import { reactive } from 'vue';

const urlParams = new URLSearchParams(window.location.search),
    orderId = urlParams.get('orderId'),
    token = urlParams.get('token'),
    donutId = urlParams.get('donutId');
let donutData = reactive({ data: [] }),
    editDonut = JSON.parse(window.localStorage.getItem("editor")),
    donutType = reactive({ type: "" });

if (donutId && orderId && token) {
    fetch(baseDonutUrl + "/" + orderId + "/" + donutId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response =>
        response.json()
    ).then(data => {
        donutData.data = data.data
        donutType.type = "fetch"
    }).catch(
        error => console.log(error)
    )
} else {
    setTimeout(() => {
        if (editDonut) {
            donutData.data = editDonut
            donutType.type = "editor"
        }
        else {
            donutData.data = { extra: "maltesers", glaze: "#6c3b1e", topping: "#6c3b1e" }
            donutType.type = "fresh"
        }
    }, 100);
}
</script>

<template>
    <donutViewport :donutData="donutData" :donutType="donutType" />
    <donutConfigurator :donutType="donutType" />
    <configPanels :donutData="donutData" :donutType="donutType" />
</template>