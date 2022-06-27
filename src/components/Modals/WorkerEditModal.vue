<style lang="scss" scoped>
  @import './WorkerEditModal';
</style>
<template>
  <div class="worker-edit">
    <div class="worker-edit__container">
      <label class="worker-edit__label">社員番号</label>
      <input class="worker-edit__input" type="text" v-model="worker_number">
      <label class="worker-edit__label">社員名</label>
      <input class="worker-edit__input" type="text" v-model="name">
      <label class="worker-edit__label">権限</label>
      <div class="worker-edit__role">
        <input id="radio_2" type="radio" value="2" v-model="role_id"><label for="radio_2" class="radio_label"></label><span>権限なし</span>
        <input id="radio_1" type="radio" value="1" v-model="role_id"><label for="radio_1" class="radio_label"></label><span>権限あり</span>
      </div>
      <div class="worker-edit__button">
        <button class="worker-edit__cancel" @click="cancel">キャンセル</button>
        <button class="worker-edit__update" @click="editWorker">編集</button>
      </div>
    </div>
  </div>
</template>

<script>
import $blockui from '@/services/blockuiService'
import $http from '@/services/httpService'

export default {
  data() {
    return {
      worker_number: this.$store.getters['workers/edit_worker'].worker_number,
      name: this.$store.getters['workers/edit_worker'].name,
      role_id: this.$store.getters['workers/edit_worker'].role_id
    }
  },
  methods: {
    cancel() {
      this.$store.dispatch('modals/isModal', false);
      this.$store.dispatch('modals/selectModal', '');
      this.$store.dispatch('workers/edit_worker', {})
    },
    async editWorker() {
      $blockui.show()

      const query  = {}
      query['id'] = this.$store.getters['workers/edit_worker'].id
      query['name'] = this.name
      query['worker_number'] = Number(this.worker_number)
      query['role_id'] = Number(this.role_id)

      await $http.put(`/user/${query['id']}`, query)
      this.$store.dispatch('workers/update_worker', query)

      this.cancel()
      $blockui.close()

    }
  }
}
</script>