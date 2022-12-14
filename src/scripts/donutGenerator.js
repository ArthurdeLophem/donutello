import * as THREE from "three";
import {
    GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader.js";
import {
    RGBELoader
} from "three/examples/jsm/loaders/RGBELoader.js";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";

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
            path: "/models/donunqello2.glb",
            lightPath: "/models/fairway.hdr"
        }

        this.toppingObj;
        this.malteserObj;
        this.snickerObj;
        this.twixObj;
        this.leoObj;
        this.glazeObj;
        this.baseObj;
        this.customizables = []

        this.ending = 1;
        this.targetPositions = {
            glaze: 0.005,
            toppers: 0.008
        };
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
    }

    createDonunq() {
        // load donunq + add to scene
        const loader = new GLTFLoader();
        loader.load(this.donunqData.path, (gltf) => {
            this.model = gltf.scene
            gltf.scene.scale.set(this.donunqData.scaleX, this.donunqData.scaleY, this.donunqData.scaleZ);
            this.customizables.push(
                this.malteserObj = this.model.children[0].children[0],
                this.snickerObj = this.model.children[0].children[3],
                this.twixObj = this.model.children[0].children[4],
                this.leoObj = this.model.children[0].children[5],
                this.toppingObj = this.model.children[0].children[1],
                this.glazeObj = this.model.children[0].children[6],
                this.baseObj = this.model.children[0].children[2]
            )

            for (let i = 0; i <= this.customizables.length - 3; i++) {
                const el = this.customizables[i];
                el.position.set(0, this.donunqData.extraPosY, 0)
            }
            this.toppingObj.position.set(0, this.donunqData.vermiPosY, 0)
            this.glazeObj.position.set(0, this.donunqData.glazePosY, 0)

            this.customizables.forEach(el => {
                el.material.clone();
            })

            this.snickerObj.visible = this.twixObj.visible = this.leoObj.visible = false;
            this.scene.add(gltf.scene);
        })
        this.render();
        this.createOrbitctrl();
        this.lights();
        this.animate();
    }

    configureTopping(topping) {
        this.toppingObj.material = new THREE.MeshStandardMaterial({
            color: topping,
            roughness: this.donunqData.roughness,
            metalness: this.donunqData.metalness
        })
    }

    configureGlaze(glaze) {
        this.glazeObj.material = new THREE.MeshStandardMaterial({
            color: glaze,
            roughness: this.donunqData.roughness,
            metalness: this.donunqData.metalness
        })
    }

    configureExtras(extra) {
        switch (extra) {
            case "twix":
                this.snickerObj.visible = this.malteserObj.visible = this.leoObj.visible = false;
                this.twixObj.visible = true;
                break;
            case "leo":
                this.snickerObj.visible = this.malteserObj.visible = this.twixObj.visible = false;
                this.leoObj.visible = true;
                break;
            case "snickers":
                this.leoObj.visible = this.malteserObj.visible = this.twixObj.visible = false;
                this.snickerObj.visible = true;
                break;
            case "maltesers":
                this.leoObj.visible = this.snickerObj.visible = this.twixObj.visible = false;
                this.malteserObj.visible = true;
                break;
        }
    }

    raycaster(e) {
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const defHex = 0x000000;
        let intersectObject = [];
        pointer.x = (e.clientX / this.viewport.offsetWidth) * 2 - 1;
        pointer.y = -(e.clientY / this.viewport.offsetHeight) * 2 + 1;
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

    ender() {
        this.ending = true;
    }

    unEnder() {
        this.ending = false;
    }

    intersectObj(e) {
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        pointer.x = (e.clientX / this.viewport.offsetWidth) * 2 - 1;
        pointer.y = -(e.clientY / this.viewport.offsetHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, this.camera);
        const intersects = raycaster.intersectObjects(this.scene.children);
        const targetObj = intersects[0].object.name;
        if (targetObj !== null) {
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
        if (typeof (this.ending) != "number") {
            if (this.ending == true) {
                if (this.glazeObj.position.y > this.targetPositions.glaze) {
                    this.glazeObj.position.y -= 0.0007
                }
                if (this.toppingObj.position.y > this.targetPositions.toppers) {
                    this.toppingObj.position.y -= 0.0009
                }
                if (this.customizables[1].position.y > this.targetPositions.toppers) {
                    for (let i = 0; i <= this.customizables.length - 4; i++) {
                        const el = this.customizables[i];
                        el.position.y -= 0.001
                    }
                }
            }
            if (this.ending == false) {
                if (this.glazeObj.position.y < this.donunqData.glazePosY) {
                    this.glazeObj.position.y += 0.0007
                }
                if (this.toppingObj.position.y < this.donunqData.vermiPosY) {
                    this.toppingObj.position.y += 0.0009
                }
                if (this.customizables[1].position.y < this.donunqData.extraPosY) {
                    for (let i = 0; i <= this.customizables.length - 4; i++) {
                        const el = this.customizables[i];
                        el.position.y += 0.001
                    }
                }
            }
        }
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