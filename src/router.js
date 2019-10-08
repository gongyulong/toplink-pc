// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入useElement
import UseElement from '@/views/useElement'
// 导入router && home
import Login from '@/views/login'
import Home from '@/views/home'

// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
export default new Router({
  routes: [
    { path: '/useElement',
      name: 'useElement',
      component: UseElement
    },
    // 设置路由选项
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
