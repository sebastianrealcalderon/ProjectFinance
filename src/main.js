import { createApp } from 'vue'
import App from './App.vue'
import Toolbar from 'primevue/toolbar';
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

const app = createApp(App)
    .use(PrimeVue)
    .component('pv-toolbar', Toolbar)
    .mount('#app')
