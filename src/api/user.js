import { http } from './baseAxios'

/**
 * 用户管理
 **/
// 用户登录
export const userLogin = (params) => {
  return http('post', '/user/v1/auth/login', params, true)
}
// 用户退出登录
export const userLogout = (params) => {
  return http('get', '/user/v1/auth/logout', params, true)
}
// 获取用户信息
export const userInfo = (params) => {
  return http('post', '/user/v1/user/info', params)
}
// 登录页获取用户信息,如果返回未授权不会跳转到登录页
export const userInfoLogin = (params) => {
  return http('post', '/user/v1/user/info', params, false, true)
}
// 获取用户权限树
export const allPermissionTree = (params) => {
  return http('post', '/user/v1/user/all/permission/tree', params)
}
// 获取所有权限树
export const userPermissionTree = (params) => {
  return http('post', '/user/v1/user/permission/tree', params)
}

// 获取用户列表
export const userList = (params) => {
  return http('post', '/user/v1/user/list', params)
}
// 修改用户锁定状态
export const userBlockedUpdate = (params) => {
  return http('post', '/user/v1/user/blocked/update', params, true)
}
// 修改用户管理员状态
export const userManagerUpdate = (params) => {
  return http('post', '/user/v1/user/manager/update', params, true)
}
