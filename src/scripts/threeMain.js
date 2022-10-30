import Donunq from "../scripts/donunqGenerator.js"
const dViewport = document.querySelector(".donunqViewport")

generateCanvas = () => {
    const donunq = new Donunq(dViewport);
    donunq.createScene();
}