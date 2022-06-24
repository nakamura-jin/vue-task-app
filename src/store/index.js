import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  /**********************************************
   * state
   **********************************************/
  state: {
    isLoading: false,
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    isLoading: (state) => state.isLoading,
  },

  /**********************************************
   * mutations
   **********************************************/
  mutations: {
    IS_LOADING(state, bool) {
      state.isLoading = bool;
    }
  },

  /**********************************************
   * actions
   **********************************************/
  actions: {
    isLoading({ commit }, bool) {
      commit('IS_LOADING', bool);
    },
  },
});
