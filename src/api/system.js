import { http } from './baseAxios'

/**
 * 系统管理
 **/

// 获取验证码
export const captchaImage = (params) => { return http('get', '/system/v1/common/captcha/img', params) }
