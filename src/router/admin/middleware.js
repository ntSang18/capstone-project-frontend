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
  store.state.admin.token =
    store.state.admin.token === null ? sessionStorage.getItem('token') : store.state.admin.token;
  store.state.admin.user =
    store.state.admin.user === null
      ? JSON.parse(sessionStorage.getItem('user'))
      : store.state.admin.user;

  var isAdmin = false;
  if (store.state.admin.user) {
    isAdmin = store.state.admin.user.role === ROLES.ADMIN;
  }

  if (loggedLinkNames.some(name => name === to.name) && (!store.state.admin.token || !isAdmin)) {
    return next({ name: 'Login' });
  } else if (authLinkName.some(name => name === to.name) && store.state.admin.token && isAdmin) {
    return next({ name: 'Home' });
  } else return next();
}
