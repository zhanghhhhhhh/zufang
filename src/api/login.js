import request from '@/utils/request'

/**
 * 获取用户资料
 */
export const getUser = (myToken) => {
  return request({
    url: '/user',
    data: {
      authorization: myToken
    }
  })
}

/**
 *获取用户登录接口
 *
 */
export const getLogin = ({ username, password }) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
