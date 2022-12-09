<script setup>
import oSummary from '../components/orderSummary.vue'
import pInfo from '../components/paymentInfo.vue'
import lHeader from '../components/landingHeader.vue'
</script>
<template>
    <lHeader class="header" />
    <div class="content__container">
        <oSummary />
        <pInfo />
    </div>
</template>

<style scoped>
.header {
    margin-bottom: 3em;
}

.content__container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>