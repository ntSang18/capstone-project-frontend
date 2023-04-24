import { createApp } from 'vue';
import App from '../../pages/client/App.vue';
import router from '../../router/client';
import store from '../../store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import vue3GoogleLogin from 'vue3-google-login';

const firebaseConfig = {
  apiKey: 'AIzaSyBSQR1RJ8E9ey7US0Tu9-rlMlnwel6rYwY',
  authDomain: 'capstone-project-c0b90.firebaseapp.com',
  projectId: 'capstone-project-c0b90',
  storageBucket: 'capstone-project-c0b90.appspot.com',
  messagingSenderId: '1015198020077',
  appId: '1:1015198020077:web:9042829a2fc481a598f7e4',
  measurementId: 'G-BGN5EJYDL6',
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

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
