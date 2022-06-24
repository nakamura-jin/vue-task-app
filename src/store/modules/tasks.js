export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    task_id: null,
    select_task: {},
    delete_task_id: null,
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    task_id: (state) => state.task_id,
    select_task: (state) => state.select_task,
    delete_task_id: (state) => state.delete_task_id,
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
    DELETE_TASK_ID(state, id) {
      state.delete_task_id = id;
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
    delete_task_id({ commit }, id) {
      commit('DELETE_TASK_ID', id);
    },
  },
};
