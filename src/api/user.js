import { http } from './baseAxios'

/**
 * 用户管理
 **/
// 用户登录
export const userLogin = (params) => { return http('post', '/user/v1/auth/login', params, true) }
// 用户退出登录
export const userLogout = (params) => { return http('get', '/user/v1/auth/logout', params, true) }
