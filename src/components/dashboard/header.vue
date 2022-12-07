<script setup>


const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

</script>

<template>
    <div class="header">
        <h3 class="header__logo">donutello.ai</h3>
        <div class="header__interaction">
            <div class="button__password">
                <a href="">change password</a>   
            </div>
            <div class="button__logout">
                <div @click="logout" class="logout__btn">log out</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    padding: 0 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 6vh;
    background-color: white;
    box-shadow: 0px 5px 7px -2px rgba(0,0,0,0.25);
    z-index: 1;
}

.header__interaction {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3em;
}

.button__logout {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 5rem;
}

.header__logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logout__btn  {
    color: white;
    font-weight: 600;
}

.logout__btn:hover {
    color: #ed2970;
}
</style>