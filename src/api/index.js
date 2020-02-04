import ajax from './ajax'
//1、获取地理位置信息
export const getAddress = (latitude,longitude) => ajax({
    url:`/position/${latitude},${longitude}`
})
//2、获取食品列表
export const getCategory = () => ajax({
    url:'/index_category'
})

//、获取商品列表
export const getShopList = (latitude,longitude) => ajax({
    url:'shops',
    params:{
      latitude,
      longitude
    }
})

// 获取手机号验证码

export const sendCode = ({phone}) => ajax({
    url:'/sendcode',
    params:{
        phone
    }
})

// 用户名密码登录
export const loginWithUserName = ({username, pwd, captcha}) => ajax({
    url: '/login_pwd',
    method: 'POST',
    data: {
      name: username,
      pwd,
      captcha
    },
  })
  /* 手机号验证码登陆 */
  export const loginWithPhone = ({phone, code}) => ajax({
    url: '/login_sms',
    method: 'POST',
    data: {
      phone,
      code
    }
  })
// 自动登录
export const autoLogin = () => ajax({
  url:'/auto_login',
  headers:{
    needToken:true
  }
})
