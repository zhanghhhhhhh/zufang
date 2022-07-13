import request from '@/utils/request'
// import store from '@/store'

/**
 * 获取我的收藏列表
 */
export const getCollect = () => {
  return request({
    url: '/user/favorites'

  })
}

/**
 * 获取我的出租列表
 */

export const getRent = () => {
  return request({
    url: 'user/houses'

  })
}
