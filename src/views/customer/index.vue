<template>
  <div class="app-container">
    <div class="query_warp">
      <div class="nav_warp">
        <el-upload
          ref="upload"
          style="margin-right: 10px;"
          :action="uploadUrl"
          :on-success="handleSuccess"
          :on-error="handleError"
          :auto-upload="true"
          :show-file-list="false"
          :headers="uploadHeader"
          accept=".xlsx"
        >
          <el-button type="primary" size="small" @click="importData">导入客户数据</el-button>
        </el-upload>

        <el-button type="primary" size="small" @click="add">添加客户</el-button>
      </div>
      <div class="query_form">
        <el-form ref="form" :model="queryForm" :rules="rules" label-width="80px" :inline="true" size="normal">
          <el-form-item label="客户名称">
            <el-input v-model="queryForm.name" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item v-if="queryForm.state === 1" label="客户分组">
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
        <el-table-column label="标签" prop="tags">
          <template v-slot="scope">
            <div class="tag_warp">
              <el-tag v-for="item in scope.row.tags" :key="item.id" disable-transitions type="" effect="dark">{{ item.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="客户进展" prop="followState" />
        <el-table-column label="跟进人" prop="followAccount" width="120px" />
        <el-table-column label="下次跟进时间" prop="nextFollowTime">
          <template v-slot="scope">
            <div :class="{ itstime: itstime(scope.row.nextFollowTime) }">
              {{ scope.row.nextFollowTime }}
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
      <Info :id="0" ref="Info" @closeDialog="visible=false" @getTable="getTable" />
    </el-dialog>

    <el-dialog
      title="批量分组"
      :visible.sync="batchVisible"
      width="480px"
      top="50px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="batchVisible = false"
    >
      <BatchGroup ref="Info" :customer-id-array="customerIdArray" @closeDialog="batchVisible=false" @getTable="getTable" />
    </el-dialog>
  </div>
</template>

<script>
import Info from './info.vue'
import { GetTable, GiveUp, Allot, UploadUrl } from '@/api/customer'
import { GetOptions } from '@/api/group'
import Detail from './detail.vue'
import RateStar from '@/components/Customer/rateStar.vue'
import { hidePhone } from '@/utils/common'
import AvatarCard from '@/components/Customer/customerCard.vue'
import BatchGroup from './components/batchGroup'
import { getToken } from '@/utils/auth'
export default {
  components: {
    Info,
    Detail,
    RateStar,
    AvatarCard,
    BatchGroup
  },
  data() {
    return {
      queryForm: {
        name: '',
        groupId: '',
        state: this.$route.params.type ? +this.$route.params.type : '',
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
      detailVisible: false,

      batchVisible: false,
      customerIdArray: [],
      uploadHeader: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  computed: {
    uploadUrl() {
      return UploadUrl
    }

  },
  created() {
    this.getTable()
    this.getGroupOptions()
  },
  mounted() {

  },
  methods: {
    getTable() {
      GetTable(this.queryForm).then(res => {
        const list = res.data
        this.tableData = list
        this.total = res.total
      })
    },
    getGroupOptions() {
      GetOptions({}).then(res => {
        this.groupOptions = res
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
      const selection = this.$refs.table.selection
      if (selection.length === 0) {
        this.$message.warning('请选择要分组的客户')
        return
      }

      this.customerIdArray = selection.map(a => a.id)
      this.batchVisible = true
    },
    detail(id) {
      this.detailId = id
      this.detailVisible = true
    },
    giveup(id) {
      GiveUp(id).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          return
        }
        this.$message.success('客户已放回公海')
        this.getTable()
      })
    },
    allot(id) {
      Allot(id).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          return
        }
        this.$message.success('认领客户成功')
        this.getTable()
      })
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
      return now >= new Date(time)
    },
    handleSuccess(response, file, fileList) {
      if (!response.isSuccess) {
        this.$message.error(response.message)
        return
      }

      this.$message.success(response.message)
      this.getTable()
    },
    handleError(error, file, fileList) {
      this.$message.error(error.toString())
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

.tag_warp{

  ::v-deep .el-tag {
    margin-bottom: 5px;
  }

}
</style>
