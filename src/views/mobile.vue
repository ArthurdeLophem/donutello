<template>
    <div class="template__container">
        <img class="warning__sign" src="../../assets/warning.svg" alt="warning sign for mobile users">
        <h1 class="warning__text">come back on <strong>desktop...</strong></h1>
        <p>mobile <strong>isn't suited</strong> for this configurator</p>
    </div>
</template>
<style scoped>
strong {
    color: #ed2970;
}

.template__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 800;
}

.warning__text {
    font-size: 3em;
}

.warning__sign {
    width: 20em;
}
</style>