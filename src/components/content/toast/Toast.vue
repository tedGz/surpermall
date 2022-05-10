<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  props: {
    message: {
      type:String,
      default() {
        return '我的天啊！买到就是赚到啊！'
      }
    },
    isShow: {
      type:Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    show(message, time) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, time);
    }
  }
}
</script>

<style>
  .toast {
    position: fixed;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    border-radius: 10px;
    z-index: 99;

    white-space: nowrap;
    color: #fff;
    background-color: rgba(0,0,0,.6);
  }
</style>