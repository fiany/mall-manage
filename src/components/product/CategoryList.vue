<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" @click="appendFirstCategoryVisible" size="mini">添加顶级分类</el-button>
        </el-col>
      </el-row>
      <el-tree
        :data="categoryList"
        node-key="productCategoryId"
        lazy
        :load="loadNode"
        :expand-on-click-node="false"
        style="margin-top: 10px">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <el-col :span="15" >
            <span>{{ data.productCategoryName }}</span>
          </el-col>
          <el-col :span="3" style="text-align: center">
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => appendOpenCategoryVisible(node,data)">
                新增
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)">
                删除
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => editOpenCategoryVisible(node, data)">
                修改
              </el-button>
            </span>
          </el-col>
        </span>
      </el-tree>
    </el-card>
    <el-dialog
      :title="categoryTitle"
      :visible.sync="categoryVisible"
      width="20%"
      @close="categoryVisibleClose()">
      <el-form :model="categoryForm" :rules="categoryRequestRules" ref="categoryRequestRef">
        <el-form-item label="分类名称" prop="productCategoryName">
          <el-input v-model="categoryForm.productCategoryName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="categoryVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveCategoryFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { categoryList, categoryCreate, categoryDelete, categoryUpdate } from '@/api/product'

export default {
  data() {
    return {
      categoryList: [],
      categoryListRequest: {
        parentCategoryId: ''
      },
      categoryAddRequest: {
        parentCategoryId: '',
        productCategoryName: ''
      },
      categoryUpdateRequest: {
        parentCategoryId: '',
        productCategoryName: '',
        productCategoryId: ''
      },
      categoryDeleteRequest: {
        productCategoryId: ''
      },
      categoryForm: {
        parentCategoryId: '',
        productCategoryName: '',
        productCategoryId: ''
      },
      categoryVisible: false,
      categoryTitle: '',
      categoryRequestRules: {
        // 验证分类名称
        productCategoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    appendOpenCategoryVisible(node, data) {
      this.categoryTitle = '新增分类'
      this.categoryVisible = true
      this.categoryForm.parentCategoryId = data.productCategoryId
    },
    editOpenCategoryVisible(node, data) {
      this.categoryTitle = '修改分类'
      this.categoryVisible = true
      this.categoryForm.productCategoryId = data.productCategoryId
      this.categoryForm.productCategoryName = data.productCategoryName
    },
    appendFirstCategoryVisible() {
      this.categoryTitle = '新增分类'
      this.categoryVisible = true
      this.categoryForm.parentCategoryId = '0'
    },
    saveCategoryFun() {
      if (this.categoryForm.productCategoryId === '') {
        // 新增
        this.categoryAddRequest.productCategoryName = this.categoryForm.productCategoryName
        this.categoryAddRequest.parentCategoryId = this.categoryForm.parentCategoryId
        categoryCreate(this.categoryAddRequest)
      } else {
        // 修改
        this.categoryUpdateRequest.productCategoryName = this.categoryForm.productCategoryName
        this.categoryUpdateRequest.productCategoryId = this.categoryForm.productCategoryId
        this.categoryUpdateRequest.parentCategoryId = this.categoryForm.parentCategoryId
        categoryUpdate(this.categoryUpdateRequest)
      }
      this.categoryForm.parentCategoryId = ''
      this.categoryForm.productCategoryName = ''
      this.categoryForm.productCategoryId = ''
      this.categoryVisible = false
    },
    remove(node, data) {
      this.categoryDeleteRequest.productCategoryId = node.key
      categoryDelete(this.categoryDeleteRequest)
    },
    categoryVisibleClose() {
      this.$refs.categoryRequestRef.resetFields()
    },
    async loadNode(node, resolve) {
      this.categoryListRequest.parentCategoryId = node.key
      const { data: res } = await categoryList(this.categoryListRequest)
      resolve(res)
    }
  },
  created() {
  }
}
</script>
<style lang="less" scoped>

</style>
