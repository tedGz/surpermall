<template>
  <div id="tab-category">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategory.list">
      <div v-for="(item, index) in subcategory.list" :key="index" class="item">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "../../../components/common/gridview/GridView.vue";
export default {
  components: { GridView },
  props: {
    subcategory: {
      type: Object,
      default: [],
    },
  },
};
</script>

<style scoped>
.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>