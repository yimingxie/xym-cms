import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import IdentifyTest from '@/views/IdentifyTest'
import HomeCon from '@/views/HomeCon'
import LineChart from '@/views/charts/LineChart'
import PieChart from '@/views/charts/PieChart'
import NewsList from '@/views/news/NewsList'
import NewsDetail from '@/views/news/NewsDetail'
import Index from '@/views/index'
import Upload from '@/views/Upload'
import UploadEle from '@/views/UploadEle'

import cookie from '../utils/cookie'


Vue.use(Router)


// export default new Router({})

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login1',
      component: Login
    },
    {
      path: '/home',
      name: '首页',
      redirect: '/home/content',
      meta: {
        requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home,
      children: [
        {
          path: 'content',
          name: '概况',
          component: HomeCon
        }
      ]
    },
    {
      path: '/charts',
      name: '图表',
      redirect: '/charts/line-chart',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'line-chart',
          name: '线图',
          component: LineChart
        },
        {
          path: 'pie-chart',
          name: '饼图',
          component: PieChart
        }
      ]
    },
    {
      path: '/news',
      name: '新闻',
      redirect: '/news/list',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'list',
          name: '列表',
          component: NewsList,
        },
        {
          path: 'detail',
          name: '详情',
          component: NewsDetail
        }
      ]
    },
    {
      path: '/identfy-test',
      name: 'IdentifyTest',
      component: IdentifyTest
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/upload-ele',
      name: 'UploadEle',
      component: UploadEle
    },
  ]
})


router.beforeEach((to, from, next) => {
  // 判断当前的token是否存在
  console.log(to.meta)
  let token = window.localStorage.getItem('user-token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  } else {
    next()
  }
})







export default router
