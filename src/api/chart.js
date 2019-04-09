import {request} from '../utils/request'

/**
 * 图表接口
 * @param params
 */
export const lineChart = params => {
  return request('get', '/api/chart', params)
}

