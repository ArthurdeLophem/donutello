<script setup>
let donuts = JSON.parse(window.localStorage.getItem('donuts'))
</script>

<template>
    <div class="summary__container" ref="extra__container">
        <div class="summary__list">
            <div class="donut__block" v-for="(donut, index) in donuts" ref="selector">
                <div class="donut__position">
                    <p>{{ (index + 1) }}.</p>
                </div>
                <div class="donut__card">
                    <div class="card__col">
                        <div class="data__container">
                            <p>topping</p>
                            <p><strong>{{ donut.topping }}</strong></p>
                        </div>
                        <div class="data__container">
                            <p>extra</p>
                            <p><strong>{{ donut.extra }}</strong></p>
                        </div>
                    </div>
                    <div class="card__col">
                        <div class="data__container">
                            <p>sprinkles</p>
                            <p><strong>{{ donut.vermi }}</strong></p>
                        </div>
                        <div class="data__container">
                            <p>campaign size</p>
                            <p><strong>50</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
strong {
    color: #ed2970;
}

p {
    font-weight: bold;
}

.summary__container {
    width: 45%;
}

.summary__list {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.summary__Headline {
    font-size: 2.4em;
}

.donut__card {
    background-color: #EBEBEB;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    padding: 1em 4em;
    justify-content: space-around;
    gap: 4em;
}

.donut__block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2em;
}

.donut__position {
    background-color: #EBEBEB;
    border-radius: 5px;
    width: fit-content;
    height: fit-content;
    padding: 0 20px;
}

.data__container {
    display: flex;
    flex-direction: row;
    gap: 1em;
}
</style>