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
          <el-form-item v-if="searchType === 1" label="客户分组">
            <el-select v-model="queryForm.groupId" placeholder="请选择客户分组" clearable filterable>
              <el-option
                v-for="item in groupOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>

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
        <el-table-column label="客户全名" prop="name" width="120px">
          <template slot-scope="scope">
            <div>
              <el-popover placement="right" trigger="hover">
                <AvatarCard :key="scope.row.id" v-model="scope.row" class="card_item" />
                <div slot="reference" class="avatar_warp">
                  <el-avatar icon="el-icon-user-solid" :size="24" shape="circle" fit="fill" />
                  <div class="avatar_right">
                    <div class="customer_name">{{ scope.row.name }}</div>
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="客户分组" prop="groupName">
          <template slot-scope="scope">
            <div>
              {{ showGroupName(scope.row.groupId) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="客户星级" prop="level" width="140px">
          <template slot-scope="scope">
            <div>
              <RateStar :key="scope.row.id" v-model="scope.row.level" :disabled="true" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="手机" prop="phone">
          <template v-slot="scope">
            <div>
              {{ showPhone(scope.row.phone) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="标签" prop="county">
          <template v-slot="scope">
            <div>
              <el-tag v-for="item in scope.row.tags" :key="item.id" disable-transitions type="" effect="dark">{{ item.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="客户进展" prop="follow_state" />
        <el-table-column label="跟进人" prop="follow_account" width="120px" />
        <el-table-column label="下次跟进时间" prop="next_follow_time">
          <template v-slot="scope">
            <div :class="{ itstime: itstime(scope.row.next_follow_time) }">
              {{ scope.row.next_follow_time }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="ctime" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button v-if="scope.row.state!==2" type="text" size="default" @click="giveup(scope.row.id)">放弃</el-button>
              <el-button v-if="scope.row.state===2" type="text" size="default" @click="allot(scope.row.id)">认领</el-button>
              <el-button type="text" size="default" @click="detail(scope.row.id)">详情</el-button>

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

      <el-drawer
        title="客户详情"
        :visible.sync="detailVisible"
        direction="rtl"
        size="30%"
        :destroy-on-close="true"
        :show-close="true"
        :wrapper-closable="false"
      >
        <Detail v-if="detailVisible" :id="detailId" ref="Detail" @closeDialog="detailVisible = false" />
      </el-drawer>

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
      <Info :id="0" ref="Info" @closeDialog="visible=false" />
    </el-dialog>

  </div>
</template>

<script>
import Info from './info.vue'
import { GetTable } from '@/api/customer'
import { GetOptions } from '@/api/group'
import Detail from './detail.vue'
import RateStar from '@/components/Customer/rateStar.vue'
import { hidePhone } from '@/utils/common'
import AvatarCard from '@/components/Customer/customerCard.vue'
export default {
  components: {
    Info,
    Detail,
    RateStar,
    AvatarCard
  },
  data() {
    return {
      searchType: 0,
      queryForm: {
        name: '',
        groupId: '',
        pageSize: 10,
        pageIndex: 1
      },
      groupOptions: [],
      rules: {

      },
      tableData: [],
      total: 0,
      loading: false,

      visible: false,

      detailId: 0,
      detailVisible: false

    }
  },
  created() {
    this.searchType = this.$route.params.type ? +this.$route.params.type : 0
    this.getTable()
    this.getGroupOptions()
  },
  mounted() {

  },
  methods: {
    mockTable(list) {
      list.forEach(element => {
        element.state = this.searchType
      })
    },
    getTable() {
      GetTable(this.queryForm).then(res => {
        const list = res.data.data
        this.mockTable(list)
        this.tableData = list
        this.total = res.data.total
      })
    },
    getGroupOptions() {
      const params = {}
      GetOptions(params).then(res => {
        this.groupOptions = res.data.data
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
    },
    detail(id) {
      this.detailId = id
      this.detailVisible = true
    },
    giveup(id) {
      this.$message.success('客户已放回公海')
    },
    allot(id) {
      this.$message.success('认领客户成功')
    },
    showGroupName(id) {
      return this.groupOptions.find(ele => ele.id === id)?.name
    },
    showPhone(phone) {
      const result = hidePhone(phone)
      return result
    },
    itstime(time) {
      const now = new Date()
      return now >= time
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar_warp{
  display: flex;
  justify-content: left;
  gap: 10px;

  :nth-child(0), :nth-child(1){
    cursor: pointer;
  }
}

.card_item{
  width:540px;
}

.itstime{
  color: red;
}
</style>
