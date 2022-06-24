<style lang="scss" scoped>
  @import './EditTeamModal.scss';
</style>
<template>
  <div class="edit-team">
    <div class="edit-team__name">
      <label class="edit-team__name-label">グループ名</label>
      <input class="edit-team__name-input" type="text" v-model="name">
    </div>
    <div class="edit-team__member">
      <label class="edit-team__member-label">メンバー</label>
      <span @click="addMember"><font-awesome-icon class="edit-team__icon" icon="fa-solid fa-circle-plus" /></span>
      <div class="edit-team__member-area">
        <ul class="edit-team__member-list">
          <li class="edit-team__member-tip" v-for="member in members" :key="member.id">
            {{ member.name }}
            <span class="edit-team__delete"><font-awesome-icon icon="fa-solid fa-xmark" @click="deleteMember(member)" /></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="edit-team__button">
      <button class="edit-team__cancel" @click="cancel">キャンセル</button>
      <button class="edit-team__update"
        @click="updateTeam" :disabled="name === '' || members.length === 0"
        :class="disabledButton"
      >編集</button>
    </div>
  </div>
</template>

<script>
import $blockui from '@/services/blockuiService'
import $http from '@/services/httpService'
import MemberModal from '@/components/Modals/MemberModal'

export default {
  data() {
    return {
      name: this.$store.getters['teams/task_team'].name,
    }
  },
  /******************************************************
   * computed
   ******************************************************/
  computed: {
    members() {
      return this.$store.getters['teams/task_team'].users
    },
    disabledButton() {
      return {
        "edit-team__disabled" : this.name === '' || this.members.length === 0
      }
    }
  },
  watch: {
    name() {
      this.$store.dispatch('modals/onEdit', true)
    },
    members() {
      this.$store.dispatch('modals/onEdit', true)
    }
  },

  /******************************************************
   * methods
   ******************************************************/
  methods: {
    deleteMember(member) {
      this.$store.dispatch('teams/deleteMember', member)
    },

    cancel() {
      const edit = this.$store.getters['modals/edit'];
      if(!edit) return this.$store.dispatch('modals/isModal', false)

      if(confirm('編集が完了しておりません。閉じてもよろしいでしょうか？')) {
        $blockui.show()
        this.$store.dispatch('modals/isModal', false)
        const id = Number(this.$route.params.team_id)
        this.$router.go({path: `/task/${id}`, force: true})
        .then(() => {
          $blockui.close()
        })
      }
    },

    addMember() {
      this.$store.dispatch('modals/crud', 'edit')
      this.$store.dispatch('modals/selectModal', MemberModal)
    },

    async updateTeam() {
      $blockui.show()
      const team = this.$store.getters['teams/task_team'];
      const query = {};
      query['name'] = this.name
      query['user_id'] = team.user_id
      query['team_id'] = team.id
      const member = []
      team.users.forEach(user => {
        member.push(user.id)
      })
      query['member'] = member
      await $http.put(`/team/${team.id}`, query)
      .then(() => {
        this.$store.dispatch('modals/isModal', false)
        $blockui.close()
      })
    }
  }
}
</script>