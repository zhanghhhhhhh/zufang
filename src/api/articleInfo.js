import request from '@/utils/request'

/**
 * 获取房屋详情
 */
export const articleInfo = (id) => {
  return request({
    url: `/houses/${id}`

  })
}

/**
 * 房屋是否收藏
 */
export const articleFavorite = (id) => {
  return request({
    url: `/user/favorites/${id}`

  })
}

/**
 * 添加房屋收藏
 */
export const articleIsFavorite = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST'
  })
}

/**
 * 取消房屋收藏
 */
export const articleDelFavorite = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'

  })
}
