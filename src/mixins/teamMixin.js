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
      if (window.visualViewport.width <= 961) return true;
      return false;
    },
  },
  methods: {
    async getTeams() {
      $blockui.show();
      await $http.get('/team').then((response) => {
        const role = JSON.parse(sessionStorage.getItem('data')).role;
        const login_user = JSON.parse(sessionStorage.getItem('data')).user;

        // 権限ありの場合は全て、ない場合ば参加グループのみを表示させる
        if (role === 1)
          this.$store.dispatch('teams/setTeams', response.data.teams);
        else if (role === 2) {
          const teams = [];
          console.log(response.data.teams);
          response.data.teams.forEach((team) => {
            team.users.forEach((user) => {
              if (user.id === login_user) {
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
