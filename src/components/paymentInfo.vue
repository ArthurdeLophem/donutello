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
strong {
    color: #ed2970;
}

p {
    font-weight: bold;
}

.payment__info {
    width: 35%;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    background-color: #EBEBEB;
    border-radius: 5px;
    padding: 1em 4em;
    justify-content: space-around;
}

.payment__info input {
    height: fit-content;
}
</style>