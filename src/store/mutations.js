import {
    SAVA_ADDRESS,
    SAVA_CATEGORYS,
    SAVA_SHOPLIST,
    SAVA_USER,
    SAVA_TOKEN
} from './mutations-type'

export default{
    [SAVA_ADDRESS](state,address){
        state.address = address
    },
    [SAVA_CATEGORYS](state,categorys){
        state.categorys = categorys
    },
    [SAVA_SHOPLIST](state,shoplist){
        state.shoplist = shoplist
    },
    [SAVA_USER](state,user){
        state.user = user
    },
    [SAVA_TOKEN](state,token){
        state.token = token
    }
}