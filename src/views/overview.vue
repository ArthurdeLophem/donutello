<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import oDonuts from '../components/overview/overviewDonuts.vue'
import oDetails from '../components/overview/overviewDetails.vue'
import lHeader from '../components/landingHeader.vue'
import router from '../router';
import { baseDonutUrl } from '../../config';

let order = reactive({ data: [] }),
    tokenProp = reactive({ token: "" });
const urlParams = new URLSearchParams(window.location.search),
    orderId = urlParams.get('orderId'),
    token = urlParams.get('token');

onMounted(() => {
    // let token = window.location.href.split('?')[1].split('=')[1].split('&')[1];
    tokenProp.token = token
    fetch(baseDonutUrl + "/auth", {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
        }
    }).then(res => {
        if (res.status == 401) {
            router.push({ name: 'Home' })
        }
    }).catch(error => {
        console.log(error)
    });
});

// const donutId = window.location.href.split('?')[1].split('=')[1].split('&')[0];
fetch(baseDonutUrl + "/" + orderId, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response =>
    response.json()
).then(data => {
    // console.log(data)
    order.data = data.data
    console.log(order.data);
}).catch(
    error => console.log(error)
)
</script>

<template>
    <lHeader />
    <div class="content__container">
        <oDonuts :order="order.data" :token="tokenProp" />
        <oDetails :order="order.data" />
    </div>
</template>

<style scoped>
.content__container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: fit-content;
    margin-top: 5rem;
    gap: 10rem;
}
</style>