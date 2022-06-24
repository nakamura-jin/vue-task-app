<style lang="scss" scoped>
  @import './CreateTeamModal.scss';
</style>
<template>
  <div class="create-team">
    <form @submit.prevent="createTeam">
      <div class="create-team__container">
        <label class="create-team__label-group_name">グループ名</label>
        <input type="text" v-model="team_name" />
        <div class="create-team__member">
          <label class="create-team__label-member">メンバー</label>
          <span @click="member"><font-awesome-icon class="create-team__icon" icon="fa-solid fa-circle-plus" /></span>
        </div>
        <div class="create-team__member-area">
          <ul class="create-team__member-list">
            <li v-for="member in members" :key="member.id" class="create-team__tip">
              {{ member.name }}
              <span class="create-team__delete"><font-awesome-icon class="create-team__delete-icon" icon="fa-solid fa-xmark" @click="deleteMember(member)" /></span>
            </li>
          </ul>
        </div>
        <div class="create-team__button">
          <button type="submit" :class="disabledButton" :disabled="team_name === '' || members.length === 0">作成</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MemberModal from '@/components/Modals/MemberModal'
import $http from '@/services/httpService'
import $blockui from '@/services/blockuiService'
import teamMixin from '@/mixins/teamMixin'

export default {
  mixins: [teamMixin],
  data() {
    return {
      team_name: '',
    }
  },
  computed: {
    members() {
      return this.$store.getters['modals/members']
    },
    disabledButton() {
      return {
        "create-team__disabled" : this.team_name === '' || this.members.length === 0
      }
    }
  },
  methods: {
    /**
     * チーム作成
     */
    async createTeam() {
      $blockui.show()
      const query = {}
      const teamMember = []
      const user = JSON.parse(sessionStorage.getItem('data')).user
      const members = this.members
      members.forEach(member => {
        teamMember.push(member.id)
      })
      query['name'] = this.team_name
      query['user_id'] = user
      query['member'] = teamMember

      await $http.post('/team', query)
      .then(() => {
        this.$store.dispatch('modals/members', [])
        this.$store.dispatch('modals/isModal', false)
        this.getTeams()
      })

    },
    member() {
      this.$store.dispatch('modals/selectModal', MemberModal)
    },
    deleteMember(member) {
      this.$store.dispatch('modals/deleteMember', member)
    },
  }
}
</script>