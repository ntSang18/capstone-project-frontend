import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
import createPersistedState from 'vuex-persistedstate';

const toast = useToast();
export default createStore({
  plugins: [createPersistedState()],
  state: {
    toast: toast,
    token: null,
    user: null,
  },
  getters: {},
  mutations: {
    async setToken(state, data) {
      state.token = data.token;
      sessionStorage.setItem('token', state.token);
    },
    setUser(state, data) {
      state.user = data;
      sessionStorage.setItem('user', JSON.stringify(state.user));
    },
    clearStore(state) {
      sessionStorage.clear();
      state.token = null;
      state.user = null;
    },
  },
  actions: {
    setToken(content, data) {
      content.commit('setToken', data);
    },
    setUser(content, data) {
      content.commit('setUser', data);
    },
    clearStore(content) {
      content.commit('clearStore');
    },
  },
  modules: {},
});
