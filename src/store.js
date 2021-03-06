// 导入了 vue
import Vue from 'vue'
// 导入了 vuex
import Vuex from 'vuex'
// 使用了 vuex
Vue.use(Vuex)

// 导入了一个 vuex 对象
export default new Vuex.Store({
  // 存在统一的数据
  state: {
    userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  },
  // 修改 mutations 中的数据
  mutations: {
    changeUserInfo (state, VuexUserInfo) {
      // 将新的值赋值给 userInfo
      state.userInfo.name = VuexUserInfo.name
      state.userInfo.intro = VuexUserInfo.intro
      state.userInfo.email = VuexUserInfo.email
      // 将数据同步到 localstorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    changeUserInfoImg (state, VuexImg) {
      state.userInfo.photo = VuexImg
      // 将数据同步到 localstorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      // console.log(state.userInfo)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      // 将数据同步到 localstorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  }
})
