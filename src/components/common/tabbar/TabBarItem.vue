<template>
  <div class="tab-bar-item" @click="itemClick">
    <div class="icon" v-show="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div class="active-icon" v-show="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div class="i-text" :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "rgb(236, 62, 111)",
    },
  },
  data() {
    return {
      // isActive:true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
}
.active-icon img,
.icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}
.i-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}
</style>