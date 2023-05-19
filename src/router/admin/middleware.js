import store from '@/store/index';
import { ROLES } from '@/common/roles';

const loggedLinkNames = [
  'Dashboard',
  'Post Management',
  'Account Management',
  'Package Management',
];
const authLinkName = ['Login', 'Forgot'];

export default function checkMiddleware(to, from, next) {
  store.state.token =
    store.state.token === null ? sessionStorage.getItem('token') : store.state.token;
  store.state.user =
    store.state.user === null ? JSON.parse(sessionStorage.getItem('user')) : store.state.user;

  var isAdmin = false;
  if (store.state.user) {
    isAdmin = store.state.user.role === ROLES.ADMIN;
  }

  if (loggedLinkNames.some(name => name === to.name) && (!store.state.token || !isAdmin)) {
    return next({ name: 'Login' });
  } else if (authLinkName.some(name => name === to.name) && store.state.token && isAdmin) {
    return next({ name: 'Home' });
  } else return next();
}
