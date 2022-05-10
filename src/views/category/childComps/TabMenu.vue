<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import scroll from "@/components/common/scroll/Scroll";
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    categories: Array,
  },
  components: {
    scroll,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("menuClick", index);
    },
  },
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  width: 100px;
}
.active {
  border-left: 3px solid rgb(219, 20, 76);
  color: rgb(236, 62, 111);
  background-color: #fff;
  font-weight: 700;
}
</style>