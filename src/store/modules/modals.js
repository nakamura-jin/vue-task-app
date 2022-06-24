export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    isModal: false,
    modal: '',
    members: [],
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    isModal: (state) => state.isModal,
    modal: (state) => state.modal,
    members: (state) => state.members,
  },

  /**********************************************
   * mutations
   **********************************************/
  mutations: {
    IS_MODAL(state, bool) {
      state.isModal = bool;
    },
    SELECT_MODAL(state, modal) {
      state.modal = modal;
    },
    MEMBERS(state, array) {
      state.members = array;
    },
  },

  /**********************************************
   * actions
   **********************************************/
  actions: {
    isModal({ commit }, bool) {
      commit('IS_MODAL', bool);
    },
    selectModal({ commit }, modal) {
      commit('SELECT_MODAL', modal);
    },
    members({ commit }, array) {
      commit('MEMBERS', array);
    },
  },
};
