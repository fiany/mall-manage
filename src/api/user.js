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
// 获取用户权限树
export const allPermissionTree = (params) => {
  return http('post', '/user/v1/user/all/permission/tree', params)
}
// 获取所有权限树
export const userPermissionTree = (params) => {
  return http('post', '/user/v1/user/permission/tree', params)
}
