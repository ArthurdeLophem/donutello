<script>
// export default {
//     data() {
//         return {
//             selectedFlavour: 'chocolat',
//             selectedExtra: 'vermicelles'
//         }
//     },
//     methods: {
//         emitDonunq() {
//             this.emitter.emit('emitDonunq', { 'flavour': this.selectedFlavour, 'extra': this.selectedExtra })
//         }
//     }
// }
</script>

<template>
    <h1 class="generator__heading">create <strong>your</strong> donut</h1>
    <div class="gen__nav">
        <div class="order__overview">
            <div class="ingr__card">
                <p>topping</p>
                <p><strong>marshmallow</strong></p>
            </div>
            <div class="ingr__card">
                <p>glazuur</p>
                <p><strong>roze kers</strong></p>
            </div>
        </div>
        <div class="order__enticing">
            <div class="price__card">
                <p class="price__amount">$5</p>
                <p class="price__quantity">/donut</p>
            </div>
            <div class="btn__primary">
                <a class="btn__text" href="">go to order</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
strong {
    color: #ed2970;
}

.generator__heading {
    font-size: 2.4em;
    position: absolute;
    transform: translateX(1em) translateY(1em);
}

.gen__nav {
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 2em 0;
    gap: 10em;
    justify-content: space-between;
    align-items: center;
    margin: 0 2em;
}

.order__enticing,
.order__overview {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2em;
}

.ingr__card {
    background-color: #EBEBEB;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 25px;
    gap: 2em;
}

.ingr__card p {
    font-weight: bold;
}

.price__card {
    background-color: #EBEBEB;
    border-radius: 18px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 20px;
}

.price__amount {
    font-size: 1.8em;
    font-weight: bold;
}

.price__quantity {
    font-weight: bold;
}

.btn__primary {
    width: fit-content;
    height: 56px;
    width: 204px;
    background-color: #ed2970;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn__text {
    color: white;
    font-weight: bold;
}
</style>