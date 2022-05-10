<template>
  <div id="profile">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <template v-slot:center> <div>我的商城</div> </template>
    </nav-bar>
    <!-- 占位盒子 -->
    <div class="posi"></div>
    <!-- 用户登录 -->
    <user-info></user-info>
    <!-- 用户主要内容 -->
    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">00.0</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item middle">
        <div class="number"><span class="balance">6</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <!-- 列表其他内容 -->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import UserInfo from "./childComps/UserInfo.vue";
import NavBar from "@/components/common/navbar/NavBar";
import ListView from "./childComps/ListView.vue";
export default {
  data() {
    return {
      orderList: [
        { icon: "#icon-xiaoxi", iconColor: "#ff8198", info: "我的消息" },
        {
          icon: "#icon-fenqishangcheng",
          iconColor: "#fc7b53",
          info: "积分商城",
        },
        {
          icon: "#icon-huiyuanqiagoumai",
          iconColor: "#ffc636",
          info: "会员卡",
        },
      ],
      serviceList: [
        {
          icon: "#icon-gouwuchefill",
          iconColor: "#ff8198",
          info: "我的购物车",
        },
        { icon: "#icon-app1", iconColor: "#ff8198", info: "下载购物APP" },
      ],
    };
  },
  components: {
    NavBar,
    UserInfo,
    ListView,
  },
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
  height: 100vh;
}
.posi {
  height: 44px;
  width: 100%;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: white;
}
.account {
  display: flex;
}
.account-item {
  flex: 1;
  height: 85px;
  text-align: center;
  font-size: 13px;
  padding: 18px;
  background-color: #fff;
}
.balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.middle {
  margin: 0 1px;
}
.account-info {
  margin-top: 6px;
}
.order-list,
.service-list {
  margin-top: 12px;
}
</style>