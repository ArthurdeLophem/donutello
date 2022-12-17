<script setup>
import { ref, onMounted } from 'vue';
import router from '../../router';
import { loginUrl, authUrl } from '../../../config';

let username = ref(''),
    password = ref(''),
    form__error = ref('');

onMounted(() => {
    if (localStorage.getItem('token')) {
        fetch(authUrl, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        }).then(res => {
            if (res.status == 200) {
                router.push({ name: 'Dashboard' })
            }
        }).catch(error => {
            console.log(error)
        });
    }
})

const submit = () => {
    fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    }).then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                localStorage.setItem('token', data.token);
                router.push({ name: 'Dashboard' })
            } else if (data.status === 'failed') {
                form__error.value.classList.remove('form__error--hidden');
            }
        }).catch(error => console.log(error));
}
</script>
<template>
    <div class="login">
        <div class="login__image"></div>
        <div class="login__section">
            <div class="section__container">
                <h1 class="container__title container__title--padding">
                    Welcome <span class="title__pink">back</span>
                </h1>
                <form class="container__form container__form--padding">
                    <div class="form__field form__field--padding">
                        <input class="field__input" v-model="username" type="username" id="username"
                            placeholder="username" />
                    </div>
                    <div class="form__field form__field--padding">
                        <input class="field__input" v-model="password" type="password" id="password"
                            placeholder="password" />
                    </div>
                    <div class="form__error form__error--hidden" ref="form__error">
                        <p class="error__text">Invalid username or password</p>
                    </div>
                    <div class="btn__primary" @click="submit">
                        <span class="btn__text">log in</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* desktop */
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100vw;
    background-color: #F5F5F5;
}

.login__image {
    width: 60vw;
    height: 100vh;
    background-image: url('https://donuttello.com/photos/shares/donuts/sinterklaas/sint_2022.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.login__section {
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
}

.btn__primary {
    margin-top: 2em;
}

.section__container {
    width: 70%;
}

.container__form {
    width: 100%;
}

.form__field {
    width: 100%;
}

.field__input {
    width: 100%;
    height: 50px;
    border: none;
    border-bottom: 1px solid #000000;
    outline: none;
    font-size: 1.3rem;
    font-weight: 700;
    color: #000000;
    background: none;
}

.container__brand {
    margin: 0;
    margin-block-end: 0;
}

.container__brand:hover {
    color: #000000;
}

.container__form--padding,
.container__title--padding,
.container__brand--padding,
.form_field--padding,
.form__forget--padding {
    padding: 1rem 0;
}

.title__pink {
    color: #ed2970;
}

.container__brand {
    font-size: clamp(2rem, 2.5vw, 3rem);
    font-weight: 700;
    line-height: normal;
}

.container__title {
    font-size: clamp(3rem, 10vw, 4rem);
    font-weight: 800;
}

.form__error {
    color: red;
    font-size: 1.2rem;
    font-weight: 600;
}

.error__text {
    margin-top: 0;
}

.form__error--hidden {
    display: none;
}

/* mobile */
@media only screen and (max-width: 1000px) {

    .login__image {
        display: none;
    }

    .login {
        background-image: url('https://donuttello.com/photos/shares/donuts/sinterklaas/sint_2022.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }

    .login__section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 65vh;
        width: 60vw;
        border-radius: 20px;

    }

    .form__button {
        width: 100%;
    }

    .container__title {
        font-size: clamp(1.75rem, 5vw, 3rem);
        font-weight: 600;
    }

    .container__brand {
        font-size: clamp(1.5rem, 2.5vw, 2rem);
        font-weight: 700;
        line-height: normal;
    }

    .container__form--padding,
    .container__title--padding,
    .container__brand--padding,
    .form_field--padding,
    .form__forget--padding {
        padding: .5rem 0;
    }

}

@media only screen and (max-height: 450px) {
    .login__section {
        height: 90vh;
    }

    .form__button {
        height: 2rem;
        font-size: 1em;
    }

    .container__form--padding,
    .container__title--padding,
    .container__brand--padding,
    .form_field--padding,
    .form__forget--padding {
        padding: 0.1rem 0;
    }

}
</style>   