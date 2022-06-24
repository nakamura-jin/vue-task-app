<style lang="scss" scoped>
  @import '@/styles/modal.scss';
</style>
<template>
  <div class="modal"  v-if="modal" @click="close">
    <div class="modal__container">
      <div class="modal__card" @click.stop>
        <div class="modal__close">
          <font-awesome-icon class="modal__close" icon="fa-solid fa-xmark" @click="close" />
        </div>
        <div class="modal__body">
          <keep-alive>
            <component :is="selectModal" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $blockui from '@/services/blockuiService'

export default {
  computed: {
    modal() {
      return this.$store.getters['modals/isModal']
    },
    selectModal() {
      return this.$store.getters['modals/modal']
    }
  },
  methods: {
    close() {
      const edit = this.$store.getters['modals/edit']
      const create = this.$store.getters['modals/create']
      const members = this.$store.getters['modals/members']
      const modal = this.$store.getters['modals/isModal']

      // グループ作成入力中に、モーダルを閉じたらグループ名、メンバーを空白にする
      if(modal && members.length > 0) {
        if(confirm('グループ作成が完了しておりません。閉じてもよろしいでしょうか？'))
        this.$store.dispatch('modals/members', [])
      }

      if(edit || create) {
        if(confirm('編集が完了しておりません。閉じてもよろしいでしょうか？')) {
          $blockui.show()
          this.$store.dispatch('modals/isModal', false)
          const id = Number(this.$route.params.team_id)
          this.$router.go({path: `/task/${id}`, force: true})
          .then(() => {
            $blockui.close()
          })
        }
      }
      else  this.$store.dispatch('modals/isModal', false)
    }
  }
}
</script>