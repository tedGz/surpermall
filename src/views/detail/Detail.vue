<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'

export default {
  components:{
    DetailNavBar
  },
  data(){
    return {
      iid: null 
    }
  },
  created() {
    this.iid = this.$route.params.iid
  }
}
</script>

<style>

</style>