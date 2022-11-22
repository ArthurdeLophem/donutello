import { createWebHistory, createRouter } from "vue-router";
import Home from './views/index.vue'
import Gallery from './views/gallery.vue'
import Generator from './views/generator.vue'

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/gallery", name: "Gallery", component: Gallery },
    { path: "/generator", name: "Generator", component: Generator }
]

//router constructor
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;