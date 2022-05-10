<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="pic">
        <svg :fill="item.iconColor" class="icon" aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
}
#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
.pic svg {
  width: 18px;
  height: 18px;
}

.item .pic {
  margin-top: 10px;
  position: absolute;
  left: 16px;
  top: -7px;
}

.item .info {
  margin-left: 40px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>
