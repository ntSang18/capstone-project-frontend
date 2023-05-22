import store from '@/store/index';

const loggedLinkNames = [
  'User Information',
  'Post Management',
  'Saved Post',
  'Payment',
  'Payment Method',
  'Payment History',
  'Purchase History',
  'Account Setting',
  'Create Post',
];
const authLinkName = ['Login', 'Register', 'Forgot', 'Reconfirm', 'Reset'];

export default function checkMiddleware(to, from, next) {
  store.state.token =
    store.state.token === null ? sessionStorage.getItem('token') : store.state.token;
  store.state.user =
    store.state.user === null ? JSON.parse(sessionStorage.getItem('user')) : store.state.user;

  if (loggedLinkNames.some(name => name === to.name) && !store.state.token) {
    return next({ name: 'Login' });
  } else if (authLinkName.some(name => name === to.name) && store.state.token) {
    return next({ name: 'Home' });
  } else return next();
}
