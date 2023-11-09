import state from './state';
import mutations from './mutations';
import actions from './actions';

const admin = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
};

export default admin;
