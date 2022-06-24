<style lang="scss" scoped>
  @import '@/styles/sidebar.scss';
</style>
<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <ul class="sidebar__nav">
        <button class="sidebar__list" @click="createTask"><li>タスクの作成</li></button>
        <button class="sidebar__list" @click="editTeam"><li>グループ編集</li></button>
        <button class="sidebar__list" @click="goToTop"><li>トップに戻る</li></button>
      </ul>
    </div>
  </div>
</template>

<script>
import CreateTaskModal from '@/components/Modals/CreateTaskModal.vue'
import EditTeamModal from '@/components/Modals/EditTeamModal.vue'

export default {
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