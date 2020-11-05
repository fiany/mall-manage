import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'

axios.interceptors.request.use(config => {
  // 请求拦截器
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(response => {
  return response
}, (err) => {
  if (err.response) { // 响应错误码处理
    return Promise.reject(err.response)
  }
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
