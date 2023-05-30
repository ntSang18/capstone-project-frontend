const actions = {
  setToken(content, data) {
    content.commit('setToken', data);
  },
  setUser(content, data) {
    content.commit('setUser', data);
  },
  clearStore(content) {
    content.commit('clearStore');
  },
};

export default actions;
