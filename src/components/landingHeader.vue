<script setup>
import { ref, reactive, onMounted } from 'vue';

onMounted(() => {
    if (localStorage.getItem('token')) {
        let logout = document.querySelector('.button__logout');
        logout.classList.remove('button__logout--hidden');
        let login = document.querySelector('.button__login');
        login.classList.add('button__login--hidden');
        let dashboard = document.querySelector('.button__dashboard');
        dashboard.classList.remove('button__dashboard--hidden');
    }
})

const logout = () => {
    localStorage.removeItem('token');
    /* force reload */
    window.location.href = '/';
}

</script>
<template>
    <div class="header">
        <router-link class="header__logo" to="/">
            <img class="header__logo--img" src="../../assets/donuttello-logo.png" alt="">
            <p>x</p>
            <p>donuttello.ai</p>
        </router-link>
        <div class="header__interaction">
            <div class="button__dashboard button__dashboard--hidden">
                <router-link to="/dashboard">dashboard</router-link>
            </div>
            <div class="button__login">
                <router-link to="/login">log in</router-link>
            </div>
            <div class="button__logout button__logout--hidden">
                <div @click="logout" class="logout__btn">log out</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
strong {
    color: #ed2970;
}

.header {
    padding: .7em 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    z-index: 10;
}

.header__logo--img {
    height: 60px;
}

.header__interaction {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3em;
}

.header__logo {
    font-family: 'Dosis', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 800;
    color: black;
    cursor: pointer;
    gap: 0.5em;
}

.button__login {
    cursor: pointer;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 86px;
}

.button__login a {
    color: white;
    transition: all 100ms;
}

.button__login:hover a {
    color: #ed2970;
}

.button__logout {
    cursor: pointer;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 5rem;
}

.logout__btn {
    cursor: pointer;
    color: white;
    font-weight: 600;
}

.logout__btn:hover {
    color: #ed2970;
}

.button__logout--hidden {
    display: none;
}

.button__login--hidden {
    display: none;
}

.button__dashboard--hidden {
    display: none;
}
</style>