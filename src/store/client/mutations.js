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
  addSavedPost(state, post) {
    var index = state.savedPosts.findIndex(p => p.id === post.id);
    if (index < 0) {
      state.savedPosts.push(post);
    }
  },
  removeSavedPost(state, post) {
    var index = state.savedPosts.findIndex(p => p.id === post.id);
    if (index >= 0) {
      state.savedPosts.splice(index, 1);
    }
  },
};

export default mutations;
