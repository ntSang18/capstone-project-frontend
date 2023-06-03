import store from '@/store/index';

const loggedLinkNames = [
  'User Information',
  'Post Management',
  'Payment',
  'Payment Method',
  'Payment History',
  'Purchase History',
  'Account Setting',
  'Create Post',
];
const authLinkName = ['Login', 'Register', 'Forgot', 'Reconfirm', 'Reset'];

export default function checkMiddleware(to, from, next) {
  store.state.client.token =
    store.state.client.token === null ? sessionStorage.getItem('token') : store.state.client.token;
  store.state.client.user =
    store.state.client.user === null
      ? JSON.parse(sessionStorage.getItem('user'))
      : store.state.client.user;

  if (loggedLinkNames.some(name => name === to.name) && !store.state.client.token) {
    return next({ name: 'Login' });
  } else if (authLinkName.some(name => name === to.name) && store.state.client.token) {
    return next({ name: 'Home' });
  } else return next();
}
