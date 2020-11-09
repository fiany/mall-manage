<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="listRequest.username">
            <el-button slot="append" icon="el-icon-search" @click="orderListFun"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 列表-->
      <el-table
        :data="listPage.list" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态"></el-table-column>
        <el-table-column prop="payStatus" label="支付状态"></el-table-column>
        <el-table-column prop="payTime" label="支付时间"></el-table-column>
        <el-table-column prop="payType" label="支付类型"></el-table-column>
        <el-table-column prop="totalPrice" label="总价格"></el-table-column>
      </el-table>
      <!-- 分页区域-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :page-sizes="[10, 20, 30, 40,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listPage.totalNum"
        :current-page="listPage.pageNo"
        :page-size="listPage.pageSize">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { orderList } from '@/api/order'

export default {
  data() {
    return {
      listRequest: {
        username: '',
        pageNo: 1,
        pageSize: 10
      },
      listPage: {
        list: [],
        pageNo: 1,
        totalNum: 0,
        totalPage: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    async orderListFun() {
      const { data: res } = await orderList(this.listRequest)
      this.listPage = res
    },
    // 监听分页值改变
    handleCurrentChange(newPage) {
      this.listRequest.pageNo = newPage
      this.orderListFun()
    },
    // 监听页大小改变
    handleSizeChange(newSize) {
      this.listRequest.pageSize = newSize
      this.orderListFun()
    }
  }
}
</script>

<style scoped>

</style>
