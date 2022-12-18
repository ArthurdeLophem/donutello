<script setup>
import Dheader from '../components/dashboard/header.vue'
import Dorders from '../components/dashboard/orders.vue'
import { ref, reactive, onMounted } from 'vue';
import router from '../router';
import { authUrl } from '../../config.js';

const jwtToken = ref(localStorage.getItem('token'));

if (!jwtToken.value) { router.push('/login'); }
if (!new RegExp(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/).test(jwtToken.value)) { router.push('/login'); }
fetch(authUrl, {
    method: 'POST',
    headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
    }
})
    .then(res => {

        if (res.status == 401) {
            router.push('/login');
        }

    }).catch(error => {
        console.log(error)
    });
</script>

<template>
    <Dheader />
    <Dorders />
</template>