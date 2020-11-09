import { http } from './baseAxios'

/**
 * 订单管理
 **/
// 订单列表
export const orderList = (params) => {
  return http('post', '/order/v1/order/info/list/manage', params)
}
