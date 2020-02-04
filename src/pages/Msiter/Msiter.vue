<template>
  <section class="msite">
    <!--首页头部-->
    <GshopHeaders :title="address.name ? address.name : '定位中'">
      <template v-slot:left>
        <span class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </span>
      </template>
      <template v-slot:right>
        <span class="header_login">
          <span class="header_login_text">登录|注册</span>
        </span>
      </template>
    </GshopHeaders>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(category, index) in newCategorys"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(categoryItem, index) in category"
              :key="index"
            >
              <div class="food_container">
                <img
                  :src="`https://fuss10.elemecdn.com/${categoryItem.image_url}`"
                />
              </div>
              <span>{{ categoryItem.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>

<script type="text/ecmascript-6">
import Swiper from 'swiper'
import _ from 'lodash'
import {mapState} from 'vuex'
import 'swiper/css/swiper.min.css'
import ShopList from '../../components/ShopList/ShopList'
// import {getAddress} from '../../api'
export default {
  components:{
    ShopList
  },
   async mounted(){
    // let result = await getAddress(40.10038,116.36867)
    // this.$store.commit('sava_address',result.data.address)
    // console.log(result)
    this.$store.dispatch('getAddressActions')
    this.$store.dispatch('getCategorysActions', () => {
      //当dom对象渲染完成后,才呈现
      this.$nextTick(()=>{
          new Swiper('.swiper-container', {
              autoplay: true,//可选选项，自动滑动
              loop : true,//无缝滚动 ,对应是loop环路
          pagination: {
              el: '.swiper-pagination',
          },
        })
      })
    })
  },
  methods:{
    _chunk(target,size){
      if(!Array.isArray(target) || size <= 0){
        return target
      }
      let result = []
      while(target.length > size){
        result.push(target.splice(0,size))
      }
      target.length && result.push(target)
      return result
    }
  },
  computed:{
    ...mapState({
      address: state => state.address,
      category: state => state.categorys
    }),
    newCategorys(){
      // return _.chunk(this.category,8)
      return this._chunk(this.category,8)
    }
  },
  watch:{
    // category(){
    //   //当dom对象渲染完成后,才呈现
    //   this.$nextTick(()=>{
    //       new Swiper('.swiper-container', {
    //           autoplay: true,//可选选项，自动滑动
    //           loop : true,//无缝滚动 ,对应是loop环路
    //       pagination: {
    //           el: '.swiper-pagination',
    //       },
    //     })
    //   })
    // }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  height 100%
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background yellow
</style>
