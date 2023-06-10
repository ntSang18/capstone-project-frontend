const mutations = {
  setToken(state, data) {
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
};

export default mutations;
