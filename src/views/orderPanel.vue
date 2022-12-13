<script setup>
import oSummary from '../components/orderSummary.vue'
import pInfo from '../components/paymentInfo.vue'
import lHeader from '../components/landingHeader.vue'
import { watch, ref } from 'vue';


const isCompleted = ref(false);

watch(isCompleted, () => {
    console.log("updated");
    if(isCompleted == true) {
        document.querySelector('.content__container').classList.add('content__container--hidden');
        document.querySelector('.completed').classList.remove('completed--hidden');
    }
})


</script>
<template>
    <lHeader class="header" />
    <div class="content__container">
        <oSummary />
        <pInfo />
    </div>
    <div class="completed completed--hidden">
        <div class="completed__order">
            <h2 class="order__title">Order Placed</h2>
            <h3 class="order__subtitle">Thank you for placing your order!</h3>
            <span class="order__text">date</span>
            <span class="order__text">name</span>
            <span class="order__text">mail</span>
            <span class="order__text">phone</span>
            <span class="order__text">adress</span>
            <span class="order__text">city</span>
            <h3 class="order__subtitle">Order summary</h3>
            <ul class="order__donuts">
                <li class="donuts__item">    
                    <span class="item__name">donut 1</span>
                    <div class="item__specs">
                        <span class="specs__text">Sprinkles:</span>
                        <span class="specs__text">choco</span>
                    </div>
                    <div class="item__specs">
                        <span class="specs__text">Glaze:</span>
                        <span class="specs__text">cherry</span>    
                    </div>
                    <div class="item__specs">
                        <span class="specs__text">Extra:</span>
                        <span class="specs__text">maltesers</span>
                    </div>
                    <div class="item__specs">
                        <span class="specs__text">Campaign size:</span>
                        <span class="specs__text">50</span>
                    </div>
                </li>
            </ul>
            <div class="order__logo">
                <h3 class="logo__text">Company logo</h3>
                <img class="logo__img" src="" alt="logo">
            </div>
            <h3 class="order__subtitle">Order links</h3>
            <span class="order__text">Edit link:</span>
            <span class="order__text order__text--link">generalEditLink</span>
            <span class="order__text">Share links:</span>
            <ul class="order__share">
                <li class="share__link">donutviewlink</li>
            </ul>
        </div>            
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

.content__container--hidden {
    display: none;
}

.completed {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

.completed--hidden {
    display: none;
}

.completed__order {
    display: flex;
    align-items: left;
    flex-direction: column;
}

.order__donuts {
    list-style-type: none;
    padding-left: .5rem;
    margin-top: .1rem;
}

.order__text--link {
    padding: .2rem 0;
}

.order__share {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    padding: .2rem 0;
}

</style>