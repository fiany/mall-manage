<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryProductListInfo.productName">
            <el-button slot="append" icon="el-icon-search" @click="getProductList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 列表-->
      <el-table
        :data="productList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="productName" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="productSn" label="sn码"></el-table-column>
        <el-table-column prop="productBrandName" label="品牌名称"></el-table-column>
        <el-table-column prop="productCategoryName" label="分类名称"></el-table-column>
        <el-table-column prop="subTitle" label="副标题"></el-table-column>
        <el-table-column prop="keywords" label="关键字"></el-table-column>
        <el-table-column prop="sale" label="销量"></el-table-column>
        <el-table-column label="是否上架">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.productStatus"
                       :active-value=1
                       :inactive-value=0
                       inactive-color="#ff4949"
                       active-color="#13ce66"
                       @change="updateProductStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="showEditDialog(scope.row)"
                       size="mini">修改
            </el-button>
            <el-button type="text" icon="el-icon-edit" @click="showProductSpecificationConfig(scope.row.productId)"
                       size="mini">规格分类配置
            </el-button>
            <el-button type="text" icon="el-icon-delete" size="mini"
                       @click="deleteProduct(scope.row.productId)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10, 20, 30, 40,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        :current-page="pageNo"
        :page-size="queryProductListInfo.pageSize">
      </el-pagination>
    </el-card>
    <!-- 添加商品对话框-->
    <el-dialog
      title="添加商品"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogVisibleClose()">
      <el-form :model="addProductForm" :rules="addProductFormRules" ref="addProductFormRef" label-width="100px">
        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="addProductForm.productName" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="addProductForm.price" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="商品sn码" prop="productSn">
          <el-input v-model="addProductForm.productSn" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌名称" prop="productBrandId">
          <el-select v-model="addProductForm.productBrandId" placeholder="请选择">
            <el-option
              v-for="item in productBrandList"
              :key="item.productBrandId"
              :label="item.productBrandName"
              :value="item.productBrandId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类名称" prop="selectCategoryIds">
          <el-cascader
            v-model="selectCategoryIds"
            :options="productCategoryList"
            :props="{ expandTrigger: 'click',checkStrictly: true,
            value: 'id',label: 'name',children: 'children'}"
            clearable
            ref="selectCategoryIdRef"
            @change="closeSelectCategory"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品副标题" prop="subTitle">
          <el-input v-model="addProductForm.subTitle" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="商品关键字" prop="keywords">
          <el-input v-model="addProductForm.keywords" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="productDetail">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="addProductForm.productDetail"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="pictures">
          <el-input v-model="addProductForm.pictures"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addProduct">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="规格分类配置"
               :visible.sync="productSpecificationConfig.dialogVisible"
               width="50%"
               @close="productSpecificationConfig.dialogVisible = false">
      <product-specification-config :product-id="productSpecificationConfig.productId"></product-specification-config>
    </el-dialog>
  </div>
</template>
<script>
import {
  brandList,
  categoryTree,
  productInfoCreate,
  productInfoUpdate,
  productInfoDelete,
  productInfoList,
  productInfoStatusUpdate
} from '@/api/product'

import ProductSpecificationConfig from '@/components/product/ProductSpecificationConfig'

export default {
  data() {
    return {
      productList: [],
      productBrandList: [],
      productCategoryList: [],
      selectCategoryIds: [],
      // 商品列表请求参数
      queryProductListInfo: {
        pageNo: 1,
        pageSize: 10,
        productName: ''
      },
      // 品牌列表请求参数
      queryBrandListInfo: {},
      // 分类列表请求参数
      queryCategoryListInfo: {
        parentCategoryId: '0'
      },
      pageNo: 0,
      totalNum: 0,
      totalPage: 0,
      addDialogVisible: false,
      // 添加商品入参
      addProductForm: {
        keywords: '',
        price: 0,
        productBrandId: '',
        productBrandName: '',
        productCategoryId: '',
        productCategoryName: '',
        productDetail: '',
        productId: '',
        productName: '',
        productSn: '',
        stock: 0,
        subTitle: '',
        pictures: []
      },
      deleteProductForm: {
        productId: ''
      },
      addProductFormRules: {
        // 验证商品名称
        productName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ]
      },
      // 规格配置对话框
      productSpecificationConfig: {
        productId: '',
        dialogVisible: false
      }
    }
  },
  methods: {
    // 获取商品列表
    async getProductList() {
      const { data: res } = await productInfoList(
        this.queryProductListInfo)
      this.productList = res.list
      this.pageNo = res.pageNo
      this.totalNum = res.totalNum
      this.totalPage = res.totalPage
    },
    // 获取品牌列表
    async getBrandList() {
      const { data: res } = await brandList(this.queryBrandListInfo)
      this.productBrandList = res
    },
    // 获取分类列表
    async getCategoryList() {
      const { data: res } = await categoryTree(this.queryCategoryListInfo)
      this.productCategoryList = res
    },
    // 监听分页值改变
    handleCurrentChange(newPage) {
      this.queryProductListInfo.pageNo = newPage
      this.getProductList()
    },
    // 监听页大小改变
    handleSizeChange(newSize) {
      this.queryProductListInfo.pageSize = newSize
      this.getProductList()
    },
    // 显示添加商品修改模态框
    showEditDialog(row) {
      this.addDialogVisible = true
      this.addProductForm = row
      this.selectCategoryIds[0] = row.productCategoryId
    },
    // 显示添加商品添加模态框
    showAddDialog() {
      this.addDialogVisible = true
    },
    // 删除商品
    async deleteProduct(productId) {
      this.deleteProductForm.productId = productId
      await productInfoDelete(this.deleteProductForm)
      await this.getProductList()
    },
    async updateProductStatus(row) {
      await productInfoStatusUpdate({
        productId: row.productId,
        productStatus: row.productStatus
      })
    },
    // 添加商品
    async addProduct() {
      this.addProductForm.productCategoryId = this.selectCategoryIds[0]
      this.addProductForm.pictures = []
      if (this.addProductForm.productId === '') {
        await productInfoCreate(this.addProductForm)
      } else {
        await productInfoUpdate(this.addProductForm)
        this.addProductForm.productId = ''
      }
      this.addDialogVisible = false
      await this.getProductList()
    },
    // 添加商品对话框关闭
    addDialogVisibleClose() {
      this.$refs.addProductFormRef.resetFields()
      this.selectCategoryIds = []
    },
    // 修改商品对话框关闭
    editDialogVisibleClose() {
      this.$refs.editProductFormRef.resetFields()
    },
    // 选中商品分类
    closeSelectCategory() {
      this.$refs.selectCategoryIdRef.dropDownVisible = false
    },
    // 展示规格配置
    showProductSpecificationConfig(productId) {
      this.productSpecificationConfig.productId = productId
      this.productSpecificationConfig.dialogVisible = true
    }
  },
  created() {
    this.getProductList()
    this.getBrandList()
    this.getCategoryList()
  },
  components: {
    ProductSpecificationConfig
  }
}

</script>
<style lang="less" scoped>
.el-switch {
  margin-right: 10px;
}
</style>
