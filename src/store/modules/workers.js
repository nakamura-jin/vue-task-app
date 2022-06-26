export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    workers: []
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    workers: (state) => state.workers,
  },

  /**********************************************
   * mutations
   **********************************************/
  mutations: {
    WORKERS (state, object) {
      state.workers = object
    }
  },

  /**********************************************
   * actions
   **********************************************/
  actions: {
    workers({ commit }, object) {
      commit('WORKERS', object)
    }
  },
};
