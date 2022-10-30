import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"


export default class Donunq {
    constructor(viewport) {
        this.viewport = viewport;

        this.scene;
        this.camera;
        this.renderer;
        this.donunq;

        this.donunqData = {
            title: "donunq",
            scaleX: 5,
            scaleY: 5,
            scaleZ: 5,
            path: "./public/models/donunq_object.glb"
        }
    }

    createScene() {
        // create scene + camera
    }

    createDonunq() {
        // load donunq + add to scene
    }

    createOrbitctrl() {
        // generate orbit controls (around the world around the world)
    }

    onWindowResize() {
        // if window is resized then resize canvas (basically to make threeviewport interactive)
    }

    animate = () => {
        // function to let the orbitctrl and others to animate
    }

    lights() {
        // add lights to scene
    }

    renderer() {
        // render the whole thing
    }
}