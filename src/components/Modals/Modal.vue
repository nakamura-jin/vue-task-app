<style lang="scss" scoped>
  @import '@/styles/modal.scss';
</style>
<template>
  <div class="modal" v-if="modal" @click="close">
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
      this.$store.dispatch('modals/isModal', false)
    }
  }
}
</script>