<style lang="scss" scoped>
  @import './Register.scss';
</style>
<template>
  <div class="register">
    <the-header></the-header>
    <div class="register__container">
      <h3 class="register__ttl">社員登録</h3>
      <form @submit.prevent="register">
        <div class="register__card">
          <label class="register__label">社員ID <span class="register__notes" :style="{ display: `${ mobile ? 'block': 'inline' }`}">※チェックが入っている場合、自動追加になります</span></label>
          <div class="register__worker-number">
            <input id="checkNumber" type="checkbox" checked v-model="check"><label for="checkNumber" class="checkbox_label"></label>
            <input type="text" class="register__input" v-model="form.worker_number">
          </div>
          <label class="register__label">氏名</label>
          <input type="text" class="register__input" v-model="form.name" />
          <label class="register__label">パスワード</label>
          <input type="password" class="register__input" v-model="form.password" />
          <label class="register__label">パスワード確認</label>
          <input type="password" class="register__input" v-model="password_confirm" @keyup="pwd"/>
          <span class="register__password-confirm" v-if="!match">パスワードが一致しません</span>
          <div class="register__role">
            <input id="radio_2" type="radio" value="2" v-model="form.role_id"><label for="radio_2" class="radio_label"></label><span>権限なし</span>
            <input id="radio_1" type="radio" value="1" v-model="form.role_id"><label for="radio_1" class="radio_label"></label><span>権限あり</span>
          </div>
          <div class="register__button">
            <button type="submit" :disabled="disabledRegister" :style="{ background: `${ disabledRegister ? '#ccc' : '' }` }">登録</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import $blockui from '@/services/blockuiService'
import TheHeader from '@/components/TheHeader'
import $http from '@/services/httpService'
import get from 'lodash/get'

export default {
  components: { TheHeader },
  data() {
    return {
      form: {
        worker_number: null,
        name: '',
        password: '',
        role_id: 2
      },
      password_confirm: '',
      check: 1,
      match: true,
      mobile: false
    }
  },
  created() {
    this.getUser()
    if(window.visualViewport.width <= 501) this.mobile = true
  },
  computed: {
    disabledRegister() {
      const set = this.form.worker_number === null || this.form.name === '' || this.form.password === '' || this.password_confirm === '';
      if(set) return true
      else if(this.password_confirm !== '' && this.match === false) return true
      return false
    }
  },
  watch: {
    check(nVal) {
      if(nVal) this.form.worker_number = JSON.parse(sessionStorage.getItem('new_number'))
      else this.form.worker_number = null
    },
  },
  methods: {
    async getUser() {
      const response = await $http.get('/users')
      const users = get(response.data, 'users', [])
      this.form.worker_number = Number(users.slice(-1)[0].worker_number) + 1
      sessionStorage.setItem('new_number', Number(users.slice(-1)[0].worker_number) + 1)
    },
    async register() {
      $blockui.show()
      const response = await $http.post('/register', this.form)
      if(response) {
        sessionStorage.removeItem('new_number')
        this.$store.dispatch('flash_message', true)
        this.$router.push('/top')
        $blockui.close()
      }
    },
    pwd() {
      if(this.form.password !== '' && this.form.password !== this.password_confirm) this.match = false
      else this.match = true
    }
  }
}
</script>