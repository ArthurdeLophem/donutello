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
        // console.log(orders.data);
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
            <div class="orders__card" v-for="order in orders.data">
                <span class="card__text">Order:</span>
                <h3 class="card__title">{{ order.contact.name }}</h3>
                <span class="card__text">Request Date:</span>
                <span class="card__text card__text--pink">{{ sliceDate(order.orderdate) }}</span>
                <router-link :to="('/details?orderid=' + order._id)" class="card__btn">details</router-link>
            </div>
        </div>
    </div>
</template>
<style scoped>
.dashboard {
    width: 100%;
    height: 100vh;
    background-image: url('https://res.cloudinary.com/dgypufy9k/image/upload/v1670855818/donunq/sint_donuttello_no9qwp.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow-y: hidden;

}

.dashboard__filter {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 3vh;

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
    margin-top: 5rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    box-sizing: border-box;
    gap: 3rem;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 0 2rem 3vh 2rem;
    padding-bottom: 10rem;
}

.dashboard__orders::-webkit-scrollbar {
    display: none;
}

.orders__card {
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 12.5%;
    height: fit-content;
    padding: 2rem 2rem;
    border-radius: 20px;
    box-shadow: 0px 5px 7px -2px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;

}


.card__text {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0.5rem 0;
}

.card__text--pink {
    color: #ed2970;
    margin-bottom: 1rem;
}

.card__title {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0.5rem 0;
    word-wrap: break-word;
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