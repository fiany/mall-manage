import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'

const getBaseUrl = (env) => {
  let base = {
    production: '/',
    development: 'http://localhost:7000',
    test: 'http://localhost:7000'
  }[env]
  if (!base) {
    base = '/'
  }
  return base
}

// 设置请求根路径
axios.defaults.baseURL = getBaseUrl(process.env.NODE_ENV)
axios.interceptors.request.use(config => {
  // 请求拦截器
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use((response) => {
  const data = response.data
  switch (data.code) {
    // 成功
    case 0:
      console.log(data)
      Vue.prototype.$message.success(data.message)
      break
    // 系统繁忙
    case 101:
      Vue.prototype.$message.error(data.message)
      return Promise.reject(response)
    // 需要登陆
    case 102:
      Vue.prototype.$message.info(data.message)
      return this.$router.push('/login')
    // 给开发者的提示信息
    case 103:
      Vue.prototype.$message.error(data.message)
      return Promise.reject(response)
    // 给用户的提示信息
    case 104:
      Vue.prototype.$message.warning(data.message)
      return Promise.reject(response)
  }
  return response
}, (err) => {
  if (err.response) { // 响应错误码处理
    console.log(err)
    return Promise.reject(err.response)
  }
  console.log(err)
  if (!window.navigator.online) { // 断网处理
    return -1
  }
  return Promise.reject(err)
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
