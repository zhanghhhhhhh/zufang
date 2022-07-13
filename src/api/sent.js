import request from '@/utils/request'

/**
 * 发布房源的需求
 */

export const getHomeInfo = () => {
  return request({
    url: '/houses/params'

  })
}

/**
 * 小区查询关键字查询
 */
export const getHomeKeyword = (name, id) => {
  return request({
    url: '/area/community',
    params: {
      name, id
    }
  })
}
