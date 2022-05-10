<template>
  <div id="detail">
    <detail-nav-bar @titleClick="navClick" ref="navbar"></detail-nav-bar>
    <scroll
      class="detail-scroll"
      ref="scroll"
      @scroll="themeScroll"
      :data="[
        topImages,
        goods,
        shop,
        detailInfo,
        paramInfo,
        commentInfo,
        recommendList,
      ]"
      :probe-type="3"
    >
      <div>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
        <detail-param-info
          :param-info="paramInfo"
          ref="param"
        ></detail-param-info>
        <detail-comment-info
          :comment-info="commentInfo"
          ref="comment"
        ></detail-comment-info>
        <detail-recommend-info
          :recommend-list="recommendList"
          ref="recommend"
        ></detail-recommend-info>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
    <go-cart @click.native="goCart" v-show="isShow"></go-cart> 
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo.vue";

import { backTopMixin } from "@/common/mixin.js";
import GoCart from '../../components/content/gocart/goCart.vue';
import Scroll from "@/components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    DetailRecommendInfo,
    GoCart,
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      topY: [0],
      currentIndex: 0,
      message: "",
      isShow: false,
    };
  },
  created() {
    this._getDetailData();
    this._getRecommend();
  },
  updated() {
    this._getOffsetTop();
  },
  mixins: [backTopMixin],
  methods: {
    _getDetailData() {
      //1.获取iid
      this.iid = this.$route.params.iid;

      //2.请求详情数据
      getDetail(this.iid).then((res) => {
        // 2.1.获取结果
        const data = res.result;

        // 2.2.获取顶部信息
        this.topImages = data.itemInfo.topImages;

        // 2.3.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 2.4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 2.5.获取商品详情
        this.detailInfo = data.detailInfo;

        // 2.6.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data);

        // 2.7.保存评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    _getRecommend() {
      //3.请求推荐数据
      getRecommend().then((res, err) => {
        if (err) return;
        this.recommendList = res.data.list;
      });
    },
    _getOffsetTop() {
      this.topY = [0];

      this.topY.push(this.$refs.param.$el.offsetTop);
      this.topY.push(this.$refs.comment.$el.offsetTop);
      this.topY.push(this.$refs.recommend.$el.offsetTop);
      this.topY.push(Number.MAX_VALUE);
    },
    navClick(index) {
      this.$refs.scroll.bs.scrollTo(0, -this.topY[index]);
    },
    themeScroll(position) {
      // 返回顶部按钮监听
      this.isShow = position.y < -1000;

      // 监听滚动到哪一个主题
      this.isTabFixed = -position.y > this.tabOffsetTop;

      const positionY = -position.y;

      const length = this.topY.length;
      // 减少监听滚动判断
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY > this.topY[i] &&
            positionY < this.topY[i + 1]) ||
            (i === length - 1 && positionY > this.topY[i]))
        ) {
          console.log(i);
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = i;
        }
      }
    },
    //加入购物车事件
    addCart() {
      // 1.创建对象
      const product = {};
      // 2.创建对象信息
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;
      // 3.添加到Store中
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res, 1000);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;

  height: 100vh;
}

.detail-scroll {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
</style>