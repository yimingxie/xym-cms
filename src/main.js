// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// 引入UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/css-reset.css'

// 引入其他插件
import Mock from './mock/index'
import axios from 'axios'
import echarts from 'echarts'
import uploader from 'vue-simple-uploader'


// 引入vuex
import store from './store'

// mock
Mock.mockData()

// 全局过滤器
import * as filters from './filters/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import cookie from './utils/cookie'


// 安装
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(uploader)

// 路由守卫
router.beforeEach((to, from, next) => {
  let token = cookie.get('user-token')
  // 判断是否有token，没有则全部重定向login
  if (token) {
    // 进入成功后，拉去用户信息
    axios.get('/api/user/info').then(res => {
      console.log(res.data)
      let user = JSON.stringify(res.data.result)
      next()
    })
  } else {
    if (to.path == '/login') {
      next()
    }
    next('/login')
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
