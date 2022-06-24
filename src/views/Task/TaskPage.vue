<style lang="scss" scoped>
  @import './TaskPage.scss';
</style>
<template>
  <div class="task">
    <div class="task__container">
      <the-sidebar v-if="!mobile"/>
      <div class="task__main">
        <div class="task__team-name">{{ team.name }}</div>
        <div class="task__item-wrapper">

          <div class="task__item-column">
            <div class="task__item-title" @click="toggleCulomn('beforeWork')">
              <span>作業前 {{ beforeWork.length }} 件</span>
              <span v-if="mobile" :class="{ 'open' : columnToggle && card_progress === 'beforeWork' }">
                <font-awesome-icon icon="fa-solid fa-chevron-down" />
              </span>
            </div>
            <div class="task__before-work">
              <draggable group="ITEMS" :animation="200" @end="onEnd" handle=".task__card">
                <div
                  v-for="(task, index) in beforeWork" :key="task.id"
                  :class=" mobile ? 'task__card-mobile' : 'task__card' "
                  :style="{
                    background: `${ !mobile && icon && hoverIndex === index && progress === 'beforeWork' ? '#EEE' : '' }`,
                    display: `${ mobile && columnToggle && card_progress === 'beforeWork' || !mobile ? 'block' : 'none' }`,
                    transition: `${ columnToggle ? '0.1s' : '0.1s' }`,
                  }"
                  @click="select(task.id)"
                  @mouseover="onMouse(index, 'beforeWork')"
                  @mouseleave="[ icon = false, hoverIndex = null, progress = '' ]"
                >
                  <span class="task__number">No.{{ task.task_count }}</span>
                  <button class="task__delete" v-if="!mobile && icon && hoverIndex === index && progress === 'beforeWork'" @click.stop @click="openConfirmModal(task.id)">
                    <font-awesome-icon class="task__icon" icon="fa-solid fa-trash-can"/>
                  </button>
                  <button class="task__delete" v-else-if="mobile" @click.stop>
                    <font-awesome-icon class="task__icon-mobile" icon="fa-solid fa-ellipsis" />
                  </button>
                  <p class="task__title">{{ task.title }}</p>
                  <span class="task__user-name">{{ task.user_name }}</span>
                </div>
              </draggable>
            </div>
          </div>

          <div class="task__item-column">
            <div class="task__item-title" @click="toggleCulomn('in-process')">
              <span>実行中 {{ inProcess.length }} 件</span>
              <span v-if="mobile" :class="{ 'open' : columnToggle && card_progress === 'in-process' }">
                <font-awesome-icon icon="fa-solid fa-chevron-down" />
              </span>
            </div>
            <div class="task__in-process">
              <draggable group="ITEMS" :animation="200" @end="onEnd" handle=".task__card">
                <div
                  v-for="(task, index) in inProcess" :key="task.id"
                  :class=" mobile ? 'task__card-mobile' : 'task__card' "
                  :style="{
                    background: `${ !mobile && icon && hoverIndex === index && progress === 'inProcess' ? '#EEE' : '' }`,
                    display: `${ mobile && columnToggle && card_progress === 'in-process' || !mobile ? 'block' : 'none' }`,
                    transition: `${ columnToggle ? '0.1s' : '0.1s' }`,
                  }"
                  @click="select(task.id)"
                  @mouseover="onMouse(index, 'inProcess')"
                  @mouseleave="[ icon = false, hoverIndex = null, progress = '' ]"
                >
                  <span class="task__number">No.{{ task.task_count }}</span>
                  <button class="task__delete" v-if="!mobile && icon && hoverIndex === index && progress === 'inProcess'" @click.stop  @click="openConfirmModal(task.id)">
                    <font-awesome-icon class="task__icon" icon="fa-solid fa-trash-can" />
                  </button>
                  <button class="task__delete" v-else-if="mobile" @click.stop>
                    <font-awesome-icon class="task__icon-mobile" icon="fa-solid fa-ellipsis" />
                  </button>
                  <p class="task__title">{{ task.title }}</p>
                  <span class="task__user-name">{{ task.user_name }}</span>
                </div>
              </draggable>
            </div>
          </div>

          <div class="task__item-column">
            <div class="task__item-title" @click="toggleCulomn('in-confirmation')">
              <span>確認中 {{ inConfirmation.length }} 件</span>
              <span v-if="mobile" :class="{ 'open' : columnToggle && card_progress === 'in-confirmation' }">
                <font-awesome-icon icon="fa-solid fa-chevron-down" />
              </span>
            </div>
            <div class="task__in-confirmation">
              <draggable group="ITEMS" :animation="200" @end="onEnd" handle=".task__card">
                <div
                  v-for="(task, index) in inConfirmation" :key="task.id"
                  :class=" mobile ? 'task__card-mobile' : 'task__card' "
                  :style="{
                    background: `${ !mobile && icon && hoverIndex === index && progress === 'inConfirmation' ? '#EEE' : '' }`,
                    display: `${ mobile && columnToggle && card_progress === 'in-confirmation' || !mobile ? 'block' : 'none' }`,
                    transition: `${ columnToggle ? '0.1s' : '0.1s' }`,
                  }"
                  @click="select(task.id)"
                  @mouseover="onMouse(index, 'inConfirmation')"
                  @mouseleave="[ icon = false, hoverIndex = null, progress = '' ]"
                >
                  <span class="task__number">No.{{ task.task_count }}</span>
                  <button class="task__delete" v-if="!mobile && icon && hoverIndex === index && progress === 'inConfirmation'" @click.stop  @click="openConfirmModal(task.id)">
                    <font-awesome-icon class="task__icon" icon="fa-solid fa-trash-can" />
                  </button>
                  <button class="task__delete" v-else-if="mobile" @click.stop>
                    <font-awesome-icon class="task__icon-mobile" icon="fa-solid fa-ellipsis" />
                  </button>
                  <p class="task__title">{{ task.title }}</p>
                  <span class="task__user-name">{{ task.user_name }}</span>
                </div>
              </draggable>
            </div>
          </div>

          <div class="task__item-column">
            <div class="task__item-title" @click="toggleCulomn('completaion')">
              <span>完了 {{ completion.length }} 件</span>
              <span v-if="mobile" :class="{ 'open' : columnToggle && card_progress === 'completaion' }">
                <font-awesome-icon icon="fa-solid fa-chevron-down" />
              </span>
            </div>
            <div class="task__completion">
              <draggable group="ITEMS" :animation="200" @end="onEnd" handle=".task__card">
                <div
                  v-for="(task, index) in completion" :key="task.id"
                  :class=" mobile ? 'task__card-mobile' : 'task__card' "
                  :style="{
                    background: `${ !mobile && icon && hoverIndex === index && progress === 'completaion' ? '#EEE' : '' }`,
                    display: `${ mobile && columnToggle && card_progress === 'completaion' || !mobile ? 'block' : 'none' }`,
                    transition: `${ columnToggle ? '0.1s' : '0.1s' }`,
                  }"
                  @click="select(task.id)"
                  @mouseover="onMouse(index, 'completaion')"
                  @mouseleave="[ icon = false, hoverIndex = null, progress = '' ]"
                >
                  <span class="task__number">No.{{ task.task_count }}</span>
                  <button class="task__done" v-if="!mobile" @click.stop :style="{ background: `${ icon && hoverIndex === index && progress === 'completaion' ? '#EEE' : '' }` }" >
                    <font-awesome-icon class="task__done-icon" icon="fa-solid fa-check" @click.stop @click="openConfirmModal(task.id)" />
                  </button>
                  <button class="task__done" v-else @click.stop>
                    <font-awesome-icon class="task__done-icon" icon="fa-solid fa-check" />
                  </button>
                  <p class="task__title">{{ task.title }}</p>
                  <span class="task__user-name">{{ task.user_name }}</span>
                </div>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue'
import $blockui from '@/services/blockuiService'
import taskMixin from '@/mixins/taskMixin'
import draggable from 'vuedraggable'
import $http from '@/services/httpService'
import TaskDetailModal from '@/components/Modals/TaskDetailModal'
import ConfirmModal from '@/components/Modals/ConfirmModal'

export default {
  mixins: [ taskMixin ],
  components: {
    TheSidebar,
    draggable,
  },

  data() {
    return {
      confirm: false,
      icon: false,
      hoverIndex: null,
      progress: '',
      columnToggle: false,
      card_progress: ''
    }
  },

  /************************************************************
   * created
   ************************************************************/
  created() {
    this.getTeam()
  },

  /************************************************************
   * computed
   ************************************************************/
  computed: {
    mobile() {
      if(window.visualViewport.width <= 501) return true
      return false
    }
  },
  /************************************************************
   * mounted
   ************************************************************/
  mounted() {
    $blockui.close()
  },

  /************************************************************
   * methods
   ************************************************************/
  methods: {
    /**
     * タスクを移動した際に、どこに移動したのかをチェック
     */
    onEnd(event) {
      const query = {};
      query["id"] = Number(event.clone.children[0].innerHTML.slice(3));
      const path = event.originalEvent.path;
      for (let i = 0; i < path.length; i++) {
        if (path[i]._prevClass === "task__before-work") {
          query["item_id"] = 1;
        }
        if (path[i]._prevClass === "task__in-process") {
          query["item_id"] = 2;
        }
        if (path[i]._prevClass === "task__in-confirmation") {
          query["item_id"] = 3;
        }
        if (path[i]._prevClass === "task__completion") {
          query["item_id"] = 4;
        }
      }
      this.editTask(query);
    },

    /**
     * 移動したタスクを、バックエンドへ更新処理
     */
    async editTask(data) {
      const query = {};
      this.team.tasks.forEach((task) => {
        if (task.task_count === data.id) {
          query["id"] = task.id;
          query["title"] = task.title;
          query["contents"] = task.contents;
          query["user_id"] = task.user_id;
          query["team_id"] = task.team_id;
          query["item_id"] = data.item_id;
          query["task_count"] = task.task_count;
        }
      });
      await $http.put(`/task/${query["id"]}`, query);
      this.getTeam()
    },

    /**
     * タスク詳細を開く
     */
    select(id) {
      const selectTask = this.team.tasks;
      selectTask.forEach((task) => {
        if (task.id === id) {
          this.$store.dispatch("tasks/selectTask", task);
          this.$store.dispatch("modals/isModal", true);
          this.$store.dispatch("modals/selectModal", TaskDetailModal);
        }
      });
    },

    /**
     * タスクの削除
     */
    openConfirmModal(id) {
      this.$store.dispatch('modals/isModal', true)
      this.$store.dispatch('modals/selectModal', ConfirmModal)
      this.$store.dispatch('tasks/delete_task_id', id)
    },

    /**
     * タスクにホバーしたときにicon表示
     */
    onMouse(index, progress) {
      this.icon = true;
      this.hoverIndex = index
      this.progress = progress
    },

    /**
     * モバイルの各項目開閉
     */
    toggleCulomn(card_progress) {
      if(this.card_progress !== card_progress) {
        this.card_progress = ''
        this.card_progress = card_progress
      } else {
        this.columnToggle = !this.columnToggle
        this.card_progress = card_progress
      }
    },
  }
}
</script>
