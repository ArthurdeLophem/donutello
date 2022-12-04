<script>
</script>

<template>
    <div class="header">
        <div class="header__logo">
            <h3>donutello.ai</h3>
        </div>
        <div class="header__interaction">
            <div class="button__password">
                <router-link to="/change-password">change password</router-link>
            </div>
            <div class="button__login">
                <router-link to="/">log out</router-link>
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
    height: 70px;
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

.button__login {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 86px;
}

.button__login a {
    color: white;
}

.button__login a:hover {
    color: #ed2970;
}
</style>