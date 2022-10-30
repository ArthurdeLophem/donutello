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
            path: "./models/donunq_object.glb",
            lightPath: "./models/fairway.hdr"
        }
    }

    createScene() {
        // create scene + camera
        console.log("Loading")
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.viewport.offsetWidth, 75, this.viewport.offsetHeight, 0.1, 500);
        this.camera.zoom = 8;
        this.camera.position.set(0, 0.6, 1);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.viewport.offsetWidth, this.viewport.offsetHeight);
        this.viewport.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x000000, 0);

        this.lights();
        this.createDonunq();
        this.render();
    }

    createDonunq() {
        // load donunq + add to scene
        const loader = new GLTFLoader();
        loader.load(this.donunqData.path, (gltf) => {
            gltf.scene.scale.set(this.donunqData.scaleX, this.donunqData.scaleY, this.donunqData.scaleZ);
            this.scene.add(gltf.scene);
        })
        this.animate();
    }

    createOrbitctrl() {
        // generate orbit controls (around the world around the world)
    }

    onWindowResize() {
        // if window is resized then resize canvas (basically to make threeviewport interactive)
    }

    animate = () => {
        // function to let the orbitctrl and others to animate
        requestAnimationFrame(this.animate);
        this.render()
    }

    lights() {
        // add lights to scene
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(this.donunqData.lightPath, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this.scene.environment = texture;
        })
    }

    render() {
        // render the whole thing
        this.renderer.render(this.scene, this.camera);
    }
}