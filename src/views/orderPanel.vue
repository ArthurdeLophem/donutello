<script setup>
import oSummary from '../components/orderSummary.vue'
import pInfo from '../components/paymentInfo.vue'
import lHeader from '../components/landingHeader.vue'
import { watch, ref, reactive } from 'vue';
import { cloudPreset, mainUrl } from '../../config';


const isCompleted = ref(false);

const orderData = ref({ data: [] });

let orderdate = ref("");
let phone = ref("");
let mail = ref("");
let name = ref("");
let address = ref("");
let city = ref("");
let donuts = reactive([]);
let orderToken = ref("");
let editLink = ref("");
let orderId = ref("");
let previewLink = ref("");
let logoUrl = ref("");

watch(isCompleted, () => {
    console.log("updated");
    if (isCompleted.value) {
        document.querySelector('.content__container').classList.add('content__container--hidden');
        document.querySelector('.completed').classList.remove('completed--hidden');
        orderdate.value = orderData.value.donut.orderdate;
        phone.value = orderData.value.donut.contact.phone;
        mail.value = orderData.value.donut.contact.mail;
        name.value = orderData.value.donut.contact.name;
        address.value = orderData.value.donut.contact.address;
        city.value = orderData.value.donut.contact.city;
        donuts.data = orderData.value.donut.donuts;
        orderToken.value = orderData.value.token;
        logoUrl.value = orderData.value.donut.card.url;
        orderId.value = orderData.value.donut._id;

        editLink.value = `${mainUrl}overview?orderId=${orderId.value}&token=${orderToken.value}`;
        previewLink.value = `${mainUrl}previewer?orderId=${orderId.value}&donutId=`;

        let logoDiv = document.querySelector(".order__logo");
        if (logoUrl.value === "") {
            logoDiv.classList.add("order__logo--hidden");
        }

    }
})

const updateIsComplete = (value) => {
    isCompleted.value = value;
}

const getData = (data) => {
    orderData.value = data;
}

const copyLink = () => {
    navigator.clipboard.writeText(editLink.value);
}

const copyPreviewLink = (donutId) => {
    let link = previewLink.value + donutId;
    navigator.clipboard.writeText(link);
}

</script>
<template>
    <lHeader class="header" />
    <div class="content__container">
        <oSummary />
        <pInfo @isCompleted="updateIsComplete" @data="getData" />
    </div>
    <div class="completed completed--hidden">
        <div class="completed__order">
            <h2 class="order__title">Order Placed</h2>
            <h3 class="order__subtitle">Thank you for placing your order!</h3>
            <span class="order__text">{{ new Date(orderdate).toLocaleDateString("en-GB") }}</span>
            <span class="order__text">{{ name }}</span>
            <span class="order__text">{{ mail }}</span>
            <span class="order__text">{{ phone }}</span>
            <span class="order__text">{{ address }}</span>
            <span class="order__text">{{ city }}</span>
            <h3 class="order__subtitle">Order summary</h3>
            <ul class="order__donuts">
                <li v-for="donut, index in donuts.data" class="donuts__item">
                    <span class="item__name">Donut {{ index + 1 }}</span>
                    <div class="item__specs">
                        <span class="specs__text specs__text--bold">Sprinkles:</span>
                        <span class="specs__text">{{ donut.topping }}</span>
                    </div>
                    <div class="item__specs">
                        <span class="specs__text specs__text--bold">Glaze:</span>
                        <span class="specs__text">{{ donut.glaze }}</span>
                    </div>
                    <div class="item__specs">
                        <span class="specs__text specs__text--bold">Extra:</span>
                        <span class="specs__text">{{ donut.extra }}</span>
                    </div>
                    <div class="item__specs">
                        <span class="specs__text specs__text--bold">Campaign size:</span>
                        <span class="specs__text">{{ donut.quantity }}</span>
                    </div>
                </li>
            </ul>
            <div class="order__logo">
                <h3 class="logo__text">Company logo</h3>
                <img class="logo__img" :src="logoUrl" alt="logo">
            </div>
            <h3 class="order__subtitle">Order links</h3>
            <p class="order__disclaimer">DISCLAIMER<br>
                Once you leave this page you will forever lose these links!<br>
                Make sure to copy them somewhere for once you lose the link you will not be able to retrieve it</p>
            <span class="order__text">Edit link:</span>
            <span class="order__text order__text--link" @click="copyLink">CopyEditLink</span>
            <span class="order__text">Share links:</span>
            <ul class="order__share">
                <li class="share__link" v-for="donut, index in donuts.data">
                    <span class="order__text order__text--link"
                        @click="copyPreviewLink(donut._id)">CopyDonutPreviewLink{{ index + 1 }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.content__container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.content__container--hidden {
    display: none;
}

.completed {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    background-image: url('https://res.cloudinary.com/dgypufy9k/image/upload/v1670855818/donunq/sint_donuttello_no9qwp.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow-y: hidden;
}

.completed--hidden {
    display: none;
}

.completed__order {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding-bottom: 1rem;
    overflow-y: auto;
    scrollbar-width: none;
}

.completed__order::-webkit-scrollbar {
    display: none;
}

.order__donuts {
    list-style-type: none;
    padding-left: .5rem;
    margin-top: .1rem;
}

.order__text--link {
    padding: .2rem 0;
    font-weight: 400 !important;
}

.order__text--link:hover {
    cursor: pointer;
    color: #ed2970;
}

.order__share {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    padding: .2rem 0;
}

.order__disclaimer {
    font-size: .8rem;
    font-weight: 400;
    margin-top: 1rem;
    color: red;
    text-align: center;
    width: 40%;
}

.donuts__item {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #000000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
}

.donuts__item:last-of-type {
    border-bottom: none;
}

.order__logo--hidden {
    display: none;
}

.item__specs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.order__donuts {
    width: 25%;
    text-align: center;
}

.item__name {
    font-weight: 600;
    font-size: 1.2rem;
}

.specs__text {
    color: #ed2970;
    font-weight: 500;
}

.specs__text--bold {
    font-weight: 600;
    color: #000000;
}

.order__text {
    font-weight: 500;
    font-size: 1.2rem;
    padding: .2rem 0;
}

.logo__img {
    width: 20rem;
}
</style>