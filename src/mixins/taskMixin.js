import $http from '@/services/httpService';

export default {
  /************************************************************
   * computed
   ************************************************************/
  computed: {
    team() {
      return this.$store.getters['teams/task_team'];
    },

    beforeWork() {
      const tasks = this.$store.getters['teams/task_team'].tasks;
      const beforeWork = [];
      if (tasks) {
        tasks.forEach((task) => {
          if (task.item_id === 1) {
            beforeWork.push(task);
          }
        });
      }
      return beforeWork;
    },

    inProcess() {
      const tasks = this.$store.getters['teams/task_team'].tasks;
      const inProcess = [];
      if (tasks) {
        tasks.forEach((task) => {
          if (task.item_id === 2) {
            inProcess.push(task);
          }
        });
      }
      return inProcess;
    },

    inConfirmation() {
      const tasks = this.$store.getters['teams/task_team'].tasks;
      const inConfirmation = [];
      if (tasks) {
        tasks.forEach((task) => {
          if (task.item_id === 3) {
            inConfirmation.push(task);
          }
        });
      }
      return inConfirmation;
    },

    completion() {
      const tasks = this.$store.getters['teams/task_team'].tasks;
      const completion = [];
      if (tasks) {
        tasks.forEach((task) => {
          if (task.item_id === 4) {
            completion.push(task);
          }
        });
      }
      return completion;
    },
  },

  /************************************************************
   * methods
   ************************************************************/
  methods: {
    async getTeam() {
      const query = {
        id: this.$route.params.team_id,
      };
      await $http
        .get(`/team/${this.$route.params.team_id}`, query)
        .then((response) => {
          this.$store.dispatch('teams/setTaskTeam', response.data.team);
        });
    },
  },
};
