<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"/>
  </div>
</template>
<script>
import {SAVA_USER} from './store/mutations-type'
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  name: 'app',
  components: {
    FooterGuide
  },
 async mounted(){
   let result = await this.$API.autoLogin()
   this.$store.commit(SAVA_USER,result.data)
  }
}
</script>

<style lang="stylus">

</style>
