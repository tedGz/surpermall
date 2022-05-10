<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt="" >
  </div>
</template>

<script>
export default {
  props: {
    isChecked: {
      type:Boolean,
      default() {
        return true
      }
    }
  }
}
</script>

<style>
  .check-button {
    background-color: white;
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    border-color: pink;
    background-color: pink;
  }
</style>