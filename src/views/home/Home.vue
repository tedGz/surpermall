<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <!-- 导航中部（在滚动到固定位置时显示，且绑定） -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="fixed"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probetype="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :data="goods[currentIndex].list"
      :pull-up-load="true"
    >
      <div>
        <!-- 首页轮播图 -->
        <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <!-- 商品推荐栏 -->
        <tab-control
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControl2"
        ></tab-control>
        <goods-list :goods="goods[currentIndex].list"></goods-list>
      </div>
    </scroll>
    <!-- 返回顶部按钮 -->
    <back-top @click.native="backTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/common/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import { backTopMixin } from "@/common/mixin.js";

import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      currentIndex: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // this.$bus.$on('itemImageLoad',()=>{
    //   this.$refs.scroll.bs.refresh()
    // })
  },
  activated() {
    //切换路由允许swiper滚动
    this.$refs.hSwiper.startTimer();
  },
  deactivated() {
    //切换路由静止swiper滚动
    this.$refs.hSwiper.stopTimer();
  },
  mixins: [backTopMixin],
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = "pop";
          break;
        case 1:
          this.currentIndex = "new";
          break;
        case 2:
          this.currentIndex = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 决定backTop是否显示
      this.isShow = position.y < -1000;

      // 决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentIndex);
    },
    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
  updated() {
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
</style>