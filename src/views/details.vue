<script setup>
import { ref, reactive, onMounted } from 'vue';
import Dheader from '../components/dashboard/header.vue'
import summaryDetails from '../components/details/summaryDetails.vue'
import orderDetails from '../components/details/orderDetails.vue'
import { baseDonutUrl } from '../../config';

let order = reactive({ data: [] });
const donutId = window.location.href.split('?')[1].split('=')[1];

onMounted(() => {
    const authUrl = 'http://localhost:3000/api/v1/users/auth'
    fetch(authUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        }
    })
        .then(res => {

            if (res.status == 401) {
                window.location.href = '/login';
            }

        }).catch(error => {
            console.log(error)
        });

})

fetch(baseDonutUrl + "/" + donutId, {
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
    <Dheader />
    <div class="content__container">
        <summaryDetails :order="order.data" />
        <orderDetails :order="order.data" />
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