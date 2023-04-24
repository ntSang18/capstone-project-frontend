import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/admin/auth/LoginView.vue';
import AdminLayout from '@/layouts/admin/MainLayout.vue';

const routes = [
  {
    path: '/admin/login',
    name: 'login',
    meta: {
      title: 'Login',
    },
    component: LoginView,
  },
  {
    path: '/admin',
    name: 'index',
    meta: {
      title: 'Index',
    },
    component: AdminLayout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
