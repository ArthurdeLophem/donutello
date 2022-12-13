<script setup>
import { ref, watch } from 'vue';
import router from '../../router';
import { baseDonutUrl } from '../../../config';

let detailData,
    donutBlock = ref(),
    modal = ref(),
    donuts = [],
    token;

const urlParams = new URLSearchParams(window.location.search),
    orderId = urlParams.get('orderId');

const orderProps = defineProps({
    order: {
        type: Object,
        required: true
    },
    token: {
        type: Object,
        required: true
    }
});

watch(orderProps, () => {
    detailData = orderProps.order;
    token = JSON.stringify(orderProps.token.token).replace(/['"]+/g, '');
    detailData.donuts.forEach(el => {
        donuts.push(el);
    });
});

const editDonut = (index) => {
    donutBlock.value[index].style.transform = "translateX(-50vw)";
    modal.value.classList.add('active');
    modal.value.innerHTML = "configuring editor...";
    setTimeout(() => {
        router.push({ path: '/generator', query: { orderId: detailData._id, donutId: donuts[index]._id, token: token } })
    }, 1000);
}
</script>

<template>
    <div class="modal__alert" ref="modal">base alert modal</div>
    <div class="summary__container" ref="extra__container">
        <div class="summary__list">
            <div class="donut__block" v-for="(donut, index) in donuts" ref="donutBlock">
                <div class="donut__position">
                    <p ref="index">{{ (index + 1) }}.</p>
                </div>
                <div class="donut__card">
                    <div class="card__col">
                        <div class="data__container">
                            <p>sprinkles</p>
                            <p><strong>{{ donut.topping }}</strong></p>
                        </div>
                        <div class="data__container">
                            <p>extra</p>
                            <p><strong>{{ donut.extra }}</strong></p>
                        </div>
                    </div>
                    <div class="card__col">
                        <div class="data__container">
                            <p>glaze</p>
                            <p><strong>{{ donut.glaze }}</strong></p>
                        </div>
                        <div class="data__container">
                            <p>campaign size</p>
                            <p><strong>{{ donut.quantity }}</strong></p>
                        </div>
                    </div>
                    <div class="button__rounded edit" @click="editDonut(index)">
                        <img src="../../../public/assets/edit__btn.svg" alt="edit donut button">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal__alert {
    position: absolute;
    height: 3em;
    width: 30em;
    justify-content: center;
    align-items: center;
    background-color: #ed2970;
    color: white;
    font-weight: 600;
    border-radius: 2px;
    display: none;
    top: 2em;
}

.active {
    display: flex;
}

strong {
    color: #ed2970;
}

p {
    font-weight: bold;
}

.button__rounded {
    cursor: pointer;
    position: absolute;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-color: #ed2970;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateX(230px) translateY(90px);
}

.delete img {
    transform: translateX(-2px);
}

.edit {
    background-color: #1c1c1c;
    transform: translateX(230px) translateY(-40px);
}

.summary__container {
    width: 45%;
}

.summary__list {
    display: flex;
    flex-direction: column;
    gap: 4em;
}

.summary__Headline {
    font-size: 2.4em;
}

.donut__card {
    background-color: #EBEBEB;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    padding: 1em 3em;
    justify-content: space-around;
    gap: 4em;
}

.donut__block {
    transition: all 500ms ease-in;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2em;
}

.donut__position {
    background-color: #EBEBEB;
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
    padding: 0 20px;
}

.data__container {
    display: flex;
    flex-direction: row;
    gap: 1em;
}
</style>    