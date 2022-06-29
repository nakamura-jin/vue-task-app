<style lang="scss" scoped>
  @import '@/styles/header.scss';
</style>
<template>
  <div class="header">
    <div class="header__container">
      <div @click="goTop" class="header__logo">
        <img src="@/assets/img/logo_navy.png" alt="">
        <h2 class="header__site-title">Task app</h2>
      </div>
      <div class="header__account">
        <div class="header__logout">
          <span v-if=" !mobile && role === 1" @click="nav = !nav" v-click-outside="closeList" class="header__icon"><font-awesome-icon icon="fa-solid fa-user" /></span>
          <button v-else-if=" !mobile && role === 2" class="header__logout-button" @click="logout">ログアウト</button>
          <!-- スマホのメニューボタンとメニューリスト -->
          <div v-else class="menu__button" @click="toggle = !toggle">
            <div class="menu__top" :class="{ 'open-top': toggle }"></div>
            <div class="menu__middle" :class="{ 'open-middle': toggle }"></div>
            <div class="menu__bottom" :class="{ 'open-bottom': toggle }"></div>
          </div>
          <template v-if="mobile">
            <div class="menu__nav" :class="{'open': toggle}">
              <div class="menu__out" @click="closeMobileMenu"></div>
              <ul class="menu__list">
                <li class="menu__list-item" @click="$router.push('worker_list'), toggle = false">社員一覧</li>
                <li class="menu__list-item" @click="createTask" v-if="taskPage">タスクの作成</li>
                <li class="menu__list-item" @click="goTop">トップに戻る</li>
                <li class="menu__list-item" @click="logout">ログアウト</li>
              </ul>
            </div>
          </template>
        </div>

        <div class="header__nav" v-if="nav">
          <ul>
            <li class="header__list" @click="$router.push('worker_list'), toggle = false">社員一覧</li>
            <li class="header__list" @click="goTop">トップに戻る</li>
            <li class="header__list" @click="logout">ログアウト</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $auth from '@/services/authService'
import ClickOutside from 'vue-click-outside'
import $blockui from '@/services/blockuiService'
import CreateTaskModal from '@/components/Modals/CreateTaskModal.vue'

export default {
  name: 'Header',
  directives: {
    ClickOutside
  },
  data() {
    return {
      nav: false,
      toggle: false
    }
  },
  computed: {
    role() {
      return JSON.parse(sessionStorage.getItem('data')).role
    },
    mobile() {
      if(window.visualViewport.width <= 961) return true
      return false
    },
    taskPage() {
      if(this.$route.path === `/task/${this.$route.params.team_id}`) return true
      return false
    }
  },
  methods: {
    logout() {
      $auth.logout()
      if(this.toggle === true) this.toggle = false
      this.$router.push('/login')
    },
    closeList() {
      this.nav = false
    },
    closeMobileMenu() {
      this.toggle = false
    },
    register() {
      $blockui.show()
      if(this.toggle === true) this.toggle = false
      this.$router.push('/register')
      $blockui.close()
    },
    createTask() {
      this.toggle = false
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', CreateTaskModal)
    },
    goTop() {
      if(this.$route.path === '/register') sessionStorage.removeItem('new_number')
      if(this.toggle === true) this.toggle = false
      this.$router.push('/top')
    }
  }
}
</script>