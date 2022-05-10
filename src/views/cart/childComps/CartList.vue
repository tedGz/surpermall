<template>
  <div class="cart-list">
    <scroll class="content">
      <div>
        <cart-list-item
          v-for="(item, index) in cartList"
          :key="index"
          :product="item"
          >{{ item }}</cart-list-item
        >
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";

export default {
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["getLength", "cartList"]),
  },
};
</script>

<style scoped>
.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>