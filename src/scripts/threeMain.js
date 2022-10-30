import Donunq from "../scripts/donunqGenerator.js"
const dViewport = document.querySelector(".donunqViewport")
console.log(dViewport);

const generateCanvas = () => {
    const donunq = new Donunq(dViewport);
    donunq.createScene();
}

const editDonunq = () => { };
generateCanvas();