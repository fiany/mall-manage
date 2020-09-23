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
          <el-input placeholder="请输入内容" v-model="queryInfo.productName">
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
        :page-size="queryInfo.pageSize">
      </el-pagination>
    </el-card>
    <!-- 添加商品对话框-->
    <el-dialog
      title="添加商品"
      :visible.sync="addDialogVisible"
      width="80%">
      <el-form :model="addProductForm" :rules="addProductFormRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="addProductForm.productName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productList: [],
      // 请求参数
      queryInfo: {
        pageNo: 1,
        pageSize: 10,
        productName: ''
      },
      pageNo: 0,
      totalNum: 0,
      totalPage: 0,
      addDialogVisible: false,
      addProductForm: {},
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
    async getProductList() {
      const { data: res } = await this.$http.post('/product/v1/product/info/list', this.queryInfo
      )
      if (res.code !== 0) return this.$message.error('获取商品列表出错')
      this.productList = res.data.list
      this.pageNo = res.data.pageNo
      this.totalNum = res.data.totalNum
      this.totalPage = res.data.totalPage
    },
    // 监听分页值改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNo = newPage
      this.getProductList()
    },
    // 监听页大小改变
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getProductList()
    }
  },
  created() {
    this.getProductList()
  }
}

</script>
<style lang="less" scoped>

</style>
