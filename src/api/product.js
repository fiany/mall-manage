import { http } from './baseAxios'

/**
 * 商品管理
 **/
// 商品列表
export const productInfoList = (params) => {
  return http('post', '/product/v1/product/info/list', params)
}

// 商品更新
export const productInfoUpdate = (params) => {
  return http('post', '/product/v1/product/info/update', params)
}

// 商品删除
export const productInfoDelete = (parames) => {
  return http('post', '/product/v1/product/info/delete', parames, true)
}

// 商品上下架状态更新
export const productInfoStatusUpdate = (parames) => {
  return http('post', '/product/v1/product/info/status/update', parames, true)
}
// 获取商品规格分类配置
export const productSpecificationCategoryInfo = (parames) => {
  return http('post', '/product/v1/product/specification/category/info', parames)
}

// 获取商品规格分类配置添加
export const productSpecificationCategoryAdd = (parames) => {
  return http('post', '/product/v1/product/specification/category/add', parames, true)
}

// 商品规格信息根据商品规格分类初始化
export const productSpecificationInit = (parames) => {
  return http('post', '/product/v1/product/specification/info/init', parames, true)
}

// 商品规格信息详情
export const productSpecificationInfo = (parames) => {
  return http('post', '/product/v1/product/specification/info', parames)
}

// 商品规格信息修改
export const productSpecificationInfoUpdate = (parames) => {
  return http('post', '/product/v1/product/specification/info/update', parames, true)
}

// 商品创建
export const productInfoCreate = (parames) => {
  return http('post', '/product/v1/product/info/create', parames, true)
}

// 品牌列表分页
export const brandPageList = (parames) => {
  return http('post', '/product/v1/brand/page-list', parames)
}

// 品牌删除
export const brandDelete = (parames) => {
  return http('post', '/product/v1/brand/delete', parames, true)
}

// 品牌创建
export const addBrand = (parames) => {
  return http('post', '/product/v1/brand/create', parames, true)
}

// 品牌更新
export const brandUpdate = (parames) => {
  return http('post', '/product/v1/brand/update', parames, true)
}

// 品牌列表
export const brandList = (parames) => {
  return http('post', '/product/v1/brand/list', parames)
}

// 商品分类树
export const categoryTree = (parames) => {
  return http('post', '/product/v1/category/tree', parames)
}

// 商品分类列表
export const categoryList = (parames) => {
  return http('post', '/product/v1/category/list', parames)
}

// 商品分类新增
export const categoryCreate = (parames) => {
  return http('post', '/product/v1/category/create', parames, true)
}

// 商品分类修改
export const categoryUpdate = (parames) => {
  return http('post', '/product/v1/category/update', parames, true)
}

// 商品分类删除
export const categoryDelete = (parames) => {
  return http('post', '/product/v1/category/delete', parames, true)
}
