<script>
</script>

<template>
    <div class="brands__container">
        <h2>trusting brands</h2>
        <div class="card__container">
            <div class="brand__card">
                <img class="brand__logo" src="/assets/brands/nike.png" alt="nike logo">
            </div>
            <div class="brand__card">
                <img class="brand__logo" src="/assets/brands/levis.png" alt="levis logo">
            </div>
            <div class="brand__card">
                <img class="brand__logo" src="/assets/brands/bol.png" alt="bol.com logo">
            </div>
            <div class="brand__card">
                <img class="brand__logo" src="/assets/brands/telenet.png" alt="telenet logo">
            </div>
        </div>
    </div>
</template>

<style scoped>
.brands__container {
    margin: 10em 0em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
    padding-bottom: 10em;
}

.card__container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2em;
    flex-wrap: wrap;
}

.brand__card {
    width: 250px;
    height: 250px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>