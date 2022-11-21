<script>
</script>

<template>
    <div class="header">
        <div class="header__logo">
            <h1>donutello.ai</h1>
        </div>
        <div class="header__interaction">
            <div class="button__signup">
                <a href="">sign up</a>
            </div>
            <div class="button__login">
                <p>log in</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    margin: 0 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 70px;
    width: 100%;
    color: black;
}

.header__interaction {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3em;
}

a {
    color: black;
}

.button__login {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 86px;
}
</style>