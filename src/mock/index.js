import Mock from 'mockjs'

export default {
  mockData() {
    Mock.mock('/test', {
      'list|1-10': [{
        'id|+1': 1
      }]
    })

    // 登录接口
    Mock.mock('/api/user/login', {
      'success': true,
      'result': {
        'token': 'tokenzaici'
      }
    })

    // 用户信息接口
    Mock.mock('/api/user/info', {
      'success': true,
      'result': {
        'name': 'xym',
        'role': 'user'
      }
    })

    // 图表接口
    Mock.mock('/api/chart', {
      'success': true,
      // ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]  [5, 20, 36, 10, 10, 20]
      'result': [
        {"type": "衬衫", "num": 5},
        {"type": "羊毛衫", "num": 20},
        {"type": "雪绒衫", "num": 36},
        {"type": "裤子", "num": 10},
        {"type": "高跟鞋", "num": 10},
        {"type": "袜子", "num": 20}
      ]
    })

    // 新闻列表接口
    Mock.mock('/api/news', function () {
      let newsList = []
      for (let i = 0; i < 10; i++) {
        let newsObj = {
          id: i,
          title: Mock.Random.ctitle(),
          date: Mock.Random.date(),
          paragraph: Mock.Random.cparagraph()
        }
        newsList.push(newsObj)
      }
      return {
        'success': true,
        'newsList': newsList
      }
    })

    Mock.mock('/api/news-detail/0', {
      'success': true,
      'result': {
        'content': '321321321'
      }
    })


  }
}
