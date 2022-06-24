<style lang="scss" scoped>
  @import './Blockui.scss';
</style>
<template>
  <div class="loading" v-show="isLoading">
    <div class="loading__container">
      <vue-loading type="spiningDubbles" :size="{ width: '100px', height: '100px' }" color="#ffb71d"></vue-loading>
    </div>
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  components: {
    VueLoading,
  },
  computed: {
    isLoading() {
      return this.$store.getters['isLoading']
    }
  }
}
</script>