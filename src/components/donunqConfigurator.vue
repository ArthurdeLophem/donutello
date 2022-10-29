<script setup>


</script>

<template>
    <div class="configurePanel">
        <div class="flavour">
            <p class="flavour__title">choose your flavour:</p>
            <select class="flavour__selector" name="flavours" id="flavours">
                <option value="chocolat">chocolat</option>
                <option value="fraise">fraise</option>
                <option value="myrtille">myrtille</option>
            </select>
        </div>
        <div class="extras">
            <p class="extras__title">want some extras:</p>
            <select class="extras__selector" name="extras" id="extras">
                <option value="boring">no I'm Boring</option>
                <option value="vermicelles">vermicelles</option>
                <option value="teknodisco">teknodisco</option>
            </select>
        </div>
    </div>
</template>