import {request} from '../utils/request'


export default {
  lineChart(params) {
    return request('get', '/api/chart', params)
  },

  lineChart2(params) {
    return request('get', '/api/chart', params)
  },

}