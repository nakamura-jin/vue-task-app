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
import TaskDetailModal from '@/components/Modals/TaskDetailModal'

export default {
  computed: {
    members() {
      return this.$store.getters['teams/task_team']
    }
  },
  methods: {
    select(member) {
      const modal = this.$store.getters['modals/beforeModal']
      const id = this.$store.getters['tasks/task_id']
      if(modal === 'TaskDetailModal') {
        const tasks = this.$store.getters['teams/task_team'].tasks
        for(let i = 0; i < tasks.length; i++) {
          if(tasks[i].id === id) {
            this.$store.dispatch('modals/onEdit', true)
            this.$store.dispatch('teams/editTaskMember', {id: tasks[i].id, user_id: member.id, user_name: member.name})
            this.$store.dispatch('modals/selectModal', TaskDetailModal)
          }
        }
      } else {
        this.$store.dispatch('teams/taskUser', member)
        this.$store.dispatch('modals/selectModal', CreateTaskModal)
      }
    }
  }
}
</script>