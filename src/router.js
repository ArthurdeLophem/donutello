import {
    createWebHistory,
    createRouter
} from "vue-router";
import Home from './views/index.vue'
import Generator from './views/generator.vue'
import Previewer from './views/previewer.vue'
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