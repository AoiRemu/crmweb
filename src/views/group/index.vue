<template>
  <div class="app-container">
    <div class="query_warp">
      <div class="nav_warp">
        <el-button type="primary" size="default" @click="edit(0, '')">添加分组</el-button>
      </div>
      <div class="query_form">
        <el-form ref="form" :model="queryForm" :rules="rules" label-width="80px" :inline="true" size="normal">
          <el-form-item label="分组名称">
            <el-input v-model="queryForm.name" placeholder="" />
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
        <el-table-column prop="name" label="名称" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="default" @click="edit(scope.row.id, scope.row.name)">编辑</el-button>
              <!-- <el-button type="text" size="default" @click="remove(scope.row.id)">删除</el-button> -->
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
      :title="editTitle"
      :visible.sync="visible"
      width="20%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="visible = false"
    >
      <Edit v-if="visible" :id="editForm.id" ref="Edit" :name="editForm.name" @getTable="getTable" @closeDialog="visible = false" />
    </el-dialog>
  </div>
</template>

<script>
import { GetTableData } from '@/api/group'
import Edit from './edit.vue'
export default {
  components: {
    Edit
  },
  data() {
    return {
      queryForm: {
        name: '',
        pageSize: 10,
        pageIndex: 1,
        isPage: true
      },
      rules: {},
      tableData: [],
      total: 0,
      loading: false,

      visible: false,
      editForm: {
        id: 0,
        name: ''
      },
      editTitle: ''
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      this.loading = true
      GetTableData(this.queryForm).then(res => {
        this.tableData = res.data
        this.total = res.total
      }).finally(() => {
        this.loading = false
      })
    },
    sizeChange(val) {
      this.queryForm.pageSize = val
      this.getTable()
    },
    edit(id, name) {
      this.editForm.id = id
      this.editForm.name = name
      this.visible = true
      this.editTitle = id === 0 ? '添加标签' : '编辑标签'
    },
    remove(id) {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
