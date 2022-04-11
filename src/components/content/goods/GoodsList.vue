<template>
  <div class="goods-list">
    <goods-item v-for="(item,index) in goods" 
    :key="index" 
    :goodsItem="item"
    class="goods-item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue'

export default {
  components:{
    GoodsItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
  }
</style>