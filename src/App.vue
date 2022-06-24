<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <blockui />
  </div>
</template>

<script>
import Blockui from '@/components/Blockui/Blockui.vue'
export default {
  components: {
    Blockui
  }
}
</script>

<style lang="scss">
  @import '@/styles/global.scss';
  @import '@/assets/reset.scss';
</style>
