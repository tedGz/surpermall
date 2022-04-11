<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data(){
    return {
      bs:null
    }
  },
  props:{
    probetype:{
      type:Number,
    }
  },
  mounted(){
    this.bs = new BScroll(this.$refs.wrapper,{
      observeDOM: true,
      observeImage: true,
      click: true,
      probeType: this.probetype,
      pullUpLoad: true
    })
    this.bs.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
    this.bs.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods:{
    finshPullUp(){
      this.bs.finishPullUp()
    }
  }
}
</script>

<style>

</style>