import {request} from '../utils/request'

/**
 * 提供登录和注册接口
 */

/**
 * 登录
 * @param  {Object} params
 * @return {Promise}
 * {
       'success': true,
       'result': {
          'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj'
       }
   * }
 *
 */
export const requestLogin = params => {
  return request('post', '/api/user/login', params)
}



