import axios from 'axios'
import {Message,Loading} from 'element-ui'
/*
 * 一、request：
 *    1. 说明：封装对后台的请求，可以选择自动处理一些异常。
 *    2. 参数：
 *        - url：            后台地址，必填，String，如："/user/add"
 *        - params：         请求参数，必填，Object，如：{"name":"xxx"}
 *        - config：         axios参数，选填，Object，默认值：{}
 *        - auto_error_res： 是否自动处理响应错误，选填，Boolean，默认值：true
 *        - auto_error_data：是否自动处理后台错误，选填，Boolean，默认值：true
 *    3. 返回：
 *        - 成功：Promise.resolve(请求成功后的结果：response.data.result)
 *        - 失败：
 *            - 请求异常：Promise.reject(http响应错误)
 *            - 请求失败：Promise.reject(请求失败后的结果：response.data.error)
 *    4. 约定后台返回数据格式：
 *        response.data = {
 *          "success": true/false,         //请求成功或失败
 *          "result": {},                  //请求成功后的结果
 *          "error":{
 *            "code": 100001,              //请求失败错误码
 *            "message": "用户名字重复"    //请求失败描述
 *          }
 *        }
 *
 * 二、sessionRequest：
 *    1. 说明：利用sessionStorage缓存请求，可以选择out_time，其他同request。
 *    2. 参数：
 *        - out_time：距离上次请求多少秒后需要重新请求，选填，Integer，小于0表示不重新请求，默认值：-1
 *
 * 三、localRequest：
 *    1. 说明：利用localStorage缓存请求，可以选择out_time，其他同request。
 *    2. 参数：
 *        - out_time：距离上次请求多少秒后需要重新请求，选填，Integer，小于0表示不重新请求，默认值：604800（一周）
 *
 **/


// 全局axios配置
// 为每个请求设置默认baseURL
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL =''
}


// 请求拦截器，判断token
axios.interceptors.request.use(function (config) {
  config.headers.Accept = 'application/json'
  config.headers.Authorization = localStorage.getItem('user-token')
  return config
})

// 响应拦截
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      // 判断token过期，跳转到登录页
      case 401:
        console.log('来自request.js -- token过期')
        this.$router.push('/login')
        break
    }
  }
})

// 完善版post请求
export const request = (method, url, params, config = {}, auto_error_res = true, auto_error_data = true) => {
  const args = Object.assign({
    'method': method,
    'url': url,
    'data': params
  }, config)

  return new Promise((resolve, reject) => {
    axios(args).then(res => {
      // 后台返回指定错误
      // success 待定
      if (!res.data.success) {
        res.data.error = res.data.error || {}
        console.log(res.data.error)
        // 判断token失效
        if (res.data.error.code === 100000) {
          console.log('测试this.$message')
          Message({
            message: '警告：token失效，请重新登录',
            type: 'warning'
          })
          window.location.href = '/#/login'
          reject(res.data.error)
        }
        // 其他错误（自动处理）
        if (auto_error_data) {
          const error_msg = res.data.error.message || '未知错误，请联系管理员！'
          const err_code = res.data.error.message || '-1'
          console.log(error_msg + '错误码：' + err_code)
        }
        reject(res.data.error)
      }

      // 若无错误，则返回数据
      resolve(res.data)
    }, err => {
      // 网络请求异常
      console.log('网络请求异常：' + err)
      // 若自动处理网络异常
      if (auto_error_res) {
        const error_status = err.response.status || -100
        console.log('自动处理网络请求异常：错误码为' + error_status)
        Message({
          message: '网络请求异常！错误码：' + error_status,
          type: 'error'
        })
      }
      reject(err)
    })
  })


}


// 普通版请求
export const http = (method, url, params, auto_err = true) => {
  const args = {
    "method": method,
    "url": url,
    "data": params
  }

  return new Promise((resolve, reject) => {
    axios(args)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (auto_err) {
          Message({
            message: '网络请求异常！',
            type: 'error'
          })
        }
        reject(err)
      })
  })
}







