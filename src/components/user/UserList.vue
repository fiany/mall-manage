<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryUserList.username">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="userListResponse.list" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column label="是否可用" width="170px" fixed="right">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isBlocked"
                       :active-value=0
                       :inactive-value=1
                       inactive-color="#ff4949"
                       active-color="#13ce66"
                       @change="updateUserBlocked(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 分页区域-->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10, 20, 30, 40,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userListResponse.totalNum"
        :current-page="userListResponse.pageNo"
        :page-size="queryUserList.pageSize">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { userList, userBlockedUpdate } from '@/api/user'

export default {
  data() {
    return {
      userListResponse: {
        totalNum: 0,
        pageNo: 0,
        list: []
      },
      queryUserList: {
        pageNo: 0,
        pageSize: 10,
        username: ''
      }
    }
  },
  methods: {
    async getUserList() {
      const { data: res } = await userList(this.queryUserList)
      this.userListResponse = res
    },
    // 监听分页值改变
    handleCurrentChange(newPage) {
      this.queryUserList.pageNo = newPage
      this.getProductList()
    },
    // 监听页大小改变
    handleSizeChange(newSize) {
      this.queryUserList.pageSize = newSize
      this.getProductList()
    },
    // 更新用户锁定状态
    async updateUserBlocked(row) {
      await userBlockedUpdate({
        userId: row.userId,
        blocked: row.isBlocked
      })
      await this.getUserList()
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style scoped>

</style>
