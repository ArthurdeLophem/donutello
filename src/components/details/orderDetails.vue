<script setup>
</script>
<template>
    <div class="details__container">
        <div class="container__info">
            <h2 class="info__title">Order details</h2>
            <span class="info__text">orderdate</span>
            <span class="info__text">company name</span>
            <span class="info__text">email</span>
            <span class="info__text">phone</span>
            <span class="info__text">adress</span>
            <span class="info__text">city</span>
        </div>
        <div class="container__logo">
            <h3 class="logo__title">Company logo</h3>
            <div class="logo__download">
                <span class="download__text">logo.png</span>
                <button class="download__btn">download</button>
            </div>
        </div>
        <div class="container__status">
            <input class="status__box" type="checkbox" name="pending">
            <label class="status__text" for="pending">pending</label>
            <input class="status__box" type="checkbox" name="in progress">
            <label class="status__text" for="in progress">in progress</label>
            <input class="status__box" type="checkbox" name="completed">
            <label class="status__text" for="completed">completed</label>
            <button class="status__btn">save</button> 
        </div>
    </div>
</template>
<style scoped>
</style>