<template>
  <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" @click="isUserNameLogin=false" :class="{on:!isUserNameLogin}">短信登录</a>
            <a href="javascript:;" @click="isUserNameLogin=true" :class="{on:isUserNameLogin}">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:!isUserNameLogin}">
              <section class="login_message">
                <input name="phone" v-validate="'required|phone'"  v-model="phone" type="tel" maxlength="11" placeholder="手机号">
                 <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                <!-- :disabled = !rightPthonNumber 一旦输入手机号正确就恒为ture 去反后恒为false false后就看后边的 (非0即为真所以整体为真所以disabled = true 也就是 disabled = disabled,所以巧妙的解决了不可点的行为) -->
                <button 
                       @click.prevent="getCode" 
                       :disabled="!rightPthonNumber || countNumber > 0" 
                       class="get_verification" 
                       :class="{rightpthon:rightPthonNumber}">{{countNumber?`${countNumber}s后可以重新获取`:'获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input v-model="code" name="code" v-validate="'required|code'" type="tel" maxlength="6" placeholder="验证码">
                 <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:isUserNameLogin}">
              <section>
                <section class="login_message">
                  <input v-model="username" name="username" v-validate="'required'" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                  <span style="color: red;" v-show="errors.has('username')">{{ errors.first('username') }}</span>
                </section>
                <section class="login_verification">
                  <input v-model="pwd" name="pwd" v-validate="'required'" :type="isShowPwd?'tel':'password'" maxlength="6" placeholder="密码">
                  <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                  <div class="switch_button" :class="isShowPwd?'on':'off'" @click="isShowPwd=!isShowPwd">
                    <div class="switch_circle" :class="{right: isShowPwd}"></div>
                    <span class="switch_text">{{isShowPwd?'abc':'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input v-model="captcha" name="captcha" v-validate="'required'" type="text" maxlength="11" placeholder="验证码">
                  <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                  <img ref="captcha" class="get_verification" @click="UpdataCaptcha" :src="'http://localhost:4000/captcha'" alt="captcha">
                </section>
              </section>
            </div>
            <button @click.prevent="login" class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back">
          <!-- <i class="iconfont icon-jiantouzuo"></i> -->
        </a>
      </div>
    </section>
</template>

<script type="text/ecmascript-6">
// import {sendCode} from '../../api'
  export default {
    data(){
      return{
        isUserNameLogin: true,
        isShowPwd: false,
        countNumber:0 ,//倒计时
        phone:'',//手机号存储
        code:'',//手机号验证码
        username:'',//用户名
        pwd:'',//密码验证
        captcha:'',//验证码验证

      }
    },
    methods: {
      UpdataCaptcha(){
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+ Date.now()
      },
     async  getCode(){
        //重置倒计时间
        this.countNumber = 5
        let timer = setInterval(() => {
        this.countNumber--
        this.countNumber === 0 && clearInterval(timer)
        },1000)
        // 发送请求,获取手机验证码
        let result = await this.$API.sendCode({phone:this.phone})
        if(result.code === 0){
          alert('短信验证码发送成功,请注意查收!')
        }else{
          alert(result.msg)
        }
      },
      async login(){
         let {isUserNameLogin,phone,code,username,pwd,captcha} = this 
         let names = isUserNameLogin? ['username','pwd','captcha'] : ['phone','code']
         const success = await this.$validator.validateAll(names) // 对所有表单项进行验证
         if(success){ //前端验证成功
            //  2、后端验证
            let result
            if(isUserNameLogin){ //用户名验证登录
              result = await this.$API.loginWithUserName({username,pwd,captcha})
              if(result.code === 1){
                alert('请输入正确的用户名/密码/验证码/')
                this.captcha = ''
                this.UpdataCaptcha()
              }
            }else{//手机号验证登录
              result = await this.$API.loginWithPhone({phone,code})
              if(result.code === 1){
                alert('请输入正确的验证码')
                this.code = ''
              }
            }
            // 统一处理验证成功的跳转
            if(result.code === 0){
              alert('恭喜您,登录成功!')
              this.$router.replace('/Profile')
              this.$store.dispatch('getUserActions',result.data)
            }
         }else{
           alert('前端验证失败')
         }
      }
    },
    computed:{
      rightPthonNumber(){
        return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone) 
      }
    }
  }
</script>

<style lang="stylus">
   .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  outline:0 
                  color #ccc
                  font-size 14px
                  background transparent
                  &.rightpthon
                    color #333
                    border 0
                    outline:0 
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
