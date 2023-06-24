import {
    createWebHistory,
    createRouter
} from "vue-router";
import Home from './views/index.vue'
import Generator from './views/generator.vue'
import redirect from './middleware/redirect.js'

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/generator",
        name: "Generator",
        component: Generator,
        beforeEnter: redirect
    }
]

//router constructor
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;