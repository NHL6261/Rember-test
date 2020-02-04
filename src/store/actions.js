import {
    getAddress,
    getCategory,
    getShopList
} from '../api'
import {
    SAVA_ADDRESS,
    SAVA_CATEGORYS,
    SAVA_SHOPLIST,
    SAVA_USER,
    SAVA_TOKEN
} from './mutations-type'

export default {
   async getAddressActions({commit}){
    let result = await getAddress(40.10038,116.36867)
    !!(result.code === 0) && commit(SAVA_ADDRESS,result.data)
   },
   async getCategorysActions({commit},fn){
    let result = await getCategory()
    if(result.code === 0){
        commit(SAVA_CATEGORYS,result.data)
        typeof fn === 'function' && fn()
    }
   },
   async getShopListActions({commit}){
    let result = await getShopList(40.10038,116.36867)
    !!(result.code === 0) && commit(SAVA_SHOPLIST,result.data)
   },
   async getUserActions({commit},user){
    commit(SAVA_TOKEN,user.token),
    // 将信息存入localStoreage中
    localStorage.setItem('user_token', user.token)
    delete user.token
    commit(SAVA_USER, user)
   },
}