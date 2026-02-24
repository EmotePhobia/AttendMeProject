import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "./router/index";
import "./style.css"
import App from './App.vue';
import { configureApi } from "@/api/client";
configureApi();
createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
