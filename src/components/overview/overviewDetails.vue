<script setup>
import { ref, reactive, watch } from 'vue'

let detailData = reactive({});

let orderdate = ref("");
let phone = ref("");
let mail = ref("");
let name = ref("");
let address = ref("");
let city = ref("");
let url = ref("");
let status = ref("");

const detailProps = defineProps({
    order: {
        type: Object,
        required: true
    }
});

watch(detailProps, () => {
    detailData = detailProps.order;
    orderdate.value = detailData.orderdate;
    phone.value = detailData.contact.phone;
    mail.value = detailData.contact.mail;
    name.value = detailData.contact.name;
    address.value = detailData.contact.address;
    city.value = detailData.contact.city;
    url.value = detailData.card.url;
    status.value = detailData.contact.orderstatus;
});

</script>
<template>
    <div class="details__container">
        <div class="container__info">
            <h2 class="info__title">Order details</h2>
            <span class="info__text">{{ new Date(orderdate).toLocaleDateString("en-GB") }}</span>
            <span class="info__text">{{ name }}</span>
            <span class="info__text">{{ mail }}</span>
            <span class="info__text">{{ phone }}</span>
            <span class="info__text">{{ address }}</span>
            <span class="info__text">{{ city }}</span>
        </div>
        <div class="container__logo" v-if="url != ''">
            <h3 class="logo__title">Company logo</h3>
            <img class="logo__img" :src="url" alt="logo">
        </div>
    </div>
</template>
<style scoped>
.details__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 35%;
}

.container__info {
    display: flex;
    flex-direction: column;
    margin-right: 5rem;
}

.info__text {
    width: 100%;
    height: 2.5rem;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    color: #000000;
    background: none;
    margin-top: 1rem;
}

.logo__img {
    width: 20rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>