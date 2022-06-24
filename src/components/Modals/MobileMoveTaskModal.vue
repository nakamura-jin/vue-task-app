<style lang="scss" scoped>
  @import './MobileMoveTaskModal.scss';
</style>
<template>
  <div class="edit-task">
    <div class="edit-task__container">
      <ul class="edit-task__item">
        <li class="edit-task__list" v-if="task.item_id !== 1" @click="moveTask(task, 1)">作業前へ移動</li>
        <li class="edit-task__list" v-if="task.item_id !== 2" @click="moveTask(task, 2)">実行中へ移動</li>
        <li class="edit-task__list" v-if="task.item_id !== 3" @click="moveTask(task, 3)">確認中へ移動</li>
        <li class="edit-task__list" v-if="task.item_id !== 4" @click="moveTask(task, 4)">完了へ移動</li>
        <li class="edit-task__list" @click="deleteTask(task.id)">タスクを削除</li>
      </ul>
    </div>
  </div>
</template>

<script>
import taskMixin from '@/mixins/taskMixin'
import $blockui from '@/services/blockuiService'
import $http from '@/services/httpService'
import ConfirmModal from '@/components/Modals/ConfirmModal'

export default {
  mixins: [ taskMixin ],
  /************************************************************
   * computed
   ************************************************************/
  computed: {
    task() {
      return this.$store.getters['tasks/mobile_edit_task']
    }
  },
  /************************************************************
   * methods
   ************************************************************/
  methods: {
    /**
     * タスクの移動
     */
    async moveTask(task, id) {
      $blockui.show()
      const query = task
      query['item_id'] = id
      await $http.put(`/task/${query["id"]}`, query);
      this.$store.dispatch('modals/isModal', false)
      $blockui.close()
    },

    /**
     * タスクの削除
     */
    deleteTask(id) {
      this.$store.dispatch('modals/selectModal', ConfirmModal)
      this.$store.dispatch('tasks/delete_task_id', id)
    }
  }
}
</script>