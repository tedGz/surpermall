import BackTop from '@/components/content/backtop/BackTop'

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods:{
    backTop(){
      this.$refs.scroll.bs.scrollTo(0,0,300)
    }
  }
}