<script setup>
import { ref } from 'vue';

const email = ref(),
    gsm = ref(),
    bedrijfsnaam = ref(),
    adress = ref(),
    stad = ref();
let donuts,
    business;



const businessData = ref({ mail: email, phone: gsm, name: bedrijfsnaam, address: adress, city: stad });
const placeOrder = () => {
    const formData = {
        "contact":
            businessData.value
        ,
        "donuts": JSON.parse(window.localStorage.getItem('donuts')),
        "card": {
            "shape": "square",
            "url": "https://logo.png/"
        }
    }
    console.log(JSON.stringify(formData))
    fetch(baseDonutUrl, {
        method: 'POST',
        body: JSON.stringify(formData)
    }).then(res => {
        console.log(res);
        if (res.status == 200) {
            console.log(baseDonutUrl)
        }
    }).catch(error => {
        console.log(error)
    });
}
</script>
<template>
    <div class="payment">
        <h2 class="payment__title">Order summary</h2>
        <div class="payment__info">
            <input class="info__field" v-model="email" placeholder="*Email:" />
            <input class="info__field" v-model="gsm" placeholder="*Telefoon:" />
            <input class="info__field" v-model="bedrijfsnaam" placeholder="*Bedrijfsnaam:" />
            <input class="info__field" v-model="adress" placeholder="*Adress:" />
            <input class="info__field" v-model="stad" placeholder="*Stad:" />
        </div>
        <div class="payment__logo">
            <div class="logo__title">
                <h3 class="title__text">Company logo</h3>
                <div class="title__checkbox">
                    <input class="checkbox__box" type="checkbox" name="check">
                    <label class="checkbox__text" for="check">This will add your company logo to all the donuts</label>
                </div>  
            </div>
            <div class="logo__content">
                <span class="content__text content__text--semibold">Shape:</span>
                <div class="content__checkbox">
                    <span class="checkbox__text">Square</span>
                    <input class="checkbox__box" type="checkbox" name="square">
                </div>
                <div class="content__checkbox content__checkbox--margin">
                    <span class="checkbox__text">Round</span>
                    <input class="checkbox__box" type="checkbox" name="round">
                </div>
                <span class="content__text content__text--semibold">Logo:</span>
                <div class="content__upload">
                    <input class="upload__btn" type="file" name="logo">
                    <span class="upload__text">logo.png</span>
                </div>
            </div>  
        </div>
        <div class="btn__primary" @click="placeOrder">
            <p class="btn__text">place order</p>
        </div>
    </div>
</template>
<style scoped>

.payment {
    width: 30%;
}

.payment__info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 2rem;
}

.info__field {
    width: 100%;
    height: 4rem;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    color: #000000;
    background: none;
}

.logo__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}   

.content__checkbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 36%;
    margin-top: 1rem;  
}

.content__checkbox--margin {
    margin-bottom: 1rem;

}

.content__text--semibold {
    font-weight: 500;
}

.content__upload {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 3rem;
}

/* .upload__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7.8rem;
    height: 2rem;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    color: #FFFFFF;
    background-color: #ed2970; 
    cursor: pointer;
    border-radius: 0;
} */

.upload__text {
    margin-left: 5rem;
}


</style>