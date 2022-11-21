<script setup>
import donunqConfigurator from './components/donunqConfigurator.vue'
import donunqViewport from './components/donunqViewport.vue'
import lHeader from './components/landingHeader.vue'
import lContent from './components/landingContent.vue'
import lTestimonial from './components/landingTestimonial.vue'
import lBrands from './components/landingBrands.vue'
</script>

<template>
  <lHeader />
  <lContent />
  <lTestimonial />
  <lBrands />
  <!-- <donunqConfigurator />
  <donunqViewport /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
