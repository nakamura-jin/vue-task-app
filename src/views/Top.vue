<style lang="scss" scoped>
  @import '@/styles/top.scss';
</style>
<template>
  <div class="top">
    <template v-if="$store.getters['flash_message']">
      <p class="top__flash-message"><font-awesome-icon class="top__message-icon" icon="fa-solid fa-check" /> 社員登録が完了しました</p>
    </template>
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
          @mouseleave="menu = false"
          :style="{ background: `${ !mobileWidth && menu && hoverIndex === index  ? '#eee' : ''}` }"
        >
          <font-awesome-icon v-if="!mobileWidth && menu && hoverIndex === index" @click="openList(index)" @click.stop class="top__dot" icon="fa-solid fa-ellipsis" />
          <font-awesome-icon v-else-if="mobileWidth" @click="openMobileList(team)" @click.stop class="top__dot" icon="fa-solid fa-ellipsis" />
          <template v-if="!mobileWidth && list && listIndex === index">
            <div class="top__menu-list" v-click-outside="closeList">
              <ul>
                <li class="top__list" @click="editTeam(team)">グループ編集</li>
                <li class="top__list" @click="deleteTeam(team.id)">削除</li>
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
          @mouseleave="menu = false"
          :style="{ background: `${ !mobileWidth && menu && hoverIndex === index  ? '#eee' : ''}` }"
        >
          <font-awesome-icon v-if="!mobileWidth && menu && hoverIndex === index" @click="openList(index)" @click.stop class="top__dot" icon="fa-solid fa-ellipsis" />
          <font-awesome-icon v-else-if="mobileWidth" @click="openMobileList(team)" @click.stop class="top__dot" icon="fa-solid fa-ellipsis" />
          <template v-if="!mobileWidth && list && listIndex === index">
            <div class="top__menu-list" v-click-outside="closeList">
              <ul>
                <li class="top__list" @click="editTeam(team)">グループ編集</li>
                <li class="top__list" @click="deleteTeam(team.id)">削除</li>
              </ul>
            </div>
          </template>
          <p>{{ team.name }}</p>
          <span class="top__leader">担当: {{ team.user_name }}</span>
        </div>
      </template>

      <!-- モバイル時のドットクリックで開くメニュー -->
      <template v-if="mobileWidth">
        <div class="mobile-menu" :class="{ 'list-open' : mobileList }" @click="mobileList = false">
          <div class="mobile-menu__container">
            <ul>
              <li class="mobile-menu__list" @click="editTeam(team)">
                <font-awesome-icon class="mobile-menu__icon" icon="fa-solid fa-pen" />
                <span>グループ編集</span>
              </li>
              <li class="mobile-menu__list" @click="deleteTeam(team.id)">
                <font-awesome-icon class="mobile-menu__icon" icon="fa-solid fa-trash-can" />
                <span>削除</span>
              </li>
              <li class="mobile-menu__list" @click="mobileList = false">
                <font-awesome-icon class="mobile-menu__icon" icon="fa-solid fa-xmark" />
                <span>キャンセル</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CreateTeamModal from '@/components/Modals/CreateTeamModal.vue'
import teamMixin from '@/mixins/teamMixin'
import $blockui from '@/services/blockuiService'
import EditTeamModal from '@/components/Modals/EditTeamModal.vue'
import ConfirmModal from '@/components/Modals/ConfirmModal.vue'
import Store from '@/store'
import ClickOutside from 'vue-click-outside'

export default {
  mixins: [ teamMixin ],
  directives: { ClickOutside },
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
      mobileList: false,
      team: {}
    }
  },
  /************************************************************
   * created
   ************************************************************/
  created() {
    this.getTeams();
  },

  /************************************************************
   * computed
   ************************************************************/
  computed: {
    role() {
      return JSON.parse(sessionStorage.getItem('data')).role
    }
  },

  /************************************************************
   * methods
   ************************************************************/
  methods: {
    createTeam() {
      this.$store.dispatch('modals/crud', 'create')
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', CreateTeamModal)
    },
    selectTeam(id) {
      if(this.list === true) return this.closeList()
      $blockui.show();
      this.$router.push({path: '/task/' + id, params: {id: id}})
    },

    onMouse(index) {
      this.menu = true
      this.hoverIndex = index
    },

    openList(index) {
      this.list = true
      this.listIndex = index
    },

    openMobileList(team) {
      this.mobileList = true
      this.team = team
    },

    closeList() {
      this.list = false
      this.listIndex = null
    },

    editTeam(team) {
      this.$store.dispatch("teams/setTaskTeam", team)
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', EditTeamModal)
    },

    deleteTeam(id) {
      this.$store.dispatch('teams/delete_team_id', id)
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', ConfirmModal)
    }
  },
}
</script>
