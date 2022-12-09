<script setup>
import { ref } from 'vue';
const email = ref();
const gsm = ref();
const bedrijfsnaam = ref();
const adress = ref();
const stad = ref();

const businessData = ref({ email: email, gsm: gsm, bedrijfsnaam: bedrijfsnaam, adress: adress, stad: stad });
const placeOrder = () => {
    console.log(businessData._rawValue)
}
</script>

<template>
    <div class="payment__container">
        <h3>leave us <strong>your</strong> info behind!</h3>
        <div class="payment__info">
            <input v-model="email" placeholder="email" />
            <input v-model="gsm" placeholder="gsm" />
            <input v-model="bedrijfsnaam" placeholder="bedrijfsnaam" />
            <input v-model="adress" placeholder="adress" />
            <input v-model="stad" placeholder="stad" />
        </div>
        <div class="btn__primary" @click="placeOrder">
            <p class="btn__text">go to order</p>
        </div>
    </div>
</template>

<style scoped>
h3 {
    margin: 0;
}

input {
    padding: 0.5em 1em;
    background-color: #99999b;
    border: none;
    color: black;
    font-weight: 600;
    border-radius: 3px;
    transition: all 250ms;
}

input:focus {
    outline: none !important;
    border: 2px solid #ed2970;
    box-shadow: 0 0 5px #ed2970;
}

.btn__primary {
    align-self: flex-end;
}

strong {
    color: #ed2970;
}

p {
    font-weight: bold;
}

.payment__container {
    position: sticky;
    top: 3em;
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 3em;
    background-color: #EBEBEB;
    border-radius: 5px;
    padding: 3em 2em;
    height: fit-content;
}

.payment__info {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    border-radius: 5px;
    padding: 0 2em;
    justify-content: space-around;
    height: fit-content;
}

.payment__info input {
    height: fit-content;
}
</style>