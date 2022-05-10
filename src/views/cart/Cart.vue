<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{getLength}})</template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters([
      'getLength'
    ])
  }
}
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
  }
</style>