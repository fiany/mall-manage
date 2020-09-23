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
          <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 列表-->
      <el-table
        :data="productList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="商品价格"></el-table-column>
        <el-table-column prop="productSn" label="商品sn码"></el-table-column>
        <el-table-column prop="productBrandName" label="商品品牌名称"></el-table-column>
        <el-table-column prop="productCategoryName" label="商品分类名称"></el-table-column>
        <el-table-column prop="subTitle" label="商品副标题"></el-table-column>
        <el-table-column prop="keywords" label="商品关键字"></el-table-column>
        <el-table-column prop="sale" label="商品销量"></el-table-column>
        <el-table-column prop="stock" label="商品库存"></el-table-column>
        <el-table-column prop="productDetail" label="商品详情"></el-table-column>
        <el-table-column label="商品状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope" >
            <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.productId)" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
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
        <el-form-item label="商品名称" prop="productName" >
          <el-input v-model="addProductForm.productName" style="width: 130px" ></el-input>
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
        <el-form-item label="商品分类名称" prop="productCategoryId">
          <el-cascader :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="商品副标题" prop="subTitle">
          <el-input v-model="addProductForm.subTitle" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="商品关键字" prop="keywords">
          <el-input v-model="addProductForm.keywords" style="width: 130px"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stock">
          <el-input-number v-model="addProductForm.stock"  :min="1"  ></el-input-number>
        </el-form-item>
        <el-form-item label="商品详情" prop="productDetail">
          <el-input v-model="addProductForm.productDetail" style="width: 130px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addProduct">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改商品对话框-->
    <el-dialog
      title="修改商品"
      :visible.sync="editDialogVisible"
      width="80%"
      @close="editDialogVisibleClose()">
      <el-form :model="addProductForm" :rules="addProductFormRules" ref="editProductFormRef" >
        <el-form-item label="商品名称" >
          <el-input v-model="addProductForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" >
          <el-input v-model="addProductForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品sn码" >
          <el-input v-model="addProductForm.productSn"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌名称" >
          <el-input v-model="addProductForm.productBrandName"></el-input>
        </el-form-item>
        <el-form-item label="商品分类名称" >
          <el-input v-model="addProductForm.productCategoryName"></el-input>
        </el-form-item>
        <el-form-item label="商品副标题" >
          <el-input v-model="addProductForm.subTitle"></el-input>
        </el-form-item>
        <el-form-item label="商品关键字" >
          <el-input v-model="addProductForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" >
          <el-input v-model="addProductForm.stock"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" >
          <el-input v-model="addProductForm.productDetail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editProduct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productList: [],
      productBrandList: [],
      productCategoryList: [],
      // 商品列表请求参数
      queryProductListInfo: {
        pageNo: 1,
        pageSize: 10,
        productName: ''
      },
      // 品牌列表请求参数
      queryBrandListInfo: {

      },
      // 分类列表请求参数
      queryCategoryListInfo: {
        parentCategoryId: '0'
      },
      pageNo: 0,
      totalNum: 0,
      totalPage: 0,
      addDialogVisible: false,
      editDialogVisible: false,
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
        subTitle: ''
      },
      addProductFormRules: {
        // 验证商品名称
        productName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取商品列表
    async getProductList() {
      const { data: res } = await this.$http.post('/product/v1/product/info/list',
        this.queryProductListInfo)
      if (res.code !== 0) return this.$message.error('获取商品列表出错')
      this.productList = res.data.list
      this.pageNo = res.data.pageNo
      this.totalNum = res.data.totalNum
      this.totalPage = res.data.totalPage
    },
    // 获取品牌列表
    async getBrandList() {
      const { data: res } = await this.$http.post('/product/v1/brand/list', this.queryBrandListInfo)
      if (res.code !== 0) return this.$message.error('获取商品列表出错')
      this.productBrandList = res.data
    },
    // 获取分类列表
    async getCategoryList() {
      const { data: res } = await this.$http.post('/product/v1/category/list', this.queryCategoryListInfo)
      if (res.code !== 0) return this.$message.error('获取商品列表出错')
      this.productCategoryList = res.data
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
    showEditDialog(productId) {
      this.editDialogVisible = true
    },
    // 添加商品
    async addProduct() {
      const { data: res } = await this.$http.post('/product/v1/product/info/create', this.addProductForm)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.addDialogVisible = false
    },
    // 编辑商品
    editProduct() {
      this.editDialogVisible = false
    },
    // 添加商品对话框关闭
    addDialogVisibleClose() {
      console.log('关闭成功')
      this.$refs.addProductFormRef.resetFields()
    },
    // 修改商品对话框关闭
    editDialogVisibleClose() {
      this.$refs.editProductFormRef.resetFields()
    }

  },
  created() {
    this.getProductList()
    this.getBrandList()
    this.getCategoryList()
  }
}

</script>
<style lang="less" scoped>

</style>
