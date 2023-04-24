import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
import verifyJwtToken from '@/utils/deToken';

const toast = useToast();
export default createStore({
  state: {
    toast: toast,
    token: null,
    user: null,
  },
  getters: {},
  mutations: {
    async deToken(state, data) {
      state.token = data.token;
      state.user = await verifyJwtToken(data.token);
      sessionStorage.setItem('token', state.token);
      sessionStorage.setItem('user', JSON.stringify(state.customer));
    },
    updateUser(state, data) {
      state.user = data;
      sessionStorage.setItem('user', JSON.stringify(state.customer));
    },
    clearStore(state) {
      sessionStorage.clear();
      state.token = null;
      state.user = null;
    },
  },
  actions: {
    deToken(content, data) {
      content.commit('deToken', data);
    },
    updateUser(content, data) {
      content.commit('updateUser', data);
    },
    clearStore(content) {
      content.commit('clearStore');
    },
  },
  modules: {},
});
