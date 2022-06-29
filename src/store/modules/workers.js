export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    workers: [],
    edit_worker: {},
    delete_worker_id: null,
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    workers: (state) => state.workers,
    edit_worker: (state) => state.edit_worker,
    delete_worker_id: (state) => state.delete_worker_id,
  },

  /**********************************************
   * mutations
   **********************************************/
  mutations: {
    WORKERS(state, object) {
      state.workers = object;
    },
    EDIT_WORKER(state, object) {
      state.edit_worker = object;
    },
    UPDATE_WORKER(state, object) {
      const newList = [];
      state.workers.forEach((worker) => {
        if (worker.id !== object.id) newList.push(worker);
        else newList.push(object);
      });
      state.workers = newList;
    },
    DELETE_WORKER_ID(state, id) {
      state.delete_worker_id = id;
    },
    DELETE_WORKER(state) {
      const newList = [];
      state.workers.forEach((worker) => {
        if (worker.id !== state.delete_worker_id) newList.push(worker);
      })
      state.workers = newList
      state.delete_worker_id = null
    }
  },

  /**********************************************
   * actions
   **********************************************/
  actions: {
    workers({ commit }, object) {
      commit('WORKERS', object);
    },
    edit_worker({ commit }, object) {
      commit('EDIT_WORKER', object);
    },
    update_worker({ commit }, object) {
      commit('UPDATE_WORKER', object);
    },
    delete_worker_id({ commit }, id) {
      commit('DELETE_WORKER_ID', id);
    },
    delete_worker({ commit }) {
      commit('DELETE_WORKER');
    },
  },
};
