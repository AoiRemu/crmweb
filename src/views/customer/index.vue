<template>
  <div class="app-container">
    <div class="query_warp">
      <div class="nav_warp">
        <el-button type="primary" size="small" @click="importData">导入客户数据</el-button>
        <el-button type="primary" size="small" @click="add">添加客户</el-button>
      </div>
      <div class="query_form">
        <el-form ref="form" :model="queryForm" :rules="rules" label-width="80px" :inline="true" size="normal">
          <el-form-item label="客户名称">
            <el-input v-model="queryForm.name" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" @click="getTable">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
    <div class="table_warp">
      <div class="header_warp">

        <div class="btn_warp">
          <el-button type="primary" size="small" @click="batchGroup">批量分组</el-button>
        </div>
      </div>
      <el-table ref="table" :data="tableData" border stripe>
        <el-table-column type="selection" width="55" />
        <el-table-column label="客户全名" prop="name" />
        <el-table-column label="手机" prop="phone" />
        <el-table-column label="地区" prop="county" />
        <el-table-column label="客户进展" prop="follow_state" />
        <el-table-column label="跟进人" prop="follow_account" />
        <el-table-column label="创建时间" prop="ctime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="default" @click="">放弃</el-button>

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

    <el-dialog
      title="添加客户"
      :visible.sync="visible"
      width="40%"
      top="50px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="visible = false"
    >
      <Info :id="0" ref="Info" />
    </el-dialog>

  </div>
</template>

<script>
import Info from './info.vue'
import { GetTable } from '@/api/customer'
export default {
  components: {
    Info
  },
  data() {
    return {
      queryForm: {
        name: '',
        pageSize: 10,
        pageIndex: 1
      },
      rules: {

      },
      tableData: [],
      total: 0,
      loading: false,

      visible: false

    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      GetTable(this.queryForm).then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
      })
    },
    sizeChange(val) {
      this.queryForm.pageSize = val
      this.getTable()
    },
    importData() {

    },
    add() {
      this.visible = true
    },
    batchGroup() {
      console.log(this.$refs.table.selection)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
