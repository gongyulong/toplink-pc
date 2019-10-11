// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入useElement
import UseElement from '@/views/useElement'
// 导入router && home
import Login from '@/views/login'
import Home from '@/views/home'
// 导入router && home
import Layout from '@/views/layout'
// 导入publish
import Publish from '@/views/publish'
// 导入nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入article
import Article from '@/views/article/list'

// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
let router = new Router({
  routes: [
    // 设置路由选项
    {
      path: '/',
      redirect: '/home'
    },
    // 测试路由
    { path: '/useElement',
      name: 'useElement',
      component: UseElement
    },
    // 登录路由
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 布局路由
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      // 添加它的子路由：
      children: [
        // 将 home 作为 layout 的子路由存在
        {
          path: '/home',
          component: Home
        },
        // 添加一个 publish 路由
        {
          path: '/publish',
          component: Publish
        },
        // 添加一个 article 路由
        {
          path: '/article/list',
          component: Article
        }
      ]
    }
  ]
})
// 给路由对象添加导航守卫：全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
  // 排除跳转到登录页面
  if (to.path !== '/login') {
    // 得到 localstorage 中的 userInfo
    let userInfo = window.localStorage.getItem('userInfo')
    // 判断用户是否登录：
    if (!userInfo) {
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

// 全局后置钩子守卫
router.afterEach((to, from) => {
  // 关闭进度条
  nprogress.done()
})
export default router
