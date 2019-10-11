// 导入Vue
import Vue from 'vue'
// 导入了组件 App.vue (根组件)
import App from './App.vue'
// 导入路由
import router from './router'
// 导入 vuex
import store from './store'
// 导入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import '@/style/index.less'

// 导入全局axios
import axios from 'axios'
// axios挂载到vue原型
Vue.prototype.$http = axios
// axios 设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 设置 axios 的拦截器
// 请求拦截器：发送请求之前执行
axios.interceptors.request.use(config => {
  // 获取 token
  let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  // 判断只在 userInfo 存在时，才需要添加 token
  if (userInfo) {
    // 在请求头中添加 token
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  // 如果要请求正常发送必须返回 config
  return config
}, err => {
  // 请求异常时的逻辑
  return Promise.reject(err)
})

Vue.use(ElementUI)

// 设置当前项目的模式：当前模式为 开发模式
Vue.config.productionTip = false

// 创建一个 vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
