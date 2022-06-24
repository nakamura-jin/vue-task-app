/**
 * teamMixin
 */

import $http from '@/services/httpService';
import $blockui from '@/services/blockuiService';

export default {
  computed: {
    teams() {
      return this.$store.getters['teams/teams'];
    },
    mobileWidth() {
      if (window.visualViewport.width <= 501) return true;
      return false;
    },
  },
  methods: {
    async getTeams() {
      $blockui.show();
      await $http.get('/team').then((response) => {
        const role = JSON.parse(sessionStorage.getItem('data')).role;

        // 権限ありの場合は全て、ない場合ば参加グループのみを表示させる
        if (role === 1)
          this.$store.dispatch('teams/setTeams', response.data.teams);
        else if (role === 2) {
          const teams = [];
          response.data.teams.forEach((team) => {
            team.users.forEach((user) => {
              if (user.id === role) {
                teams.push(team);
              }
            });
          });
          this.$store.dispatch('teams/setTeams', teams);
        }
        $blockui.close();
      });
    },
  },
};
