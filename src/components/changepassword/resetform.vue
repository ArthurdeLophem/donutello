<script setup>

import { ref, onMounted } from 'vue'

let Oldpassword = ref('');
let Newpassword = ref('');
let Repeatpassword = ref('');

onMounted(() => {
    const authUrl = 'http://localhost:3000/api/v1/users/auth'
fetch(authUrl, {
    method: 'POST',
    headers: {
       "Authorization" : "Bearer " + localStorage.getItem('token'),
    }
})
.then(res => {

if(res.status == 401) {
    window.location.href = '/login';
 }
   
}).catch(error => {
    console.log(error)
});

})

const submit = () => {
    
    if(Oldpassword.value != Newpassword.value && Newpassword.value == Repeatpassword.value) {
       const apiUrl = 'http://localhost:3000/api/v1/users/update'
         fetch(apiUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                "Authorization" : "Bearer " + localStorage.getItem('token')
              },
              body: JSON.stringify({
                password: Oldpassword.value,
                newPassword: Newpassword.value
              })
         }).then(res => {
             res.json({}).
                then(data => {
                    if(data.status === "success") {
                        console.log("password changed");
                    }
                    else {
                        console.log("password not changed");
                    }
                })
         })
         .catch(error => {
             console.log(error)
         })
}
}

</script>
<template>
    <div class="login">
        <div class="login__image"></div>
        <div class="login__section">
            <div class="section__container">
                <h2 class="container__brand container__brand--padding">
                    Donutello.ai
                </h2>
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
                        <input class="field__input" v-model="Repeatpassword" type="password" placeholder="repeat password" />
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
    height: 100vh;
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

.section__container {
    width: 70%;
}

.container__form {
    width: 100%;
}
.form__field{
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

.form__button {
    background-color: #ed2970;
    width: 15rem;
    height: 2.5rem;
    font-size: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.button__login {
    color: white;
}

.container__form--padding, .container__title--padding, .container__brand--padding, .form_field--padding {
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

.container__form--padding, .container__title--padding, .container__brand--padding, .form_field--padding, .form__forget--padding{
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

.container__form--padding, .container__title--padding, .container__brand--padding, .form_field--padding, .form__forget--padding{
    padding: 0.1rem 0;
}

}

</style>   