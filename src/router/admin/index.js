import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/admin/auth/LoginView';
import MainLayout from '@/layouts/admin/MainLayout';
import DashboardView from '@/views/admin/DashboardView';
import ManagePostView from '@/views/admin/ManagePostView';
import ManageAccountView from '@/views/admin/ManageAccountView';
import ManagePackageView from '@/views/admin/ManagePackageView';

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
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
        },
        component: DashboardView,
      },
      {
        path: '/admin/manage-post',
        name: 'Post Management',
        meta: {
          title: 'Post Management',
        },
        component: ManagePostView,
      },
      {
        path: '/admin/manage-account',
        name: 'Account Management',
        meta: {
          title: 'Account Management',
        },
        component: ManageAccountView,
      },
      {
        path: '/admin/manage-package',
        name: 'Package Management',
        meta: {
          title: 'package Management',
        },
        component: ManagePackageView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
