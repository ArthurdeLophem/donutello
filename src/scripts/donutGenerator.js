import * as THREE from "three";
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
        this.raycaster;
        this.pointer;

        this.donunqData = {
            title: "donunq",
            scaleX: 5,
            scaleY: 5,
            scaleZ: 5,
            basePosY: 0,
            glazePosY: 0.03,
            vermiPosY: 0.06,
            extraPosY: 0.08,
            roughness: 0.2235293984413147,
            metalness: 0.24705882370471954,
            path: "./models/donunqello.glb",
            lightPath: "./models/fairway.hdr"
        }

        this.vermiObj;
        this.malteserObj;
        this.snickerObj;
        this.twixObj;
        this.leoObj;
        this.glazeObj;
        this.baseObj;

        this.customizables = []
    }

    createScene(viewport) {
        // create scene + camera
        this.viewport = viewport
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.viewport.offsetWidth / this.viewport.offsetHeight, 0.1, 500);
        this.camera.position.set(0, 0.4, 1.2);

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
        const loader = new GLTFLoader();
        loader.load(this.donunqData.path, (gltf) => {
            this.model = gltf.scene
            gltf.scene.scale.set(this.donunqData.scaleX, this.donunqData.scaleY, this.donunqData.scaleZ);
            console.log(this.model)
            this.customizables.push(this.malteserObj = this.model.children[0].children[0])
            this.customizables.push(this.snickerObj = this.model.children[0].children[3])
            this.customizables.push(this.twixObj = this.model.children[0].children[4])
            this.customizables.push(this.leoObj = this.model.children[0].children[5])
            this.customizables.push(this.vermiObj = this.model.children[0].children[1])
            this.customizables.push(this.glazeObj = this.model.children[0].children[6])
            this.customizables.push(this.baseObj = this.model.children[0].children[2])

            for (let i = 0; i <= this.customizables.length - 3; i++) {
                const el = this.customizables[i];
                el.position.set(0, this.donunqData.extraPosY, 0)
            }
            this.vermiObj.position.set(0, this.donunqData.vermiPosY, 0)
            this.glazeObj.position.set(0, this.donunqData.glazePosY, 0)

            this.customizables.forEach(el => {
                el.material.clone();
            })

            this.snickerObj.visible = this.twixObj.visible = this.leoObj.visible = false;
            this.scene.add(gltf.scene);
        })
    }

    configureExtra(extra) {
        this.vermiObj.material = new THREE.MeshStandardMaterial({
            color: extra,
            roughness: this.donunqData.roughness,
            metalness: this.donunqData.metalness
        })
    }

    configureTopping(topping) {
        this.glazeObj.material = new THREE.MeshStandardMaterial({
            color: topping,
            roughness: this.donunqData.roughness,
            metalness: this.donunqData.metalness
        })
    }

    raycaster(e) {
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const defHex = 0x000000;
        let intersectObject = [];
        pointer.x = (e.clientX / this.viewport.offsetWidth) * 2 - 1;
        pointer.y = - (e.clientY / this.viewport.offsetHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            intersectObject.push(intersects[0].object);
            intersectObject.forEach(el => {
                el.material.emissive.setHex(0xed2970);
            });
        } else if (intersectObject.length === 0) {
            this.customizables.forEach(el => {
                el.material.emissive.setHex(defHex);
            })
        }
    }

    intersectObj(e) {
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        pointer.x = (e.clientX / this.viewport.offsetWidth) * 2 - 1;
        pointer.y = - (e.clientY / this.viewport.offsetHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        const targetObj = intersects[0].object.name;
        if (targetObj !== null) {
            console.log(targetObj);
            return targetObj
        }
    }

    createOrbitctrl() {
        // generate orbit controls (around the world around the world)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.07;
        this.controls.enableZoom = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.7;
        this.controls.maxPolarAngle = Math.PI / 1.8;
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