<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入品牌名称" v-model="brandPageListRequest.productBrandName">
            <el-button slot="append" icon="el-icon-search" @click="getBrandPageList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addBrandFun">添加品牌</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="brandPageListResponse.list" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="productBrandLogo" label="品牌logo"></el-table-column>
        <el-table-column prop="productBrandName" label="品牌名称"></el-table-column>
        <el-table-column label="操作" width="170px" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editBrandFun(scope.row)"
                       size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="brandDeleteFun(scope.row.productBrandId)"></el-button>
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
        :total="brandPageListResponse.totalNum"
        :current-page="brandPageListResponse.pageNo"
        :page-size="brandPageListRequest.pageSize">
      </el-pagination>
    </el-card>
    <el-dialog
      title="brandTitle"
      :visible.sync="brandVisible"
      width="40%"
      @close="brandVisibleClose()">
      <el-form :model="brandForm" :rules="brandRequestRules" ref="brandRequestRulesRef">
        <el-form-item label="品牌logo" prop="productBrandLogo">
          <el-input v-model="brandForm.productBrandLogo"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="productBrandName">
          <el-input v-model="brandForm.productBrandName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="brandVisible = false">取 消</el-button>
      <el-button type="primary" @click="brandFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { brandPageList, brandDelete, addBrand, brandUpdate } from '@/api/product'

export default {
  data() {
    return {
      brandPageListResponse: {
        totalNum: 0,
        pageNo: 0,
        list: []
      },
      brandPageListRequest: {
        pageNo: 0,
        pageSize: 10,
        productBrandName: ''
      },
      deleteBrandRequest: {
        productBrandId: 0
      },
      brandVisible: false,
      addBrandRequest: {
        productBrandLogo: '',
        productBrandName: ''
      },
      brandTitle: '',
      brandForm: {
        productBrandLogo: '',
        productBrandName: '',
        productBrandId: ''
      },
      brandRequestRules: {
        // 验证品牌logo
        productBrandLogo: [
          { required: true, message: '请输入品牌logo', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ],
        // 验证品牌名称
        productBrandName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 监听分页值改变
    handleCurrentChange(newPage) {
      this.brandPageListRequest.pageNo = newPage
      this.getBrandPageList()
    },
    // 监听页大小改变
    handleSizeChange(newSize) {
      this.brandPageListRequest.pageSize = newSize
      this.getBrandPageList()
    },
    async getBrandPageList() {
      const { data: res } = await brandPageList(this.brandPageListRequest)
      this.brandPageListResponse = res
    },
    // 品牌删除
    async brandDeleteFun(productBrandId) {
      this.deleteBrandRequest.productBrandId = productBrandId
      await brandDelete(this.deleteBrandRequest)
      await this.getBrandPageList()
    },
    // 品牌新增/修改
    async brandFun() {
      this.addBrandRequest.productBrandId = this.brandForm.productBrandId
      this.addBrandRequest.productBrandName = this.brandForm.productBrandName
      this.addBrandRequest.productBrandLogo = this.brandForm.productBrandLogo
      if (this.brandForm.productBrandId === '') {
        await addBrand(this.addBrandRequest)
      } else {
        await brandUpdate(this.addBrandRequest)
      }
      this.brandVisible = false
      await this.getBrandPageList()
    },
    // 关闭对话框
    brandVisibleClose() {
      this.$refs.brandRequestRulesRef.resetFields()
    },
    // 添加品牌对话框
    addBrandFun() {
      this.brandTitle = '新增品牌'
      this.brandVisible = true
    },
    // 修改品牌对话框
    editBrandFun(row) {
      this.brandTitle = '修改品牌'
      this.brandVisible = true
      this.brandForm.productBrandId = row.productBrandId
      this.brandForm.productBrandName = row.productBrandName
      this.brandForm.productBrandLogo = row.productBrandLogo
    }
  },
  created() {
    this.getBrandPageList()
  }
}
</script>

<style scoped lang="less">

</style>
