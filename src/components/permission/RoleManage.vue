<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限模块</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
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

  </div>
</template>

<script>
export default {
  name: 'RoleList',
  data() {
    return ({
      brandPageListResponse: {
        totalNum: 0,
        pageNo: 0,
        list: []
      },
      brandPageListRequest: {
        pageNo: 0,
        pageSize: 10,
        productBrandName: ''
      }
    })
  }
}
</script>

<style scoped>

</style>
