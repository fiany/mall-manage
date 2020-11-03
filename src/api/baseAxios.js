import axios from 'axios'
import Vue from 'vue'

/**
 * 通用公用方法
 * @param method 请求方法
 * @param url 请求路径
 * @param params 请求参数
 * @param isPrompt 是否弹出提示信息，用于控制请求成功时的提示信息
 * @param isNotJumpLogin 是否不跳转至登录页，用于接口返回未授权时是否不强制跳转到登录页，默认false,不传就强制跳转
 * @returns {*}
 */
const http = (method, url, params, isPrompt, isNotJumpLogin) => {
  return axios({
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: params,
    traditional: true
  }).then(response => {
    const data = response.data
    switch (data.code) {
      // 成功
      case 0:
        console.log(data)
        if (isPrompt) {
          Vue.prototype.$message.success(data.message)
        }
        return data
      // 系统繁忙
      case 101:
        Vue.prototype.$message.error(data.message)
        return Promise.reject(response)
      // 需要登陆
      case 102:
        Vue.prototype.$message.info(data.message)
        if (isNotJumpLogin) {
          return data
        } else {
          return this.$router.push('/login')
        }
      // 给开发者的提示信息
      case 103:
        Vue.prototype.$message.error(data.message)
        return Promise.reject(response)
      // 给用户的提示信息
      case 104:
        Vue.prototype.$message.warning(data.message)
        return Promise.reject(response)
    }
  })
}

export {
  http
}
