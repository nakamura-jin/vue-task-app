<style lang="scss" scoped>
  @import '@/styles/top.scss';
</style>
<template>
  <div class="top">
    <div class="top__container">
      <div class="top__card" v-if="!mobileWidth" @click="createTeam" @mouseover="createCard = true" @mouseleave="createCard = false" :style="{ background: `${ createCard ? '#ddd' : '' }` }">
        <font-awesome-icon class="top__icon" icon="fa-solid fa-circle-plus" />
        <p>新規作成</p>
      </div>
      <template v-if="role === 1">
        <div class="top__card"
          v-for="(team, index) in teams" :key="index"
          @click="selectTeam(team.id)"
          @mouseover="onMouse(index)"
          @mouseleave="menu = false, list = false"
          :style="{ background: `${ menu && hoverIndex === index  ? '#eee' : ''}` }"
        >
          <font-awesome-icon v-if="menu && hoverIndex === index" class="top__dot" icon="fa-solid fa-ellipsis" />
          <font-awesome-icon v-else-if="mobileWidth" class="top__dot" icon="fa-solid fa-ellipsis" />
          <template v-if="list && listIndex === index">
            <div class="top__menu-list">
              <ul>
                <li class="top__list">グループ編集</li>
                <li class="top__list">削除</li>
              </ul>
            </div>
          </template>
          <p>{{ team.name }}</p>
          <span class="top__leader">担当: {{ team.user_name }}</span>
        </div>
      </template>

      <template v-if="role === 2">
        <div class="top__card"
          v-for="(team, index) in teams" :key="index"
          @click="selectTeam(team.id)"
          @mouseover="onMouse(index)"
          @mouseleave="menu = false, list = false"
          :style="{ background: `${ menu && hoverIndex === index  ? '#eee' : ''}` }"
        >
          <font-awesome-icon v-if="menu && hoverIndex === index" class="top__dot" icon="fa-solid fa-ellipsis" />
          <template v-if="list && listIndex === index">
            <div class="top__menu-list">
              <ul>
                <li class="top__list">グループ編集</li>
                <li class="top__list">削除</li>
              </ul>
            </div>
          </template>
          <p>{{ team.name }}</p>
          <span class="top__leader">担当: {{ team.user_name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import teamMixin from '@/mixins/teamMixin'
import Store from '@/store'
import CreateTeamModal from '@/components/Modals/CreateTeamModal'

export default {
  mixins: [ teamMixin ],
  beforeRouteEnter(to, from, next) {
    if(from.path === '/register') {
      const fm = Store.getters['flash_message']
      if(fm) {
        setTimeout(() => {
          Store.dispatch('flash_message', false)
        }, 3000)
      }
    }
    next()
  },
  data() {
    return {
      createCard: false,
      menu: false,
      hoverIndex: null,
      list: false,
      listIndex: null,
    }
  },
  created() {
    this.getTeams();
  },
  computed: {
    role() {
      return JSON.parse(sessionStorage.getItem('data')).role
    }
  },
  methods: {
    createTeam() {
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', CreateTeamModal)
    },
    selectTeam(id) {
      console.log(id)
    },

    onMouse(index) {
      this.menu = true
      this.hoverIndex = index
    },

    openList(index) {
      this.list = true
      this.listIndex = index
    },
  },
}
</script>
