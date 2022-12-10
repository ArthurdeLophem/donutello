<script setup>
import { ref } from 'vue';

let donuts = JSON.parse(window.localStorage.getItem('donuts')),
    donutBlock = ref();

const deleteDonut = (index) => {
    donutBlock.value[index].style.transform = "translateX(-1000px)";
    setTimeout(() => {
        donutBlock.value[index].style.display = "none";
        donuts.splice(index, 1);
        donutBlock.value.splice(index, 1);
        window.localStorage.removeItem('donuts')
        window.localStorage.setItem('donuts', JSON.stringify(donuts))
    }, 700)
}
</script>

<template>
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
                    <div class="button__rounded" @click="deleteDonut(index)">
                        <img src="../../assets/delete__btn.svg" alt="delete donut button">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

.button__rounded img {
    transform: translateX(-2px);
}

.summary__container {
    width: 45%;
}

.summary__list {
    display: flex;
    flex-direction: column;
    gap: 2em;
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