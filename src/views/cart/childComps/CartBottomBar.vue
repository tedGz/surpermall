<template>
  <div class="bottom-bar">
      <check-bottom class="check-all" :isChecked="isSelectAll" @click.native="allClick"></check-bottom>
      <span>全选</span>
      <span class="total-price">合计:￥{{totalPrice}}</span>
      <span class="buy-product" @click="checkOut">去计算:{{checkLength}}</span>
  </div>
</template>

<script>
import CheckBottom from '@/components/content/checkbottom/CheckBottom'
export default {
  data() {
    return {
      cartList:this.$store.state.cartList
    }
  },
  components: {
    CheckBottom
  },
  methods: {
    allClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = false
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = true
        });
      }
    },
    checkOut() {
      if(this.cartList.filter(item => item.checked == true) == false) {
        const message = '快去买点东西啊！混蛋！'
        this.$toast.show(message, 1500)
      } 
    }
  },
  computed: {
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((previousValue, currentValue) => {
        return  previousValue + currentValue.price * currentValue.count
      },0)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      //全部选中
      const isFalse = (item) => item.checked == false
      return !this.cartList.some(isFalse)
    }
  }
}
</script>

<style scoped>
 .bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
 }
 .check-all {
   position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
 }
 .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
 }
 .buy-product {
   background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
 }
</style>