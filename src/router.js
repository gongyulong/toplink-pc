// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入 useElement
import UseElement from './views/useElement/index'

// 使用路由
Vue.use(Router)

// 创建并且导出一个 Router 对象
export default new Router({
  routes: [{
    name: 'useElement',
    path: '/useElement',
    component: UseElement
  }]
})
