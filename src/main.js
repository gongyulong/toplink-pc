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
// 导入elementUi全局样式
import '@/style/index.less'

// 导入全局axios
import axios from 'axios'
// 导入 json-bigint
import JSONBig from 'json-bigint'

// 导入富文本编辑框的文件
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑框的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 使用中间件
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

// 设置当前项目的模式：当前模式为 开发模式
Vue.config.productionTip = false

// axios 设置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios挂载到vue原型
Vue.prototype.$http = axios

// 对服务器响应给 axios 的数据进行 bigint 的处理
axios.defaults.transformResponse = [
  data => {
    try {
      // 这个 data 就是纯粹的服务器响应给 axios 的数据
      // 在 return 之前要进行转换
      return JSONBig.parse(data) // 报错的原因：因为删除数据后，接口返回的数据为空，无法进行 JSONBig 的转换
    } catch (err) {
      console.log(err)
      return data
    }
  }
]

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

// 响应拦截器：当服务器响应信息回来时执行
axios.interceptors.response.use(response => {
  // 如果要响应正常返回必须返回 response
  // console.log('----------------------响应拦截器----------------------')
  // console.log(response)
  // console.log('----------------------响应拦截器----------------------')
  return response.data.data
}, err => {
  // 请求异常时的逻辑
  return Promise.reject(err)
})

// 创建一个 vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
