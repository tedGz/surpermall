<template>
  <grid-view>
    <goods-item
      v-for="(item, index) in goods"
      :key="index"
      :goodsItem="item"
    ></goods-item>
  </grid-view>
</template>

<script>
import GridView from "@/components/common/gridview/GridView";
import GoodsItem from "./GoodsItem.vue";

export default {
  components: {
    GoodsItem,
    GridView,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
</style>