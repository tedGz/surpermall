<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  Components: {},
};
</script>

<style scoped>
#tab-bar {
  /* 定位相关 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 本身样式 */
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
  text-align: center;
  height: 49px;
  font-size: 14px;

  /* 利用flex布局 */
  display: flex;
}
</style>