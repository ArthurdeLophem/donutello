<script>
</script>

<template>
    <div class="testimonial__container">
        <h2>easily create your marketing campaign</h2>
        <div class="testimonial__content">
            <div>
                <div class="background__texture--circle"></div>
                <img class="testimonial__portrait" src="/assets/obama.svg" alt="obama portrait">
            </div>
            <div class="testimonial__quote">I made my campaign in 5 minutes and they were
                already in production 10 minutes after I finished my donuts.
                The donuts came in yesterday and they were so donutelly squishy
                I 10/10 recommend this platform, such a nice community.
            </div>
        </div>

    </div>
</template>

<style scoped>
.testimonial__container {
    margin-top: 7em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
}

.testimonial__content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5em;
}

.testimonial__portrait {
    width: 300px;
}

.testimonial__quote {
    width: 700px;
}

.background__texture--circle {
    z-index: -1;
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 100%;
    background-color: #F46767;
    opacity: 36%;
    transform: translateX(-60px) translateY(10px);
}
</style>