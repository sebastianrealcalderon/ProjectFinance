import { createApp } from 'vue'
import App from './App.vue'
import Toolbar from 'primevue/toolbar';


const app = createApp(App)
    .component('pv-toolbar', Toolbar)
    .mount('#app')
