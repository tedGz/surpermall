<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <grid-view>
      <goods-item
        v-for="(item, index) in recommendList"
        :goods-item="item"
        :key="index"
      ></goods-item>
    </grid-view>
  </div>
</template>

<script>
import GridView from "@/components/common/gridview/GridView";
import GoodsItem from "@/components/content/goods/GoodsItem";
export default {
  name: "DetailRecommendInfo",
  components: {
    GoodsItem,
    GridView,
  },
  props: {
    recommendList: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.recommend-info {
  padding: 5px;
}
.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>