<style lang="scss" scoped>
  @import './WorkerList.scss';
</style>
<template>
  <div class="worker-list">
    <the-sidebar v-if="!mobile"></the-sidebar>
    <div class="worker-list__container">
      <h3 class="worker-list__title">社員一覧</h3>
      <div class="worker-list__mobile-register">
        <button v-if="mobile" @click="$router.push('/register')">社員登録</button>
      </div>
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
          <tr v-for="worker in setWorkers" :key="worker.id">
            <td class="worker-list__number">{{ worker.worker_number }}</td>
            <td class="worker-list__name">{{ worker.name }}</td>
            <td class="worker-list__role"><span v-if="worker.role_id === 1">あり</span><span v-if="worker.role_id === 2">なし</span></td>
            <td class="worker-list__edit" @click="editWorker(worker)"><font-awesome-icon icon="fa-solid fa-pen" /></td>
            <td class="worker-list__delete" @click="deleteWorker(worker.id)"><font-awesome-icon icon="fa-solid fa-trash-can" /></td>
          </tr>
        </tbody>
      </table>
      <pagination
        @setWorkers="getWorkers"
        @changePage="changePage"
      ></pagination>
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import $http from '@/services/httpService'
import Pagination from '@/components/Pagination/Pagination.vue'
import Store from '@/store'
import WorkerEditModal from '@/components/Modals/WorkerEditModal.vue'
import ConfirmModal from '@/components/Modals/ConfirmModal.vue'

export default {
  components: {
    TheSidebar,
    Pagination
  },

  async beforeRouteEnter(to, from, next) {
    const response = await $http.get('/users')
    Store.dispatch('workers/workers', response.data.users)
    next()
  },

  data() {
    return {
      setWorkers: []
    }
  },

  /************************************************************
   * computed
   ************************************************************/
  computed: {
    mobile() {
      if (window.visualViewport.width <= 961) return true;
      return false;
    },
    workers() {
      return this.$store.getters['workers/workers']
    }
  },

  /************************************************************
   * methods
   ************************************************************/
  methods: {
    changePage(number) {
      this.currentPage = number
    },
    getWorkers(list) {
      this.setWorkers = list
    },
    editWorker(worker) {
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', WorkerEditModal)
      this.$store.dispatch('workers/edit_worker', worker)
    },
    deleteWorker(id) {
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', ConfirmModal)
      this.$store.dispatch('workers/delete_worker_id', id)
    }
  }
}
</script>
