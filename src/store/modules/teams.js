export default {
  namespaced: true,

  /**********************************************
   * state
   **********************************************/
  state: {
    teams: [],
    task_team: [],
    delete_team_id: null,
    task_user: null,
  },

  /**********************************************
   * getters
   **********************************************/
  getters: {
    teams: (state) => state.teams,
    task_team: (state) => state.task_team,
    delete_team_id: (state) => state.delete_team_id,
    task_user: (state) => state.task_user,
  },

  /**********************************************
   * mutations
   **********************************************/
  mutations: {
    TEAMS(state, teams) {
      state.teams = teams;
    },
    TASK_TEAM(state, team) {
      state.task_team = team;
    },
    ADD_MEMBER(state, members) {
      members.forEach((member) => {
        state.task_team.users.push(member);
      });
    },
    DELETE_MEMBER(state, deleteMember) {
      const newMembers = [];
      state.task_team.users.filter((user) => {
        if (user.id !== deleteMember.id) {
          newMembers.push(user);
        }
      });
      state.task_team.users = newMembers;
    },
    DELETE_TEAM_ID(state, id) {
      state.delete_team_id = id;
    },
    DELETE_TEAM(state, team_id) {
      const teams = [];
      state.teams.forEach((team) => {
        if (team.id != team_id) teams.push(team);
      });
      state.teams = teams;
    },
    TASK_USER(state, member) {
      state.task_user = member;
    },
  },

  /**********************************************
   * actions
   **********************************************/
  actions: {
    setTeams({ commit }, teams) {
      commit('TEAMS', teams);
    },
    setTaskTeam({ commit }, team) {
      commit('TASK_TEAM', team);
    },
    addMember({ commit }, mebers) {
      commit('ADD_MEMBER', mebers);
    },
    deleteMember({ commit }, deleteMember) {
      commit('DELETE_MEMBER', deleteMember);
    },
    delete_team_id({ commit }, id) {
      commit('DELETE_TEAM_ID', id);
    },
    delete_team({ commit }, team_id) {
      commit('DELETE_TEAM', team_id);
    },
    taskUser({ commit }, member) {
      commit('TASK_USER', member);
    },
  },
};
