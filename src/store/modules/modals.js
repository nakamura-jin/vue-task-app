export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    isModal: false,
    modal: '',
    members: [],
    crud: '',
    edit: false,
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    isModal: (state) => state.isModal,
    modal: (state) => state.modal,
    members: (state) => state.members,
    crud: (state) => state.crud,
    edit: (state) => state.edit,
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
    DELETE_MEMBER(state, deleteMember) {
      const newMembers = [];
      state.members.filter((member) => {
        if (member.id !== deleteMember.id) {
          newMembers.push(member);
        }
      });
      state.members = newMembers;
    },
    CRUD(state, crud) {
      state.crud = crud;
    },
    ON_EDIT(state, bool) {
      state.edit = bool;
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
    deleteMember({ commit }, deleteMember) {
      commit('DELETE_MEMBER', deleteMember);
    },
    crud({ commit }, crud) {
      commit('CRUD', crud);
    },
    onEdit({ commit }, bool) {
      commit('ON_EDIT', bool);
    },
  },
};
