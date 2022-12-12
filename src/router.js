import { createWebHistory, createRouter } from "vue-router";
import Home from './views/index.vue'
import Generator from './views/generator.vue'
import Previewer from './views/previewer.vue'
import OrderPanel from './views/orderPanel.vue'
import Login from './views/login.vue'
import Dashboard from './views/dashboard.vue'
import ChangePassword from './views/changePassword.vue'
import Details from './views/details.vue'

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/previewer", name: "Previewer", component: Previewer },
    { path: "/order", name: "Order", component: OrderPanel },
    { path: "/order", name: "Order", component: OrderPanel },
    { path: "/login", name: "Login", component: Login },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
    { path: "/change-password", name: "ChangePassword", component: ChangePassword },
    { path: "/details", name: "Details", component: Details },

]

//router constructor
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;