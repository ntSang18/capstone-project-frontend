import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/client/auth/LoginView';
import RegisterView from '@/views/client/auth/RegisterView';
import ForgotView from '@/views/client/auth/ForgotView';
import ReconfirmView from '@/views/client/auth/ReconfirmView';
import ResetView from '@/views/client/auth/ResetView';
import MainLayout from '@/layouts/client/MainLayout';
import HomeView from '@/views/client/HomeView';
import DetailPostView from '@/views/client/DetailPostView';
import UserInfoView from '@/views/client/UserInfoView';
import PostManageView from '@/views/client/PostManageView';
import SavedPostView from '@/views/client/SavedPostView';
import PaymentView from '@/views/client/PaymentView';
import PaymentMethodView from '@/views/client/PaymentMethodView';
import PriceTagView from '@/views/client/PriceTagView';
import PaymentHistoryView from '@/views/client/PaymentHistoryView';
import PurchaseHistoryView from '@/views/client/PurchaseHistoryView';
import AccountSettingView from '@/views/client/AccountSettingView';
import CreatePostView from '@/views/client/CreatePostView';

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
        path: '/post/:id',
        name: 'Detail Post',
        meta: {
          title: 'Details',
        },
        component: DetailPostView,
      },
      {
        path: '/info',
        name: 'User Information',
        meta: {
          title: 'Information',
        },
        component: UserInfoView,
      },
      {
        path: '/manage',
        name: 'Post Management',
        meta: {
          title: 'Post Management',
        },
        component: PostManageView,
      },
      {
        path: '/manage',
        name: 'Post Management',
        meta: {
          title: 'Post Management',
        },
        component: PostManageView,
      },
      {
        path: '/saved',
        name: 'Saved Post',
        meta: {
          title: 'Saved Posts',
        },
        component: SavedPostView,
      },
      {
        path: '/payment',
        name: 'Payment',
        meta: {
          title: 'Payment',
        },
        component: PaymentView,
      },
      {
        path: '/payment-method/:name',
        name: 'Payment Method',
        meta: {
          title: 'Payment Method',
        },
        component: PaymentMethodView,
      },
      {
        path: '/price',
        name: 'Price Tag',
        meta: {
          title: 'Price Tag',
        },
        component: PriceTagView,
      },
      {
        path: '/payment-history',
        name: 'Payment History',
        meta: {
          title: 'Payment History',
        },
        component: PaymentHistoryView,
      },
      {
        path: '/purchase-history',
        name: 'Purchase History',
        meta: {
          title: 'Purchase History',
        },
        component: PurchaseHistoryView,
      },
      {
        path: '/account-setting',
        name: 'Account Setting',
        meta: {
          title: 'Account Setting',
        },
        component: AccountSettingView,
      },
      {
        path: '/create-post',
        name: 'Create Post',
        meta: {
          title: 'Create Post',
        },
        component: CreatePostView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
