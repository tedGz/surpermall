<template>
  <div id="user-info">
    <!-- 左侧头像框 -->
    <div class="private-photo">
      <img src="@/assets/img/profile/sfz.png" alt="" />
    </div>
    <div class="private-info">
      <div class="top">登录/注册</div>
      <div class="bottom">
        <img src="@/assets/img/profile/shouji.png" alt="" />
        暂未绑定手机号
      </div>
    </div>
    <div class="private-go">
      <img src="@/assets/img/profile/right.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#user-info {
  display: flex;
  background-color: var(--color-tint);
  /* top: 44px;
  height: 90px; */
  color: white;
}
.private-photo {
  width: 80px;
}
.private-photo img {
  margin: 15px 15px;
  background-color: rgb(105, 100, 100);
  width: 60px;
  height: 60px;
  border-radius: 30px;
}
.private-info {
  flex: 1;
}
.top,
.bottom {
  margin: 0 10px;
  line-height: 21px;
}
.top {
  margin-top: 15px;
  margin-bottom: 10px;
}
.bottom {
  font-size: 14px;
}
.private-info img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.private-go {
  width: 80px;
  line-height: 100px;
}
.private-go img {
  width: 20px;
  height: 20px;
  margin-left: 40px;
}
</style>