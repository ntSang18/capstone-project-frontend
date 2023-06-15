import { createRouter, createWebHistory } from 'vue-router';
import checkMiddleware from './middleware';

import LoginView from '@/views/admin/auth/LoginView';
import ForgotView from '@/views/admin/auth/ForgotView';
import MainLayout from '@/layouts/admin/MainLayout';
import DashboardView from '@/views/admin/DashboardView';
import ManagePostView from '@/views/admin/ManagePostView';
import ManageAccountView from '@/views/admin/ManageAccountView';
import ManagePackageView from '@/views/admin/ManagePackageView';
import ManagePromotionView from '@/views/admin/ManagePromotionView';
import IncomeView from '@/views/admin/IncomeView';

const routes = [
  {
    path: '/admin/login',
    name: 'Login',
    meta: {
      title: 'Login',
    },
    component: LoginView,
  },
  {
    path: '/admin/forgot',
    name: 'Forgot',
    meta: {
      title: 'Forgot',
    },
    component: ForgotView,
  },
  {
    path: '/admin',
    name: 'Index',
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
          title: 'Package Management',
        },
        component: ManagePackageView,
      },
      {
        path: '/admin/manage-promotion',
        name: 'Promotion Management',
        meta: {
          title: 'Promotion Management',
        },
        component: ManagePromotionView,
      },
      {
        path: '/admin/income',
        name: 'Income',
        meta: {
          title: 'Income',
        },
        component: IncomeView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(checkMiddleware);

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
