import * as THREE from "three";
// import { Raycaster } from "three/src/core/Raycaster.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Donunq {
    constructor() {
        this.viewport;

        this.scene;
        this.camera;
        this.renderer;
        this.donunq;
        this.model;

        this.donunqData = {
            title: "donunq",
            scaleX: 5,
            scaleY: 5,
            scaleZ: 5,
            basePosY: 0,
            glazePosY: 0.03,
            extraPosY: 0.06,
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
        this.camera.zoom = 7;
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
        console.log(this.scene)
        const loader = new GLTFLoader();
        loader.load(this.donunqData.path, (gltf) => {
            this.model = gltf.scene
            gltf.scene.scale.set(this.donunqData.scaleX, this.donunqData.scaleY, this.donunqData.scaleZ);
            gltf.scene.children[0].children[1].position.set(0, this.donunqData.glazePosY, 0)
            gltf.scene.children[0].children[2].position.set(0, this.donunqData.extraPosY, 0)
            gltf.scene.children[0].children[3].position.set(0, this.donunqData.extraPosY, 0)
            this.model.children[0].children[1].material = this.model.children[0].children[1].material.clone();
            this.model.children[0].children[2].material = this.model.children[0].children[2].material.clone();
            this.scene.add(gltf.scene);
        })
        console.log(this.model)
    }

    configureExtra(extra) {
        this.model.children[0].children[2].material = new THREE.MeshStandardMaterial({
            color: extra,
            roughness: this.donunqData.roughness,
            metalness: this.donunqData.metalness
        })
        console.log(this.model)
    }

    configureTopping(topping) {
        this.model.children[0].children[1].material = new THREE.MeshStandardMaterial({
            color: topping,
            roughness: this.donunqData.roughness,
            metalness: this.donunqData.metalness
        })
        console.log(this.model)
    }

    raycaster(e) {
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        const targetObj = intersects[0].object.name;
        console.log(targetObj)
        if (targetObj !== null) {
            return targetObj
        }
    }

    createOrbitctrl() {
        // generate orbit controls (around the world around the world)
        // console.log("orbits")
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.7;
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