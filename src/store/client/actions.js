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
  addSavedPost(content, post) {
    content.commit('addSavedPost', post);
  },
  removeSavedPost(content, post) {
    content.commit('removeSavedPost', post);
  },
};

export default actions;
