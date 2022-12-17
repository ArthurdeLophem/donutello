<script setup>
import { ref } from 'vue';
import { extrasData, glazesData, toppingsData } from '../configs/donuttelloData';
import router from './../router';

let donuts = JSON.parse(window.localStorage.getItem('donuts')),
    donutBlock = ref(),
    modal = ref(),
    extraObj, glazeObj, toppingObj, donutData

const addDonut = () => {
    window.localStorage.removeItem("editor")
    router.push({ name: 'Generator' })
}

const deleteDonut = (index) => {
    donutBlock.value[index].style.transform = "translateX(-50vw)";
    modal.value.classList.add('active')
    modal.value.innerHTML = "removing donut n°" + (index + 1) + " ...";
    setTimeout(() => {
        donutBlock.value[index].style.display = "none";
        donuts.splice(index, 1);
        donutBlock.value.splice(index, 1);
        window.localStorage.removeItem('donuts');
        window.localStorage.setItem('donuts', JSON.stringify(donuts));
        modal.value.classList.remove('active');
    }, 700);
}

const editDonut = (index) => {
    donutBlock.value[index].style.transform = "translateX(-50vw)";
    window.localStorage.removeItem("editor")
    modal.value.classList.add('active');
    modal.value.innerHTML = "configuring editor...";
    extraObj = extrasData.find(el => el.eName == donuts[index].extra);
    glazeObj = glazesData.find(el => el.eName == donuts[index].glaze);
    toppingObj = toppingsData.find(el => el.eName == donuts[index].topping);
    donutData = { extra: extraObj.eName, glaze: glazeObj.color, topping: toppingObj.color }
    window.localStorage.setItem("editor", JSON.stringify(donutData))
    setTimeout(() => {
        donuts.splice(index, 1);
        window.localStorage.removeItem('donuts');
        window.localStorage.setItem('donuts', JSON.stringify(donuts));
        router.push({ name: 'Generator' })
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
                        <img src="../../public/assets/edit__btn.svg" alt="edit donut button">
                    </div>
                    <div class="button__rounded delete" @click="deleteDonut(index)">
                        <img src="../../public/assets/delete__btn.svg" alt="delete donut button">
                    </div>
                </div>
            </div>
        </div>
        <div class="btn__primary btn__text" @click="addDonut">add donuts</div>
    </div>
</template>

<style scoped>
.modal__alert {
    position: absolute;
    top: 2em;
    height: 3em;
    width: 30em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ed2970;
    color: white;
    font-weight: 600;
    border-radius: 2px;
    display: none;
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
    display: flex;
    flex-direction: column;
    gap: 3em;
}

.summary__list {
    display: flex;
    flex-direction: column;
    gap: 4em;
    padding-top: 2em;
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