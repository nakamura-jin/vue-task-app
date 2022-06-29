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
  faPen
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
  faChevronDown,
  faPen
);
Vue.component('font-awesome-icon', FontAwesomeIcon);


// vuejs-paginate
import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
