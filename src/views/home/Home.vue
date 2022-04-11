<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
                 ></tab-control>
    <scroll 
    class="content" 
    ref="scroll" 
    :probetype="3" 
    @scroll="contentScroll"
    @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentIndex].list"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/common/tabcontrol/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import BackTop from '@/components/content/backtop/BackTop'
import Scroll from '@/components/common/scroll/Scroll'

import { getHomeMultidata,getHomeGoods } from '@/network/home'

export default {
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    Scroll
  },
  data(){
    return {
    banners:[],
    recommends:[],
    goods:{
      'pop':{page: 1,list:[]},
      'new':{page: 1,list:[]},
      'sell':{page: 1,list:[]}
    },
    currentIndex: 'pop',
    isShow:false,
    tabOffsetTop: 0,
    isTabFixed : false
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    // this.$bus.$on('itemImageLoad',()=>{
    //   this.$refs.scroll.bs.refresh()
    // })
  },
  methods:{
    //事件监听相关方法
    tabClick(index){
      switch (index) {
        case 0: 
          this.currentIndex = 'pop'
          break;      
        case 1:
          this.currentIndex = 'new'
          break;
        case 2:
          this.currentIndex = 'sell'
          break  
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backTop(){
      this.$refs.scroll.bs.scrollTo(0,0,300)
    },
    contentScroll(position){
      this.isShow = position.y < -1000

      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentIndex)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page
      getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1

      this.$refs.scroll.finshPullUp()
    })
    }
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
/* 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .content {
    position: absolute;

    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>