<style lang="scss" scoped>
  @import './ConfirmModal.scss';
</style>
<template>
  <div class="confirm">
    <div class="confirm__container">
      <p class="confirm__text">{{ item }}を削除しますか？</p>
      <div class="confirm__button">
        <button class="confirm__back" @click="back">戻る</button>
        <button class="confirm__delete" @click="deleteTask">削除</button>
      </div>
    </div>
  </div>
</template>

<script>
import $blockui from '@/services/blockuiService'
import $http from '@/services/httpService'

export default {
  computed: {
    item() {
      if(this.$route.path === '/top') return 'グループ'
      else if(this.$route.path === '/worker_list') return '社員'
      return 'タスク'
    }
  },
  methods: {
    back() {
      this.$store.dispatch('modals/isModal', false)
    },

    async deleteTask() {
      $blockui.show();

      if(this.$route.path === '/top') {
        const id = this.$store.getters['teams/delete_team_id']
        $http.delete(`/team/${id}`).then(() => {
          this.$store.dispatch('teams/delete_team', id)
          this.$store.dispatch('teams/delete_team_id', null)
          this.$store.dispatch('modals/isModal', false)
          $blockui.close()
        })
      } else if(this.$route.path === '/worker_list') {
        const id = this.$store.getters['workers/delete_worker_id']
        await $http.delete(`user/${id}`)
        this.$store.dispatch('workers/delete_worker')
        this.$store.dispatch('modals/isModal', false)
        $blockui.close()
      } else {
        const id = this.$store.getters['tasks/delete_task_id']
        $http.delete(`/task/${id}`).then(() => {
          this.$store.dispatch('teams/delete_task', id)
          this.$store.dispatch('modals/isModal', false)
          $blockui.close()
        })
      }
    }
  }
}
</script>