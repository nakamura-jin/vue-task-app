<template>
  <div class="root">
    <the-header />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <modal />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import Modal from '@/components/Modals/Modal.vue'

export default {
  components: {
    TheHeader,
    Modal,
  }
}
</script>
