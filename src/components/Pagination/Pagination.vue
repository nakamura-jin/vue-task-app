<style lang="scss">
  @import './Pagination';
</style>
<template>
  <paginate
    :page-count="getPageCount"
    :margin-pages="2"
    :click-handler="changePage"
    :prev-text="'＜'"
    :next-text="'＞'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  ></paginate>
</template>

<script>
export default {
  data(){
    return {
      parPage: 10,
      currentPage: 1,
    }
  },
  /************************************************************
   * created
   ************************************************************/
  created() {
    this.setWorkers()
  },

  /************************************************************
   * computed
   ************************************************************/
  computed: {
    workers() {
      return this.$store.getters['workers/workers']
    },
    getPageCount() {
      return Math.ceil(this.workers.length / this.parPage)
    }
  },

  watch: {
    workers(nVal, oVal) {
      if(oVal.length - nVal.length === 1 && nVal.length / (this.currentPage - 1) === 10 ) {
        return this.changePage(this.currentPage - 1)
      }
      this.setWorkers()
    }
  },

  /************************************************************
   * methods
   ************************************************************/
  methods: {
    changePage(number) {
      this.currentPage = number
      this.setWorkers()
    },
    setWorkers() {
      let current = this.currentPage * this.parPage
      let start = current - this.parPage
      return this.$emit('setWorkers', this.workers.slice(start, current));
    }
  }
}
</script>