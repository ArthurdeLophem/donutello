<script setup>
import { ref } from 'vue';
import { cloud, cloudPreset, baseDonutUrl } from '../../config';

const email = ref(""),
    gsm = ref(""),
    bedrijfsnaam = ref(""),
    adress = ref(""),
    stad = ref("");
let donuts,
    business;

let shapeRef = ref();

const apiUrl = cloud;
const unsignedUploadPreset = cloudPreset;

const checkForm = () => {
    if (email.value == "" || gsm.value == "" || bedrijfsnaam.value == "" || adress.value == "" || stad.value == "") {
        let inputfields = document.querySelectorAll('.info__field');
        let inputError = document.querySelector('.info__error');
        inputfields.forEach(inputfield => {
            if (inputfield.value == "") {
                inputfield.classList.add('info__field--error');
            }
        })
        inputError.classList.remove('info__error--hidden');
        return false;
    }
}

const toggleLogo = () => {
    let logo = document.querySelector('.logo__content');
    if (logo.classList.contains('logo__content--hidden')) {
        logo.classList.remove('logo__content--hidden');
    }
    else {
        logo.classList.add('logo__content--hidden');
    }
}
const businessData = ref({ mail: email, phone: gsm, name: bedrijfsnaam, address: adress, city: stad, orderstatus: "pending" });
const placeOrder = () => {
    let x = checkForm();
    if (x == false) {
        return;
    }
    let logo = document.querySelector('.logo__content');
    if (logo.classList.contains('logo__content--hidden') == false) {
        if (document.querySelector("[type=file]").files.length == 0) {
            let error = document.querySelector('.logo__error');
            error.classList.remove('content__error--hidden');
            console.log(error)

            return;
        }
        let file = document.querySelector("[type=file]").files;


        let uploadData = new FormData();
        uploadData.append("file", file[0]);
        uploadData.append("upload_preset", unsignedUploadPreset);

        fetch(apiUrl, {
            method: 'POST',
            body: uploadData
        })
            .then(response => response.json())
            .then(data => {
                let url = data.secure_url;
                let shape;
                if (shapeRef.value == 0) {
                    shape = "square";
                }
                else if (shapeRef.value == 1) {
                    shape = "round";
                }

                const formData = {
                    "contact": {
                        "mail": businessData.value.mail,
                        "phone": businessData.value.phone,
                        "name": businessData.value.name,
                        "address": businessData.value.address,
                        "city": businessData.value.city,
                        "orderstatus": "pending"
                    },
                    "donuts": JSON.parse(window.localStorage.getItem('donuts')),
                    "card": {
                        "shape": shape,
                        "url": url
                    }
                }
                /* console.log(JSON.stringify(formData)) */

                fetch(baseDonutUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                }).then(res => {
                    res.json().then(data => {
                        console.log(data)
                        emit('isCompleted', true);
                        emit('data', data.data);
                    })
                        .catch(error => {
                            console.log(error)
                        });
                })
            }).catch((error) => {
                console.log(error);
            }
            );
    }
    else {
        const formData = {
            "contact":
                businessData.value
            ,
            "donuts": JSON.parse(window.localStorage.getItem('donuts')),
            "card": {
                "shape": "",
                "url": ""
            }
        }
        console.log(JSON.stringify(formData))

        fetch(baseDonutUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => {
            res.json().then(data => {
                emit('isCompleted', true);
                emit('data', data.data);
            })
        }).catch(error => {
            console.log(error)
        });
    }
}

const emit = defineEmits([
    'isCompleted',
    'data'
]);

</script>
<template>
    <div class="payment">
        <h2 class="payment__title">payment info</h2>
        <div class="payment__info">
            <input class="info__field" v-model="email" placeholder="*Email:" />
            <input class="info__field" v-model="gsm" placeholder="*Telefoon:" />
            <input class="info__field" v-model="bedrijfsnaam" placeholder="*Bedrijfsnaam:" />
            <input class="info__field" v-model="adress" placeholder="*Adress:" />
            <input class="info__field" v-model="stad" placeholder="*Stad:" />
            <span class="info__error info__error--hidden">You must fill in the required * fields</span>
        </div>
        <div class="payment__logo">
            <div class="logo__title">
                <h3 class="title__text">Company logo</h3>
                <div class="title__checkbox">
                    <input @click="toggleLogo" class="checkbox__box" type="checkbox" name="check">
                    <label class="checkbox__text" for="check">This will add your company logo to all the donuts</label>
                </div>
            </div>
            <div class="logo__content logo__content--hidden">
                <span class="content__text content__text--semibold">Shape:</span>
                <div class="content__checkbox">
                    <span class="checkbox__text">Square</span>
                    <input v-model="shapeRef" class="checkbox__box" type="radio" name="shape" value="0">
                </div>
                <div class="content__checkbox content__checkbox--margin">
                    <span class="checkbox__text">Round</span>
                    <input v-model="shapeRef" class="checkbox__box" type="radio" name="shape" value="1">
                </div>
                <div class="logo__container">
                    <div class="logo__input">
                        <span class="content__text content__text--semibold">Logo:</span>
                        <div class="content__upload">
                            <input accept="image/*" class="upload__btn" type="file" name="logo">
                        </div>
                    </div>
                    <span class="content__error content__error--hidden logo__error">Please add a logo file</span>
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

.logo__input {
    display: flex;
    align-items: center;
    gap: 2em;
}

.logo__container {
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;
}

.logo__content {
    display: flex;
    flex-direction: column;
    width: 100%;
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

.info__error {
    color: #FF0000;
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.5rem;
}

.info__error--hidden {
    display: none;
}

.info__field--error {
    border-bottom: 1px solid #FF0000;
}

.info__field--error::placeholder {
    color: #FF0000;
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

.logo__content--hidden {
    display: none;
}

.content__error {
    font-weight: 500;
    color: #ed2970;
    margin-top: 1rem;
}

.content__error--hidden {
    display: none;
}
</style>