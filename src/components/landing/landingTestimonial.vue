<script>
</script>

<template>
    <div class="testimonial__container">
        <h2>easily create your marketing campaign</h2>
        <div class="testimonial__content">
            <div>
                <div class="background__texture--circle"></div>
                <div class="testimonial__portrait"></div>
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
    margin: 7em 0.4em 0em 0.4em;
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
    flex-wrap: wrap;
    gap: 5em;
}

.testimonial__portrait {
    background-image: url(../../../assets/person.jpg);
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    width: 300px;
    height: 350px;
    border-radius: 1em;
}

.testimonial__quote {
    width: 700px;
    font-weight: 600;
}

.background__texture--circle {
    z-index: -1;
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 100%;
    background-color: #ed2970;
    opacity: 36%;
    transform: translateX(-60px) translateY(10px);
}

@media (max-width: 1080px) {
    .testimonial__quote {
        width: 60%;
    }
}

@media (max-width: 793px) {
    .testimonial__quote {
        width: 90%;
    }

    .testimonial__content {
        margin: 0% 5%;
        justify-content: start;
    }

    .testimonial__portrait {
        width: 250px;
    }

    .background__texture--circle {
        z-index: -1;
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 100%;
        background-color: #F46767;
        opacity: 36%;
        transform: translateX(-60px) translateY(10px);
    }
}
</style>