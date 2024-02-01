<template>
  <div class="app-container">
    <div class="query_warp">
      <div class="query_form">
        <el-form ref="form" :model="queryForm" :rules="rules" label-width="80px" :inline="true" size="normal">
          <el-form-item label="经理人">
            <el-input v-model="queryForm.accountName" placeholder="" />
          </el-form-item>
          <el-form-item lable=" ">
            <el-button type="primary" @click="getTable">查询</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
    <div class="table_warp">
      <el-table v-loading="loading" :data="tableData" border stripe>
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="state" label="状态" />
        <el-table-column prop="accountName" label="经理人" />
        <el-table-column prop="amount" label="金额" />
        <el-table-column prop="signTime" label="签约时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="default" @click="edit(scope.row.id)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="table_pagination"
        :current-page.sync="queryForm.pageIndex"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="queryForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        :pager-count="7"
        @size-change="sizeChange"
        @current-change="getTable"
      />
    </div>

  </div>
</template>

<script>
import { GetTableData } from '@/api/contract'
export default {
  data() {
    return {
      queryForm: {
        accountName: '',
        pageSize: 10,
        pageIndex: 1
      },
      rules: {},
      tableData: [],
      total: 0,
      loading: false,

      visible: false,
      id: 0
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      this.loading = true
      GetTableData(this.queryForm).then(res => {
        console.log(res)
        this.tableData = res.data.data
        this.total = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    sizeChange(val) {
      this.queryForm.pageSize = val
      this.getTable()
    },
    edit(id) {
      this.id = id
      this.visible = true
    },
    remove(id) {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
