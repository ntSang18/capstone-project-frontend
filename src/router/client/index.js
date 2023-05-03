import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/client/auth/LoginView';
import RegisterView from '@/views/client/auth/RegisterView';
import ForgotView from '@/views/client/auth/ForgotView';
import ReconfirmView from '@/views/client/auth/ReconfirmView';
import ResetView from '@/views/client/auth/ResetView';
import MainLayout from '@/layouts/client/MainLayout';
import HomeView from '@/views/client/HomeView';
import DetailPostView from '@/views/client/DetailPostView';

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
    path: '',
    name: 'Index',
    meta: {
      title: 'Index',
    },
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: 'Home',
        },
        component: HomeView,
      },
      {
        path: '/:id',
        name: 'Detail Post',
        meta: {
          title: 'Details',
        },
        component: DetailPostView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
