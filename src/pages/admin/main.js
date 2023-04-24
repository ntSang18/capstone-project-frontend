import { createApp } from 'vue';
import App from '../../pages/client/App.vue';
import router from '../../router/admin';
import store from '../../store';

createApp(App).use(store).use(router).mount('#app');
