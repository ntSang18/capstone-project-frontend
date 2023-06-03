import { createApp } from 'vue';
import App from '../../pages/client/App.vue';
import router from '../../router/client';
import store from '../../store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import vue3GoogleLogin from 'vue3-google-login';

var Vue = createApp(App);
Vue.use(store);
Vue.use(router);
Vue.use(ElementPlus);
Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
});
Vue.use(vue3GoogleLogin, {
  clientId: '87142437898-61a2n429e1qsvbg0hsfb51gnunnqga9h.apps.googleusercontent.com',
});
Vue.mount('#app');
