<style lang="scss" scoped>
  @import './WorkerList.scss';
</style>
<template>
  <div class="worker-list">
    <the-sidebar></the-sidebar>
    <div class="worker-list__container">
      <h3 class="worker-list__title">社員一覧</h3>
      <table class="worker-list__table">
        <thead>
          <tr>
            <th class="worker-list__number-title">社員番号</th>
            <th class="worker-list__name-title">社員名</th>
            <th class="worker-list__role-title">権限</th>
            <th class="worker-list__edit-title">編集</th>
            <th class="worker-list__edit-title">削除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="worker in workers" :key="worker.id">
            <td class="worker-list__number">{{ worker.worker_number }}</td>
            <td class="worker-list__name">{{ worker.name }}</td>
            <td class="worker-list__role"><span v-if="worker.role_id === 1">あり</span><span v-if="worker.role_id === 2">なし</span></td>
            <td class="worker-list__edit"><font-awesome-icon icon="fa-solid fa-pen" /></td>
            <td class="worker-list__delete"><font-awesome-icon icon="fa-solid fa-trash-can" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import $http from '@/services/httpService'

export default {
  components: {
    TheSidebar
  },
  data(){
    return {
      users: []
    }
  },
  /************************************************************
   * created
   ************************************************************/
  created() {
    this.getWorker()
  },

  /************************************************************
   * computed
   ************************************************************/
  computed: {
    workers() {
      return this.$store.getters['workers/workers']
    }
  },

  /************************************************************
   * methods
   ************************************************************/
  methods: {
    async getWorker() {
      const response = await $http.get('/users')
      this.$store.dispatch('workers/workers', response.data.users)
    }
  }
}
</script>
