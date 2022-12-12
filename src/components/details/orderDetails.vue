<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

let detailData = reactive({});

let orderdate = ref("");
let phone = ref("");
let mail = ref("");
let name = ref("");
let address = ref("");
let city = ref("");
let url = ref("");

let status = ref("");

const test = () => {
    console.log(status.value);
}

const detailProps = defineProps({
    order: {
        type: Object,
        required: true
    }
});

watch(detailProps, () => {
    console.log("updated");
    detailData = detailProps.order;
    orderdate.value = detailData.orderdate;
    phone.value = detailData.contact.phone;
    mail.value = detailData.contact.mail;
    name.value = detailData.contact.name;
    address.value = detailData.contact.address;
    city.value = detailData.contact.city;
    url.value = detailData.card.url;

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
        <div class="container__status">
            <div class="status__checkbox">
                <input v-model="status" class="status__box" type="radio" name="statusCheck" checked="true" value="0">
                <label class="status__text">pending</label>
            </div>
            <div class="status__checkbox">
                <input v-model="status" class="status__box" type="radio" name="statusCheck" value="1">
                <label class="status__text">in progress</label>
            </div>
            <div class="status__checkbox">
                <input v-model="status" class="status__box" type="radio" name="statusCheck" value="2">
                <label class="status__text">completed</label>
            </div>
        </div>
        <button @click="test" class="container__btn">save</button>
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

.logo__download {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.download__btn {
    margin-left: 3rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0;
    background-color: #ed2970;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
}

.container__btn {
    margin-top: 3rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0;
    background-color: #ed2970;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    width: 10rem;
    height: 3rem;
    cursor: pointer;
}

.container__status {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.status__checkbox {
    display: flex;
    align-items: center;
}

.logo__img {
    width: 20rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

</style>