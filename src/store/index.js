import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
import createPersistedState from 'vuex-persistedstate';
import client from './client/index';
import admin from './admin/index';

const toast = useToast();
export default createStore({
  plugins: [createPersistedState()],
  state: {
    toast: toast,
  },
  modules: {
    client: client,
    admin: admin,
  },
});
