<script setup>
import router from '../../router';

const logout = () => {
    localStorage.removeItem('token');
    router.push({ name: 'Login' })
}
</script>

<template>
    <div class="header">
        <router-link class="header__logo" to="/">
            <img class="header__logo--img" src="../../../assets/donuttello-logo.png" alt="">
            <p>x</p>
            <p>donuttello.ai</p>
        </router-link>
        <div class="header__interaction">
            <div class="button__password">
                <router-link to="/change-password">change password</router-link>
            </div>
            <div class="button__logout">
                <div @click="logout" class="logout__btn">log out</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

.header__interaction {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3em;
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
    color: white;
    font-weight: 600;
}

.logout__btn:hover {
    color: #ed2970;
}
</style>