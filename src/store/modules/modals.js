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
    create: false,
    beforeModal: '',
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
    create: (state) => state.create,
    beforeModal: (state) => state.beforeModal,
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
    ON_CREATE(state, bool) {
      state.create = bool;
    },
    BEFORE_MODAL(state, modal) {
      state.beforeModal = modal;
    },
    beforeModal: (state) => state.beforeModal,
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
    onCreate({ commit }, bool) {
      commit('ON_CREATE', bool);
    },
    beforeModal({ commit }, modal) {
      commit('BEFORE_MODAL', modal);
    },
  },
};
