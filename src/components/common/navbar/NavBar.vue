<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  z-index: 10;
  width: 100%;
  top: 0;
  left: 0;

  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>