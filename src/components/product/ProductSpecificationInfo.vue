<template>
  <div>
    <el-table
      :data="specificationInfo"
      style="width: 100%">
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="sale" label="销量"/>
      <el-table-column prop="stock" label="库存"/>
      <el-table-column prop="specificationPictures" label="图片"/>
      <el-table-column label="规格" width="600">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.specificationValueList" :key="index">
            {{ item.categoryName }} : {{ item.categoryValueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="showEditDialog(scope.row)"
                     size="mini">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="规格修改" width="50%" :visible.sync="editDialogVisible"
               :modal-append-to-body="false"
               @close="editDialogVisible = false">
      <el-form :model="editSpecificationForm" :rules="editSpecificationFormRules">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="价格" prop="price">
              <el-input  v-model="editSpecificationForm.price" oninput="value=value.replace(/[^\d.]/g,'')" style="width:120px;"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="库存" prop="stock">
              <el-input-number :min="1" :max="10" v-model="editSpecificationForm.stock"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
          <el-form-item label="规格图片" prop="specificationPictures">
            <el-input v-model="editSpecificationForm.specificationPictures"></el-input>
          </el-form-item>
      </el-form>
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editSpecification">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { productSpecificationInfo, productSpecificationInfoUpdate } from '@/api/product'

export default {
  data() {
    return {
      specificationInfo: [],
      editDialogVisible: false,
      editSpecificationForm: {
        price: 0,
        productSpecificationId: '',
        specificationPictures: [],
        stock: 0
      },
      editSpecificationFormRules: {
        // 验证商品名称
        price: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }

        ],
        stock: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }

        ],
        specificationPictures: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }

        ]
      }
    }
  },
  props: ['productId'],
  methods: {
    async productSpecificationInfoFun() {
      const { data: res } = await productSpecificationInfo({
        productId: this.productId
      })
      this.specificationInfo = res
    },
    showEditDialog(row) {
      this.editSpecificationForm.productSpecificationId = row.productSpecificationId
      this.editSpecificationForm.price = row.price
      this.editSpecificationForm.stock = row.stock
      this.editSpecificationForm.specificationPictures = row.specificationPictures
      this.editDialogVisible = true
    },
    async editSpecification() {
      await productSpecificationInfoUpdate(this.editSpecificationForm)
      this.editDialogVisible = false
      await this.productSpecificationInfoFun()
    }
  },
  mounted() {
    this.productSpecificationInfoFun()
  },
  watch: {
    productId(newVal, oldVal) {
      this.productSpecificationInfoFun()
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
