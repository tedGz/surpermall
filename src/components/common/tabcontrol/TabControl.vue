<template>
  <div class="tab-control">
    <div 
      v-for="(item,index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)"
      >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    background-color: white;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .tab-control-item {
    flex:1;
    text-align: center;
    line-height: 40px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>