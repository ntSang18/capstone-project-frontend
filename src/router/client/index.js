import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/client/auth/LoginView.vue';
import RegisterView from '@/views/client/auth/RegisterView.vue';
import ForgotView from '@/views/client/auth/ForgotView.vue';
import ReconfirmView from '@/views/client/auth/ReconfirmView.vue';
import ResetView from '@/views/client/auth/ResetView.vue';
import MainLayout from '@/layouts/client/MainLayout.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: 'Register',
    },
    component: RegisterView,
  },
  {
    path: '/forgot',
    name: 'Forgot',
    meta: {
      title: 'Forgot',
    },
    component: ForgotView,
  },
  {
    path: '/reconfirm',
    name: 'Reconfirm',
    meta: {
      title: 'Reconfirm',
    },
    component: ReconfirmView,
  },
  {
    path: '/reset/:token',
    name: 'Reset',
    meta: {
      title: 'Reset',
    },
    component: ResetView,
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      title: 'Index',
    },
    component: MainLayout,
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
