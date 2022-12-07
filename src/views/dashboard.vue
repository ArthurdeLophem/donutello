<script setup>
import Dheader from '../components/dashboard/header.vue'
import Dorders from '../components/dashboard/orders.vue'
import { ref, reactive, onMounted } from 'vue';

onMounted(() => {
    const authUrl = 'http://localhost:3000/api/v1/users/auth'
fetch(authUrl, {
    method: 'POST',
    headers: {
       "Authorization" : "Bearer " + localStorage.getItem('token'),
    }
})
.then(res => {

if(res.status == 401) {
    window.location.href = '/login';
 }
   
}).catch(error => {
    console.log(error)
});

})

</script>
<template>
    <Dheader />
    <Dorders />
</template>