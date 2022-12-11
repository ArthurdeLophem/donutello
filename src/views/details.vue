<script setup>
import { ref, reactive, onMounted } from 'vue';
import Dheader from '../components/dashboard/header.vue'
import orderDetails from '../components/details/orderDetails.vue'

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
    <div class="content__container">
        <orderDetails />
    </div>
</template>
<style scoped>
</style>