<script setup>
const donuttelloRedirect = () => {
    window.location.href = "https://donuttello.com/";
}
</script>

<template>
    <footer @click="donuttelloRedirect">
        <img class="footer__logo--img" src="../../../public/assets/donuttello-logo.png" alt="">
        <h3>x</h3>
        <h3>donutello.ai</h3>
    </footer>
</template>

<style scoped>
footer {
    font-family: 'Dosis', sans-serif;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5em;
    background-color: #ed2970;
    color: white;
    padding: 1em 0em;
    cursor: pointer;
}

.footer__logo--img {
    height: 80px;
}
</style>