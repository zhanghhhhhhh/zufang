import request from '@/utils/request'

/**
 * 首页轮播图接口
 */

export const getHomeImg = () => {
  return request({
    url: '/home/swiper'
  })
}

/**
*租房小组接口

*/

export const getHomeGroup = (area) => {
  return request({
    url: '/home/groups',
    params: {
      area
    }
  })
}

/**
 * 查询房屋具体信息
 */

export const getHomeAll = (cityId) => {
  return request({
    url: '/houses',
    params: {
      cityId
    }
  })
}

/**
 * 获取房屋查询条件数据
 */
export const getHomeCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
