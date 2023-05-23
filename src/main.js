import { createApp } from 'vue'
import './style.sass';
import App from './App.vue'
import router from './Router.js';


createApp(App).use(router).mount('#app')
