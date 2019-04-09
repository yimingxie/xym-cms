import {request, http} from "../utils/request";

// 新闻列表接口
export const requestNewsList = (params) => {
  return request('get', '/api/news', params)
}

export const requestNewsList2 = (params) => {
  return http('get', '/api/news2', params)
}
