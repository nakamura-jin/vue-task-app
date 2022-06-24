<style lang="scss" scoped>
  @import './TaskDetailModal.scss';
</style>
<template>
  <div class="task-detail">
    <div class="task-detail__container">
      <p class="task-detail__number">No. {{ task.task_count }}</p>

      <label class="task-detail__title-label">タイトル</label>
      <p class="task-detail__title" @click="classTitle = true" v-if="!classTitle">{{ task.title }}</p>
      <input type="text" class="task-detail__title title-border" v-else v-model="editTitle">

      <label class="task-detail__contents-label">本文</label>
      <p class="task-detail__contents" @click="classContents = true" v-if="!classContents">{{ task.contents }}</p>
      <textarea class="task-detail__contents contents-border" v-else type="text" v-model="editContents"></textarea>

      <label class="task-detail__member-label">担当</label><font-awesome-icon v-if="classMember" @click="select" class="task-detail__icon" icon="fa-solid fa-circle-plus" />
      <p class="task-detail__member" @click="classMember = true" v-if="!classMember">{{ task.user_name }} <font-awesome-icon class="create-task__delete-tip" v-if="task.user_name" icon="fa-solid fa-xmark" @click="deleteTip" /></p>
      <div class="task-detail__member member-border" v-else>
        {{ task.user_name }} <font-awesome-icon class="create-task__delete-tip" v-if="task.user_name" icon="fa-solid fa-xmark" @click="deleteTip" />
      </div>

      <div class="task-detail__button" v-if="classTitle || classContents || classMember">
        <button class="task-detail__cancel" @click="cancel">キャンセル</button>
        <button
          class="task-detail__seve"
          :class="disabledButton"
          @click="save(task)"
          :disabled="editTitle === '' || editContents === '' || task.user_name === ''">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import $blockui from '@/services/blockuiService'
import $http from '@/services/httpService'
import taskMixin from '@/mixins/taskMixin'
import TaskMemberModal from '@/components/Modals/TaskMemberModal'

export default {
  mixins: [ taskMixin ],
  data() {
    return {
      classTitle: false,
      classContents: false,
      classMember: false,
      editTitle: this.$store.getters["tasks/select_task"].title,
      editContents: this.$store.getters["tasks/select_task"].contents,
    };
  },
  computed: {
    task() {
      return this.$store.getters['tasks/select_task']
    },
    disabledButton() {
      return {
        "task-detail__disabled" : this.editTitle === '' || this.editContents === '' || this.task.user_name === ''
      }
    }
  },
  watch: {
    editTitle() {
      this.$store.dispatch('modals/onEdit', true)
    },
    editContents() {
      this.$store.dispatch('modals/onEdit', true)
    },
    classMember() {
      this.$store.dispatch('modals/onEdit', true)
    }
  },
  methods: {
    async save(task) {
      $blockui.show()
      const query = {}
      query['id'] = task.id
      query['title'] = this.editTitle,
      query['contents'] = this.editContents,
      query['user_id'] = task.user_id,
      query['team_id'] = task.team_id,
      query['item_id'] = task.item_id,
      query['task_count'] = task.task_count

      const response = await $http.put(`/task/${task.id}`, query)
      if(response) {
        this.getTeam().then(() => {
          this.$store.dispatch('modals/isModal', false)
          $blockui.close()
        })
      }
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

    select() {
      this.$store.dispatch('tasks/setTaskId', this.task.id)
      this.$store.dispatch('modals/beforeModal', 'TaskDetailModal')
      this.$store.dispatch('modals/selectModal', TaskMemberModal)
    },

    deleteTip() {
      this.$store.dispatch('tasks/deleteMember')
    }
  }
}
</script>