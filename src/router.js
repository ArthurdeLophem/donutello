import { createWebHistory, createRouter } from "vue-router";
import Home from './views/index.vue'
import Generator from './views/generator.vue'
import Login from './views/login.vue'
import Dashboard from './views/dashboard.vue'

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/generator", name: "Generator", component: Generator },
    { path: "/login", name: "Login", component: Login },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },

]

//router constructor
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;