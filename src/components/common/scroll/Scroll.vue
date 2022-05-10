<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      bs: {},
    };
  },
  props: {
    probetype: {
      type: Number,
      default: 1,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    setTimeout(this.__initScroll, 20);
  },
  methods: {
    __initScroll() {
      //1.初始化scroll对象
      if (!this.$refs.wrapper) return;
      this.bs = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probetype,
        pullUpLoad: this.pullUpLoad,
      });
      // 2.监听滚动事件
      this.bs.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
      // 3.监听上拉事件
      this.bs.on("pullingUp", () => {
        console.log("pullingup");
        this.$emit("pullingUp");
      });
    },
    refresh() {
      this.bs && this.bs.refresh && this.bs.refresh();
    },
    finishPullUp() {
      this.bs && this.bs.finishPullUp && this.bs.finishPullUp();
    },
    scrollTo(x, y, time) {
      this.bs && this.bs.scrollTo && this.bs.scrollTo(x, y, time);
    },
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    },
  },
};
</script>

<style scoped>
</style>