<style lang="scss" scoped>
  @import './CreateTaskModal.scss';
</style>
<template>
  <div class="create-task">
    <div class="create-task__container">
      <form @submit.prevent="createTask">
        <div class="create-task__number">
          No.{{ taskNumber }}
        </div>
        <div class="create-task__name">
          <label>タスク名</label>
          <input type="text" v-model="title">
        </div>
        <div class="create-task__contents">
          <label>本文</label>
          <textarea v-model="contents"></textarea>
        </div>
        <div class="create-task__user">
          <label>担当</label>
          <span @click="member"><font-awesome-icon class="create-task__icon" icon="fa-solid fa-circle-plus" /></span>
          <div class="create-task__card">
            <div class="create-task__tip" v-if="selectMember">{{ selectMember.name }}<font-awesome-icon class="create-task__delete-tip" icon="fa-solid fa-xmark" @click="deleteTip" /></div>
          </div>
        </div>
        <div class="create-task__button">
          <button type="submit"
            :disabled="title === '' || contents === '' || selectMember === null"
            :class="disabledButton"
            >作成</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TaskMemberModal from '@/components/Modals/TaskMemberModal.vue'
import $blockui from '@/services/blockuiService'
import $http from '@/services/httpService'
import taskMixin from '@/mixins/taskMixin'

export default {
  mixins: [ taskMixin ],
  data() {
    return {
      title: '',
      contents: ''
    }
  },
  computed: {
    selectMember() {
      const task_user = this.$store.getters['teams/task_user']
      const create = this.$store.getters['modals/create']
      if(task_user !== null) {
        this.$store.dispatch('modals/onCreate', true)
      } else {
        if(create) this.$store.dispatch('modals/onCreate', false)
      }
      return task_user
    },
    taskNumber() {
      const task = this.$store.getters['teams/task_team']
      if(task.task_count) return task.task_count + 1
      return 1
    },
    disabledButton() {
      return {
        "create-task__disabled" : this.title === '' || this.contents === '' || this.selectMember === null
      }
    },
  },

  methods: {
    member() {
      this.$store.dispatch('modals/selectModal', TaskMemberModal)
    },
    deleteTip() {
      this.$store.dispatch('teams/taskUser', null)
    },
    async createTask() {
      $blockui.show();

      const query = {};
      query['title'] = this.title,
      query['contents'] = this.contents,
      query['team_id'] = this.$store.getters['teams/task_team'].id,
      query['user_id'] = this.$store.getters['teams/task_user'].id,
      query['item_id'] = 1
      query['task_count'] = this.taskNumber

      await $http.post('task', query)
      .then(() => {
        this.$store.dispatch('teams/taskUser', null)
        this.$store.dispatch('modals/isModal', false)
        this.getTeam()
        $blockui.close()
      })
    }
  }
}
</script>