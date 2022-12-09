<script setup>

</script>

<template>
    <div class="payment__info">
        <input v-model="email" placeholder="email" />
        <input v-model="gsm" placeholder="gsm" />
        <input v-model="bedrijfsnaam" placeholder="bedrijfsnaam" />
        <input v-model="adress" placeholder="adress" />
        <input v-model="stad" placeholder="stad" />
    </div>
</template>

<style scoped>
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

strong {
    color: #ed2970;
}

p {
    font-weight: bold;
}

.payment__info {
    position: sticky;
    top: 3em;
    width: 30%;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    background-color: #EBEBEB;
    border-radius: 5px;
    padding: 3em 2em;
    justify-content: space-around;
    height: fit-content;
}

.payment__info input {
    height: fit-content;
}
</style>