<script setup>
import router from '../../router';
import { ref, onMounted } from 'vue';
import { authUrl, updateUrl } from '../../../config';


let Oldpassword = ref(''),
    Newpassword = ref(''),
    Repeatpassword = ref(''),
    form__success = ref(''),
    form__error = ref(''),
    form__failed = ref(''),
    oldPwError = ref(''),
    newPwError = ref('');

onMounted(() => {
    fetch(authUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
        }
    }).then(res => {
        if (res.status == 401) {
            router.push({ name: 'Login' })
        }
    }).catch(error => {
        console.log(error)
    });
})

const submit = () => {
    if (Oldpassword.value != Newpassword.value) {
        if (Newpassword.value == Repeatpassword.value) {
            console.log(JSON.stringify({
                password: Oldpassword.value,
                newPassword: Newpassword.value
            }))
            fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    password: Oldpassword.value,
                    newPassword: Newpassword.value
                })
            }).then(res => {
                res.json({}).
                    then(data => {
                        if (data.status === "success") {
                            form__success.value.classList.remove('form__success--hidden');
                            setTimeout(() => {
                                console.log("redirecting");
                                router.push({ name: 'Dashboard' })
                            }, 2000);
                            if (!form__error.value.classList.contains('form__error--hidden')) {
                                form__error.value.classList.add('form__error--hidden');
                            }
                            if (!form__failed.value.classList.contains('form__failed--hidden')) {
                                form__failed.value.classList.add('form__failed--hidden');
                            }
                        }
                        else {
                            form__failed.value.classList.remove('form__failed--hidden');
                            if (!form__success.value.classList.contains('form__success--hidden')) {
                                form__success.value.classList.add('form__success--hidden');
                            }
                        }
                    })
            }).catch(error => {
                console.log(error)
            })
        }
        else {
            if (!form__success.value.classList.contains('form__success--hidden')) {
                form__success.value.classList.add('form__success--hidden');
            }
            form__error.value.classList.remove('form__error--hidden');
            newPwError.value.classList.remove('error__new--hidden');
            if (!oldPwError.value.classList.contains('error__old--hidden')) {
                oldPwError.value.classList.add('error__old--hidden');
            }
        }
    } else {
        if (!form__success.value.classList.contains('form__success--hidden')) {
            form__success.value.classList.add('form__success--hidden');
        }
        form__error.value.classList.remove('form__error--hidden');
        oldPwError.value.classList.remove('error__old--hidden');
        if (!newPwError.value.classList.contains('error__new--hidden')) {
            newPwError.value.classList.add('error__new--hidden');
        }
    }
}
</script>

<template>
    <div class="login">
        <div class="login__image"></div>
        <div class="login__section">
            <div class="section__container">
                <router-link to="/" class="container__brand container__brand--padding">
                    Donutello.ai
                </router-link>
                <h1 class="container__title container__title--padding">
                    Change <span class="title__pink">password</span>
                </h1>
                <form class="container__form container__form--padding">
                    <div class="form__field form__field--padding">
                        <input class="field__input" v-model="Oldpassword" type="password" placeholder="old password" />
                    </div>
                    <div class="form__field form__field--padding">
                        <input class="field__input" v-model="Newpassword" type="password" placeholder="new password" />
                    </div>
                    <div class="form__field form__field--padding">
                        <input class="field__input" v-model="Repeatpassword" type="password"
                            placeholder="repeat password" />
                    </div>
                    <div class="form__error form__error--hidden" ref="form__error">
                        <p class="error__old error__old--hidden" ref="oldPwError">Old password can not match new
                            password</p>
                        <p class="error__new error__new--hidden" ref="newPwError">New password and repeat password do
                            not match</p>
                    </div>
                    <div class="form__success form__success--hidden" ref="form__success">
                        <p class="success__text">Password changed successfully</p>
                    </div>
                    <div class="form__failed form__failed--hidden" ref="form__failed">
                        <p class="failed__text">Old password is incorrect</p>
                    </div>
                    <div class="form__button">
                        <span class="button__login" @click="submit">change password</span>
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
    height: 100%;
    width: 100vw;
    background-color: #F5F5F5;
}

.login__image {
    width: 60vw;
    height: 100%;
    background-image: url('https://donuttello.com/photos/shares/donuts/sinterklaas/sint_2022.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.login__section {
    width: 40vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
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
    font-size: 1.2rem;
    font-weight: 500;
    color: #000000;
    background: none;
}

.container__brand {
    margin: 0;
    margin-block-end: 0;
}

.container__brand:hover {
    color: black;
}

.form__button {
    background-color: #ed2970;
    width: 15rem;
    height: 2.5rem;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    cursor: pointer;
}

.button__login {
    color: white;
}

.container__form--padding,
.container__title--padding,
.container__brand--padding,
.form_field--padding {
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
    font-weight: 600;
}

.form__error {
    color: red;
    font-size: 1.2rem;
    font-weight: 600;
}

.form__error--hidden,
.error__old--hidden,
.error__new--hidden {
    display: none;
}

.form__success {
    color: green;
    font-size: 1.2rem;
    font-weight: 600;
}

.form__success--hidden {
    display: none;
}

.form__failed {
    color: red;
    font-size: 1.2rem;
    font-weight: 600;
}

.form__failed--hidden {
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