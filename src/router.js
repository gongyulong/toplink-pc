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

// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
export default new Router({
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
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/publish',
          component: Publish
        }
      ]
    }
  ]
})
