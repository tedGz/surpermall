<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @menuClick="menuClick"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-category :subcategory="showSubCategory"></tab-category>
          <tab-control
            @tabClick="tabClick"
            :titles="['综合', '新品', '销量']"
          ></tab-control>
          <tab-detail :subRecommendDetail="showSubRecommendDetail"></tab-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import TabMenu from "./childComps/TabMenu.vue";
import TabCategory from "./childComps/TabCategory.vue";
import TabDetail from "./childComps/TabDetail.vue";

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/common/tabcontrol/TabControl";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";
export default {
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabCategory,
    TabControl,
    TabDetail,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },
  created() {
    this._getCategory();
  },
  mounted() {
    // 打印出的结果为{__ob__: Observer } 如果单独拿数据的值，就会返回undefined
    // Observer这些数据是vue这个框架对数据设置的监控器，一般都是不可枚举的。
    // console.log(this.categoryData);
  },
  computed: {
    // 返回tab-category组件需要的数据
    showSubCategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategory;
    },
    // 返回tab-detail组件需要的数据
    showSubRecommendDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    },
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        console.log(res);
        // 1.获取初始数据
        this.categories = res.data.category.list;
        // 2.准备一个对象整合数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategory: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个数据分类
        this._getSubCategory(0);
      });
    },
    _getSubCategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        console.log(res);
        //  log打印出来的this.categoryDate赋值前后都是赋值后的值
        // console.log(this.categoryData, 1);
        // 获取每个选项对应的右侧详细分类
        this.categoryData[index].subcategory = res.data;
        // console.log(this.categoryData, 2);

        // *父created ----> 父beforemouted -------> 子created -------> 子beforemouted
        // --------->子mouted --------> 父mouted*
        // beforemounted的执行之前vue实例会执行自己的script相关代码将数据请求下来
        // 子组件的生命周期只会执行一次，但是当子组件渲染的时候父组件的
        // 数据还没接受完就会造成子组件没有任何内容渲染
        // 所以处理完成立刻将数据保存
        // 所以在子组件上使用v-if监听数据更改

        // Vue 不能检测对象属性的添加或删除：
        // 可以使用this.$set(this.person,'age',12)
        // 当需要添加多个对象时，Object.assign({},this.person,{age:12,name:'wee'})

        // ...运算符属于浅拷贝
        // 此时vue实例上的data数据并未监听到改变，所以将其赋值
        // 等价于 this.categoryData = Object.assgin({},this.categoryData)
        this.categoryData = { ...this.categoryData };

        // 请求下方推荐信息
        this._getCategoryDetail("pop");
        this._getCategoryDetail("new");
        this._getCategoryDetail("sell");
      });
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 获取下方推荐商品信息
        this.categoryData[this.currentIndex].categoryDetail[type] = res;

        // 将数据保存下来
        this.categoryData = { ...this.categoryData };
        console.log(res);
      });
    },
    menuClick(index) {
      this._getSubCategory(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;

  display: flex;
}
.tab-content {
  height: 100%;
  flex: 1;
}
</style>