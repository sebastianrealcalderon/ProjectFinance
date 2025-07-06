
import {createRouter, createWebHistory} from "vue-router";
const EmisorBonoList=() => import("@/finance/pages/emisor-bono-list.vue");
const  LogInPage = ()=> import("@/auth/pages/log-in.page.vue")
const Home =()=> import("@/public/components/home.component.vue")
const InversorPage =()=>import("@/public/components/inversor-prueba.page.vue")
const RegisterUser =()=>import("@/auth/pages/register-user.component.vue")
const AnalisisBono =()=> import("@/finance/pages/emisor-bono-create.page.vue")

const routes = [
    { path: '/login', name: 'login', component: LogInPage, meta: { title: 'Login' } },
    { path: '/home', name: 'home', component: Home },
    { path: '/inversor', name: 'inversor', component: InversorPage },
    { path: '/register', name: 'register', component: RegisterUser },
    {path: '/analisis-bono', name: 'analisis-bono', component: AnalisisBono},
    {path: '/emisor-bono-list',name:'emisorBonoList',component: EmisorBonoList},
    { path: '/', name: 'default', redirect: {name: 'login'} },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;