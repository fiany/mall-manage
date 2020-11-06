<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tree
        :data="categoryList"
        node-key="productCategoryId"
        lazy
        :load="loadNode"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{data.productCategoryName }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => openCategoryVisible(data)">
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
              @click="() => edit(node, data)">
              修改
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
    <el-dialog
      :title="categoryTitle"
      :visible.sync="categoryVisible"
      width="40%"
      @close="categoryVisibleClose()">
      <el-form :model="categoryForm" :rules="categoryRequestRules" ref="categoryRequestRef">
        <el-form-item label="分类名称" prop="productCategoryName">
          <el-input v-model="categoryForm.productCategoryName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="categoryVisible = false">取 消</el-button>
      <el-button type="primary" @click="categoryFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { categoryList } from '../../api/product'

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
        productCategoryName: ''
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
    openCategoryVisible(data) {
      this.categoryTitle = '新增分类'
      this.categoryVisible = true
      this.categoryForm.parentCategoryId = data.productCategoryId
    },
    append(data) {
      // const newChild = { id: id++, label: 'testtest', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    edit(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    categoryFun() {

    },
    categoryVisibleClose() {

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
