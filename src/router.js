import { createWebHistory, createRouter } from "vue-router";
import Home from './views/index.vue'
import Generator from './views/generator.vue'
import OrderPanel from './views/orderPanel.vue'
import Login from './views/login.vue'
import Dashboard from './views/dashboard.vue'
import ChangePassword from './views/changePassword.vue'
import Details from './views/details.vue'
import Overview from './views/overview.vue'

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/generator", name: "Generator", component: Generator },
    { path: "/order", name: "Order", component: OrderPanel },
    { path: "/login", name: "Login", component: Login },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/change-password", name: "ChangePassword", component: ChangePassword },
    { path: "/details", name: "Details", component: Details },
    { path: "/overview", name: "Overview", component: Overview }

]

//router constructor
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;