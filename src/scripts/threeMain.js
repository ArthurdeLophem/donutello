import Donunq from "../scripts/donunqGenerator.js"
const dViewport = document.querySelector(".donunqViewport")

const generateCanvas = () => {
    const donunq = new Donunq(dViewport);
    donunq.createScene();
}

const editDonunq = () => { };
generateCanvas();