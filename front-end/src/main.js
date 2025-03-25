import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './store';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(VCalendar).mount('#app')

const authStore = useAuthStore();
authStore.loadFromLocalStorage();