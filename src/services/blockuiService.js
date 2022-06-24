import store from '@/store';

class blockui {
  show() {
    store.dispatch('isLoading', true);
  }

  close() {
    store.dispatch('isLoading', false);
  }
}

export default new blockui();
