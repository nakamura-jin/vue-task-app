import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCirclePlus,
  faXmark,
  faTrashCan,
  faCheck,
  faEllipsis,
  faUser,
  faHouse,
  faRightFromBracket,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCirclePlus,
  faXmark,
  faTrashCan,
  faCheck,
  faEllipsis,
  faUser,
  faHouse,
  faRightFromBracket,
  faChevronDown
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
