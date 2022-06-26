<style lang="scss" scoped>
  @import '@/styles/sidebar.scss';
</style>
<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <ul class="sidebar__nav">
        <button class="sidebar__list" @click="createTask" :disabled="disabledClass"><li>タスクの作成</li></button>
        <button class="sidebar__list" @click="editTeam" :disabled="disabledClass"><li>グループ編集</li></button>
        <button class="sidebar__list" @click="$router.push('/register')" v-if="role"><li>社員登録</li></button>
        <button class="sidebar__list" @click="$router.push('/worker_list')" v-if="role"><li>社員一覧</li></button>
        <button class="sidebar__list" @click="goToTop"><li>トップに戻る</li></button>
      </ul>
    </div>
  </div>
</template>

<script>
import CreateTaskModal from '@/components/Modals/CreateTaskModal.vue'
import EditTeamModal from '@/components/Modals/EditTeamModal.vue'

export default {
  computed: {
    role() {
      const role = JSON.parse(sessionStorage.getItem('data')).role
      if(role === 1) return true
      return false
    },
    disabledClass() {
      if(this.$route.path === '/register' || this.$route.path === '/worker_list') return true
      return false
    }
  },
  methods: {
    createTask() {
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', CreateTaskModal)
    },
    editTeam() {
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', EditTeamModal)
    },
    goToTop() {
      this.$store.dispatch('teams/setTaskTeam', [])
      this.$router.push('/top');
    }
  }
}
</script>