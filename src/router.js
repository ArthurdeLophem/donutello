import { createWebHistory, createRouter } from "vue-router";
import Home from './views/index.vue'
import Gallery from './views/gallery.vue'
import Generator from './views/generator.vue'
import Login from './views/login.vue'

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/gallery", name: "Gallery", component: Gallery },
    { path: "/generator", name: "Generator", component: Generator },
    { path: "/login", name: "Login", component: Login }
]

//router constructor
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;