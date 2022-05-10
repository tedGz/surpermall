<template>
  <grid-view>
    <goods-item
      v-for="(item, index) in subRecommendDetail"
      :key="index"
      :goodsItem="item"
    ></goods-item>
  </grid-view>
</template>

<script>
import GridView from "../../../components/common/gridview/GridView.vue";
import GoodsItem from '@/components/content/goods/GoodsItem.vue';
export default {
  props: {
    subRecommendDetail: {
      type: Array,
    },
  },
  components: {
    GridView,
    GoodsItem,
  },
};
</script>

<style>
</style>