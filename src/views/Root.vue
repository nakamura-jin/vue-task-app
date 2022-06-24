<template>
  <div class="root">
    <the-header />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  components: {
    TheHeader,
  }
}
</script>
