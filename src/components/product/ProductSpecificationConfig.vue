<template>
  <div>
    <el-table
      :data="specificationCategoryInfo"
      style="width: 100%">
      <el-table-column
        prop="categoryName"
        label="分类名称"
        width="158">
      </el-table-column>
      <el-table-column
        label="分类值"
        width="800">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.categoryValueList" :key="index" style="margin-top: 10px">{{item}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px">
      <el-col :span="4"><el-input class="input-new-tag" size="mini" v-model="specificationCategoryAddForm.categoryName"/></el-col>
      <el-col :span="18">
        <el-tag
          :key="tag"
          v-for="tag in specificationCategoryAddForm.categoryValueList"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-col>
      <el-col :span="2"><el-button type="primary" size="mini" @click="specificationCategoryAddFun">新增</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { productSpecificationCategoryInfo, productSpecificationCategoryAdd } from '@/api/product'

export default {
  data() {
    return {
      specificationCategoryInfo: [],
      inputVisible: false,
      inputValue: '',
      specificationCategoryAddForm: {
        categoryName: '',
        categoryValueList: [],
        productId: ''
      }
    }
  },
  props: ['productId'],
  methods: {
    async productSpecificationCategoryInfoFun() {
      const { data: res } = await productSpecificationCategoryInfo({
        productId: this.productId
      })
      this.specificationCategoryInfo = res
    },
    async specificationCategoryAddFun() {
      this.specificationCategoryAddForm.productId = this.productId
      await productSpecificationCategoryAdd(this.specificationCategoryAddForm)
      await this.productSpecificationCategoryInfoFun()
      this.specificationCategoryAddForm.categoryName = ''
      this.specificationCategoryAddForm.categoryValueList = []
    },
    handleClose(tag) {
      this.specificationCategoryAddForm.categoryValueList.splice(this.specificationCategoryAddForm.categoryValueList.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.specificationCategoryAddForm.categoryValueList.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  mounted() {
    this.productSpecificationCategoryInfoFun()
  },
  watch: {
    productId(newVal, oldVal) {
      this.specificationCategoryAddForm.categoryName = ''
      this.specificationCategoryAddForm.categoryValueList = []
      this.productSpecificationCategoryInfoFun()
    }
  }
}
</script>

<style scoped lang="less">
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  height: 32px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
