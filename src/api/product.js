import { http } from './baseAxios'

/**
 * 商品管理
 **/
// 商品列表
export const productInfoList = (params) => {
  return http('post', '/product/v1/product/info/list', params)
}

// 品牌列表
export const brandList = (parames) => {
  return http('post', '/product/v1/brand/list', parames)
}

// 商品分类树
export const categoryTree = (parames) => {
  return http('post', '/product/v1/category/tree', parames)
}

// 商品删除
export const productInfoDelete = (parames) => {
  return http('post', '/product/v1/product/info/delete', parames, true)
}

// 商品上下架状态更新
export const productInfoStatusUpdate = (parames) => {
  return http('post', '/product/v1/product/info/status/update', parames, true)
}

// 商品创建
export const productInfoCreate = (parames) => {
  return http('post', '/product/v1/product/info/create', parames, true)
}
