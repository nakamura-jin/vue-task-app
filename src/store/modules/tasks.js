export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    task_id: null,
    select_task: {},
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    task_id: (state) => state.task_id,
    select_task: (state) => state.select_task,
  },

  /**********************************************
   * mutations
   **********************************************/
  mutations: {
    SET_TASK_ID(state, id) {
      state.task_id = id;
    },
    SELECT_TASK(state, selectTask) {
      state.select_task = selectTask;
    },
    DELETE_MEMBER(state) {
      state.select_task.user_name = '';
    },
  },

  /**********************************************
   * actions
   **********************************************/
  actions: {
    setTaskId({ commit }, id) {
      commit('SET_TASK_ID', id);
    },
    selectTask({ commit }, selectTask) {
      commit('SELECT_TASK', selectTask);
    },
    deleteMember({ commit }) {
      commit('DELETE_MEMBER');
    },
  },
};
