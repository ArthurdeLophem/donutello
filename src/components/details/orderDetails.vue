<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { baseDonutUrl } from '../../../config.js';
import router from '../../router';

let detailData = reactive({});

let orderdate = ref("");
let phone = ref("");
let mail = ref("");
let name = ref("");
let address = ref("");
let city = ref("");
let url = ref("");


let statusCheck = ref("");

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
    statusCheck.value = detailData.contact.orderstatus;

    let deleteBtn = document.querySelector(".container__btn--delete");
    if (statusCheck.value === "pending" || statusCheck.value === "completed") {
        deleteBtn.classList.remove("container__btn--hidden");
    }
});

const updateOrder = () => {
    let orderId = detailData._id;

    fetch(`${baseDonutUrl}/${orderId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify({
            status: statusCheck.value
        })
    })
        .then(res => res.json())
        .then(data => {
            let successMsg = document.querySelector(".container__text--success");
            successMsg.classList.remove("container__text--hidden");
        })
        .catch(err => {
            console.log(err);
            let errorMsg = document.querySelector(".container__text--error");
            errorMsg.classList.remove("container__text--hidden");
        });
}

const updateStatus = (i) => {
    statusCheck.value = i;
}

const deleteOrder = () => {
    fetch(`${baseDonutUrl}/${detailData._id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            router.push("/dashboard?order=deleted");
        })
        .catch(err => {
            console.log(err);
        });
}

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
            <p>status:</p>
            <div>
                <div class="status__checkbox">
                    <input class="status__box" type="radio" id="pending" name="statusCheck"
                        :checked="statusCheck === 'pending'" @click="updateStatus('pending')">
                    <label class="status__text">pending</label>
                </div>
                <div class="status__checkbox">
                    <input class="status__box" type="radio" id="inProgress" name="statusCheck"
                        :checked="statusCheck === 'in progress'" @click="updateStatus('in progress')">
                    <label class="status__text">in progress</label>
                </div>
                <div class="status__checkbox">
                    <input class="status__box" type="radio" id="completed" name="statusCheck"
                        :checked="statusCheck === 'completed'" @click="updateStatus('completed')">
                    <label class="status__text">completed</label>
                </div>
            </div>
        </div>
        <span class="container__text container__text--success container__text--hidden">Order status succesfully
            updated</span>
        <span class="container__text container__text--error container__text--hidden">Internal Server Error</span>
        <div class="button__container">
            <div @click="updateOrder" class="btn__primary">save</div>
            <div @click="deleteOrder" class="btn__primary container__btn--delete container__btn--hidden">
                delete order</div>
        </div>
    </div>
</template>
<style scoped>
.details__container {
    position: sticky;
    top: 2em;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 35%;
}

.container__info {
    display: flex;
    flex-direction: column;
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

.container__btn--delete {
    background-color: #000000;
}

.container__btn--hidden {
    display: none;
}

.container__btn--delete:hover {
    color: #ed2970;
}

.container__text {
    font-size: 1rem;
    font-weight: 600;
}

.container__text--success {
    color: green;
}

.container__text--error {
    color: red;
}

.container__text--hidden {
    display: none;
}

.container__status {
    display: flex;
    flex-direction: column;
}

.container__status div {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    gap: 0.3em;
}

.status__checkbox {
    display: flex;
    align-items: center;
}

.button__container {
    display: flex;
    gap: 8em;
    margin-bottom: 2em;
    align-items: center;
}

.logo__img {
    width: 20rem;
}

.btn__primary {
    font-weight: 600;
}
</style>