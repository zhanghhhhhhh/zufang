import request from '@/utils/request'

/**
 * 获取所有城市
 */
export const getAllCity = (level) => {
  return request({
    url: '/area/city',
    params: {
      level
    }
  })
}

/**
 * 获取热门城市
 */

export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}
