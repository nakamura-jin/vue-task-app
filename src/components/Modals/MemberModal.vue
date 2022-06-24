<style lang="scss" scoped>
  @import './MemberModal.scss';
</style>
<template>
  <div class="member">
    <div class="member__container">
      <h3 class="member__title">社員一覧</h3>
      <input class="member__search" type="text" placeholder="社員名" v-model="keyword" />
      <ul class="member__list">
        <li v-for="user in filteredUser" :key="user.id" class="member__name">
          <input type="checkbox" v-model="member" :value="user" class="member__checkbox" />{{ user.name }}
        </li>
      </ul>
      <div class="member__button">
        <button class="member__button-back" @click="back">戻る</button>
        <button class="member__button-decision" @click="decision">確定</button>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService';
import CreateTeamModal from '@/components/Modals/CreateTeamModal.vue';

export default {
  data() {
    return {
      users: [],
      keyword: '',
      member: []
    }
  },
  created() {
    this.getUsers()
  },
  computed: {
    filteredUser() {
      const users = [];
      for(let i in this.users) {
        let user = this.users[i];
        if(user.name.indexOf(this.keyword) !== -1) {
          users.push(user);
        }
      }
      return users;
    }
  },
  methods: {
    async getUsers() {
      const response = await $http.get('users')
      this.users = response.data.users
    },
    back() {
      this.$store.dispatch('modals/selectModal', CreateTeamModal)
    },
    decision() {
      this.$store.dispatch('modals/members', this.member)
      this.$store.dispatch('modals/selectModal', CreateTeamModal)
    }
  }
}
</script>