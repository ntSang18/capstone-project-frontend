import { createApp } from 'vue';
import App from '../../pages/client/App.vue';
import router from '../../router/admin';
import store from '../../store';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import {
  Chart as ChartJS,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
);

var Vue = createApp(App);
Vue.use(store);
Vue.use(router);
Vue.use(ElementPlus);
Vue.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
});
Vue.mount('#app');
