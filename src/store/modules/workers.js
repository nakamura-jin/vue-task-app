export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    workers: [],
    edit_worker: {}
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    workers: (state) => state.workers,
    edit_worker: (state) => state.edit_worker,
  },

  /**********************************************
   * mutations
   **********************************************/
  mutations: {
    WORKERS (state, object) {
      state.workers = object
    },
    EDIT_WORKER(state, object) {
      state.edit_worker = object
    },
    UPDATE_WORKER(state, object) {
      const newList= []
      state.workers.forEach(worker => {
        if (worker.id !== object.id) newList.push(worker)
        else newList.push(object)
      })
      state.workers = newList
    }
  },

  /**********************************************
   * actions
   **********************************************/
  actions: {
    workers({ commit }, object) {
      commit('WORKERS', object)
    },
    edit_worker({ commit }, object) {
      commit('EDIT_WORKER', object)
    },
    update_worker({ commit }, object) {
      commit('UPDATE_WORKER', object)
    }
  },
};
