<script>
</script>

<template>
    <div class="content__container">
        <div class="content__heading">
            <h1>marketplace</h1>
            <p class="subHeader"><strong>create. render. order. <span>your own donuts</span></strong></p>
        </div>
        <div class="content__enticing">
            <div class="enticing__interaction">
                <p>create your business donut marketing online and get it shipped and delivered at your door</p>
                <div class="enticing__cta"><a href="">start yours now</a></div>
                <div class="enticing__assets">
                    <img src="/assets/shopping_bag.png" alt="3d shopping bag">
                    <img src="/assets/parcel_box.png" alt="3d parcel box">
                </div>
            </div>
            <div class="enticing__example">
                <div class="example__card">
                    <img class="example__img" src="/assets/shopping_bag.png" alt="3d shopping bag">
                    <div class="example__info">
                        <div class="company__info">
                            <div class="company__logo"></div>
                            <h3>company name</h3>
                        </div>
                        <div class="donut__data">
                            <p><strong>donut name</strong></p>
                            <p><strong>1d ago</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1,
p {
    margin: 0;
}

p {
    color: black;
}

span {
    color: #F46767;
}

a {
    color: white;
    margin: 2em 2em;
    font-weight: 800;
}

.subHeader {
    font-size: 1.2em;
}

.enticing__cta {
    width: fit-content;
    height: 56px;
    width: 204px;
    background-color: #F46767;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2em;
}

.enticing__interaction p {
    width: 340px;
    font-weight: 600;
}

.content__container {
    margin: 4em 4em 0em 4em;
}

.content__enticing {
    margin: 4em 4em 0em 4em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.enticing__interaction {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.example__card {
    height: 380px;
    width: 320px;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
}

.example__img {
    height: 200px;
    margin: 2em auto;
}

.company__info {
    margin: 0em 2em;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
}

.company__logo {
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 100%;
}

.company__info h3 {
    font-weight: 800;
}

.donut__data {
    margin: 0em 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.donut__data p {
    color: #F46767;
}
</style>