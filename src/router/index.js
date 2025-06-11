
import {createRouter, createWebHistory} from "vue-router";
const  LogInPage = ()=> import("@/auth/pages/log-in.page.vue")
const Home =()=> import("@/public/components/home.component.vue")
const InversorPage =()=>import("@/public/components/inversor-prueba.page.vue")

const routes = [
    { path: '/login', name: 'login', component: LogInPage, meta: { title: 'Login' } },
    { path: '/home', name: 'home', component: Home },
    { path: '/inversor', name: 'inversor', component: InversorPage },
    { path: '/', name: 'default', redirect: {name: 'login'} },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;