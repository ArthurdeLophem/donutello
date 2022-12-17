import {
    createWebHistory,
    createRouter
} from "vue-router";
import Home from './views/index.vue'
import Generator from './views/generator.vue'
import Previewer from './views/previewer.vue'
import OrderPanel from './views/orderPanel.vue'
import Login from './views/login.vue'
import Dashboard from './views/dashboard.vue'
import ChangePassword from './views/changePassword.vue'
import Details from './views/details.vue'
import Overview from './views/overview.vue'
import Mobile from './views/mobile.vue'
import redirect from './middleware/redirect.js'

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/previewer",
        name: "Previewer",
        component: Previewer,
        beforeEnter: redirect
    },
    {
        path: "/generator",
        name: "Generator",
        component: Generator,
        beforeEnter: redirect
    },
    {
        path: "/order",
        name: "Order",
        component: OrderPanel,
        beforeEnter: redirect
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: redirect
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: redirect
    },
    {
        path: "/change-password",
        name: "ChangePassword",
        component: ChangePassword,
        beforeEnter: redirect
    },
    {
        path: "/details",
        name: "Details",
        component: Details,
        beforeEnter: redirect
    },
    {
        path: "/overview",
        name: "Overview",
        component: Overview,
        beforeEnter: redirect
    },
    {
        path: "/mobile",
        name: "Mobile",
        component: Mobile,
    }
]

//router constructor
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;