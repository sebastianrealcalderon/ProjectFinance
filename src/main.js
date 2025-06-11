import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index.js'
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import Toolbar from 'primevue/toolbar';
import {AutoComplete, Button, InputText, Password} from "primevue";






const app = createApp(App)

app
    .use(router)
    .component('pv-toolbar', Toolbar)
    .component('pv-autoComplete', AutoComplete )
    .component('pv-password', Password)
    .component('pv-inputText', InputText)
    .component('pv-button', Button)
    .use(PrimeVue)
    .mount('#app')
