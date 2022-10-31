import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default class Donunq {
    constructor() {
        this.viewport;

        this.scene;
        this.camera;
        this.renderer;
        this.donunq;

        this.donunqData = {
            title: "donunq",
            scaleX: 5,
            scaleY: 5,
            scaleZ: 5,
            roughness: 0.2235293984413147,
            metalness: 0.24705882370471954,
            path: "./models/donunq_object.gltf",
            lightPath: "./models/fairway.hdr"
        }
    }

    createScene(viewport) {
        // create scene + camera
        this.viewport = viewport
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.viewport.offsetWidth / this.viewport.offsetHeight, 0.1, 500);
        this.camera.zoom = 8;
        this.camera.position.set(0, 0.6, 1);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.viewport.offsetWidth, this.viewport.offsetHeight);
        this.viewport.appendChild(this.renderer.domElement);
        this.renderer.setClearColor(0x000000, 0);

        this.render();
        this.createOrbitctrl()
        this.lights();
        this.createDonunq();
        this.animate();
    }

    createDonunq() {
        // load donunq + add to scene
        // console.log("donunq")
        const loader = new GLTFLoader();
        loader.load(this.donunqData.path, (gltf) => {
            gltf.scene.scale.set(this.donunqData.scaleX, this.donunqData.scaleY, this.donunqData.scaleZ);
            this.scene.add(gltf.scene);
        })
    }

    configureDonunq(flav, extra) {
        const loader = new GLTFLoader();
        loader.load(this.donunqData.path, (gltf) => {
            const model = gltf.scene
            model.scale.set(this.donunqData.scaleX, this.donunqData.scaleY, this.donunqData.scaleZ);
            // flavour
            if (flav === "fraise") {
                flav = '#bf3030';
                this.addFlav(flav, model);
                this.scene.add(model);
            } else if (flav === "myrtille") {
                flav = '#312d48';
                this.addFlav(flav, model);
                this.scene.add(model);
            } else {
                this.createDonunq();
            }

            // extras
        })
    }

    addFlav(flav, model) {
        model.children[0].children[1].material = new THREE.MeshStandardMaterial({
            color: flav,
            roughness: this.donunqData.roughness,
            metalness: this.donunqData.metalness
        })
        return model
    }

    addExtra(extra) {
        const loader = new GLTFLoader();
        loader.load(this.donunqData.path, (gltf) => {
            const model = gltf.scene
            model.scale.set(this.donunqData.scaleX, this.donunqData.scaleY, this.donunqData.scaleZ);
            if (extra === "teknodisco") {
                model.children[0].children[3].material = new THREE.MeshStandardMaterial({
                    color: '#312d48',
                    roughness: this.donunqData.roughness,
                    metalness: this.donunqData.metalness
                })
                model.children[0].children[2].material = new THREE.MeshStandardMaterial({
                    color: '#ffffff',
                    roughness: this.donunqData.roughness,
                    metalness: this.donunqData.metalness
                })
                this.scene.add(model);
            }
        })
    }

    createOrbitctrl() {
        // generate orbit controls (around the world around the world)
        // console.log("orbits")
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
    }

    onWindowResize() {
        // if window is resized then resize canvas (basically to make threeviewport interactive)
    }

    animate = () => {
        // function to let the orbitctrl and others to animate
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.render()
    }

    lights() {
        // add lights to scene
        // console.log("lights")
        const hemi = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6)
        this.scene.add(hemi)

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