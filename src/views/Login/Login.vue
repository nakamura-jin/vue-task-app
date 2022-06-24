<style lang="scss" scoped>
  @import './Login.scss';
</style>
<template>
  <div class="login">
    <div class="login__container">
      <div class="login__logo">
        <div class="login__image">
          <img src="@/assets/img/logo_white.png" alt="">
        </div>
        <h2 class="login__app-title">Task app</h2>
      </div>
      <h3 class="login__ttl">ログイン</h3>
      <form @submit.prevent="login">
        <div class="login__card">
          <label>社員ID:</label>
          <input type="text" v-model="form.worker_number" />
          <label>パスワード</label>
          <input type="password" v-model="form.password" />
          <div class="login__button">
            <button type="submit" :disabled="disabledLogin" :style="{ background: `${disabledLogin ? '#ccc' : ''}` }">ログイン</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $auth from '@/services/authService'
import $blockui from '@/services/blockuiService'

export default {
  data() {
    return {
      form: {
        worker_number: null,
        password: ''
      }
    }
  },
  computed: {
    disabledLogin() {
      if( this.form.worker_number === null || this.form.worker_number === '' || this.form.password === '' ) return true;
      return false
    }
  },
  destroyed() {
    $blockui.close()
  },
  methods: {
    async login() {
      $blockui.show()
      await $auth.login(this.form)
      this.$router.push('top')
    }
  }
}
</script>