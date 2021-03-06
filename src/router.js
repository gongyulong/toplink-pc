// 导入了 vue
import Vue from 'vue'
// 导入了第三方包 vue-router
import Router from 'vue-router'
// 导入useElement
import UseElement from '@/views/useElement'
// 导入nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入router && home
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
// 导入router && home
const Layout = () => import('@/views/layout')
// 导入publish
const Publish = () => import('@/views/article/publish')
// 导入article
const Article = () => import('@/views/article/list')
// 导入comment
const Comment = () => import('@/views/comment')
// 导入material
const Material = () => import('@/views/material')
// 导入User
const User = () => import('@/views/user')
// 导入Data
const Data = () => import('@/views/data')
// 使用路由
Vue.use(Router)

// 连续点击相同路由链接会报错是因为vue router 升级到3.1.x 后,如果没有捕获到错误，控制台始终会出现警告。
// 下面操作就是解决报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
          path: '/article/publish',
          component: Publish
        },
        // 添加一个 article 路由
        {
          path: '/article/list',
          component: Article
        },
        // 添加一个 修改文章 的动态路由
        {
          path: '/article/edit/:id',
          component: Publish
        },
        // 添加一个 评论 的动态路由
        {
          path: '/comment',
          component: Comment
        },
        // 添加一个 图片管理 的动态路由
        {
          path: '/material',
          component: Material
        },
        // 添加一个 用户信息 的动态路由
        {
          path: '/user',
          component: User
        },
        // 添加一个 echart 的动态路由
        {
          path: '/data',
          component: Data
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
