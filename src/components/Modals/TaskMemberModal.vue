<style lang="scss" scoped>
  @import './TaskMemberModal.scss';
</style>
<template>
  <div class="task-member">
    <h3 class="task-member__ttl">メンバー一覧</h3>
    <div class="task-member-list">
      <ul>
        <button class="task-member__select" v-for="member in members.users" :key="member.id" @click="select(member)">
          <li class="task-member__name">{{ member.name }}</li>
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
import CreateTaskModal from '@/components/Modals/CreateTaskModal'

export default {
  computed: {
    members() {
      return this.$store.getters['teams/task_team']
    }
  },
  methods: {
    select(member) {
        this.$store.dispatch('teams/taskUser', member)
        this.$store.dispatch('modals/selectModal', CreateTaskModal)
    }
  }
}
</script>