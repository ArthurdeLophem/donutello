<script setup>
import { ref, reactive, onMounted } from 'vue';
import { baseDonutUrl } from '../../../config';

let orders = reactive({ data: [] });

onMounted(() => {
    fetch(baseDonutUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response =>
        response.json()
    ).then(data => {
        // console.log(data)
        orders.data = data.data
        console.log(orders.data);
    }).catch(
        error => console.log(error)
    )
});

const sliceDate = ((date) => {
    return date.slice(0, 10);
})
</script>

<template>
    <div class="dashboard">
        <div class="dashboard__orders">
            <div class="card__container" v-for="order in orders.data">
                <div class="enticing__example">
                    <div class="example__card">
                        <img class="example__img" src="/assets/shopping_bag.png" alt="3d shopping bag">
                        <div class="example__info">
                            <div class="company__info">
                                <div class="company__logo"></div>
                                <h3>{{ order.contact.name }}</h3>
                            </div>
                            <div class="donut__flav--cont">
                                <div class="flav__type">
                                    <p class="">extra</p>
                                    <p class="">glaze</p>
                                    <p class="">topping</p>
                                </div>
                                <div class="donut__flavs">
                                    <p>{{ order.donuts[0].extra }}</p>
                                    <p>{{ order.donuts[0].glaze }}</p>
                                    <p>{{ order.donuts[0].topping }}</p>
                                </div>
                            </div>
                            <div class="donut__data">
                                <p><strong>{{ sliceDate(order.contact.orderstatus) }}</strong></p>
                                <p><strong>{{ sliceDate(order.orderdate) }}</strong></p>
                            </div>
                        </div>
                        <router-link :to="('/details?orderid=' + order._id)" class="btn__primary">details</router-link>
                    </div>
                </div>
                <div class="background__texture--circle"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.dashboard {
    width: 100%;
    height: 100vh;
    /* background-image: url('https://res.cloudinary.com/dgypufy9k/image/upload/v1670855818/donunq/sint_donuttello_no9qwp.webp'); */
    /* background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed; */
    overflow: hidden;
}

.btn__primary {
    align-self: center;
    margin: 2em 0;
}

.donut__flav--cont {
    display: grid;
    grid-template-columns: 8.75em 8.75em;
    font-weight: 600;
    margin: 0.5em 0;
}

.donut__flavs {
    place-self: end;
    text-align: end;
    color: #ed2970;
}

.flav__type {
    opacity: 0.8;
    place-self: center;
}

.donut__flavs p,
.flav__type p {
    margin: 0.5em 0;
}

.card__container {
    height: 550px;
}

.donut__flav--column p {
    padding: 0;
    margin: 0;
}

.dashboard__filter {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 3vh;
}

.example__card {
    height: fit-content;
    width: 320px;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
}

.background__texture--circle {
    z-index: -2;
    position: relative;
    width: 260px;
    height: 260px;
    border-radius: 100%;
    background-color: #ed2970;
    opacity: 36%;
    transform: translateX(160px) translateY(-240px);
}

.example__img {
    height: 80px;
    margin: 2em auto;
}

.company__info {
    margin: 0em 1.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
}

.company__logo {
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 100%;
}

.company__info h3 {
    font-weight: 800;
}

.donut__data {
    margin: 0em 1.5em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.filter__btn {
    background-color: #ed2970;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 10rem;
    height: 3rem;
    margin: 0 2em;
    border-radius: 5px;
}

.btn__text {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
}

.dashboard__orders {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-content: space-evenly;
    box-sizing: border-box;
    gap: 3rem;
    max-width: 100%;
    overflow-x: hidden;
    scrollbar-width: none;
    padding: 0 2rem 3vh 2rem;
}

.dashboard__orders::-webkit-scrollbar {
    display: none;
}

.card__btn {
    background-color: #ed2970;
    color: white;
    font-size: 1.5rem;
    width: 100%;
    height: 3rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}
</style>   