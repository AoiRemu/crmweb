<template>
  <div class="contract_warp">
    <div class="btn_warp">
      <el-button type="primary" @click="add">新增合同</el-button>
    </div>
    <div v-if="tableData.length === 0">暂无合同</div>
    <el-timeline v-else :reverse="false">
      <el-timeline-item
        v-for="item in tableData"
        :key="item.id"
        :timestamp="item.ctime"
        placement="top"
        type="primary"
        size="normal"
      >
        <el-card shadow="hover">
          <div class="content_warp">
            <div class="title_warp">
              <div>{{ item.accountName }}</div>
              <div>合同状况</div>
            </div>
            <div class="message">{{ item.state }}</div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-dialog
      title="新增合同"
      :visible.sync="visible"
      width="480px"
      append-to-body
      @close="visible = false"
    >
      <Edit :customerid="customerid" @getTable="getTable" @closeDialog="visible = false" />
    </el-dialog>
  </div>
</template>

<script>
import { GetCustomerContract } from '@/api/contract'
import Edit from '@/views/contract/edit.vue'
export default {
  components: {
    Edit
  },
  props: {
    customerid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      queryForm: {
        pageSize: 10,
        pageIndex: 1
      },
      tableData: [],
      total: 0,
      visible: false
    }
  },
  computed: {

  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      this.loading = true
      GetCustomerContract(this.customerid).then(res => {
        if (this.max) {
          this.tableData = res.data.data.slice(0, this.max)
        } else {
          this.tableData = res.data.data
        }
        this.total = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    add() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.contract_warp{
  .btn_warp{
    display: flex;
    justify-content: right;
    margin-bottom: 20px;
  }
  ::v-deep .el-timeline{
    padding-left: 0;
  }
  .content_warp{
    .title_warp{
      display: flex;
      gap: 10px;
      padding:10px 0;
      font-size: 14px;

      :nth-child(1){
        font-weight: bold;
      }

    }
    .message{
      font-size: 16px;
      color: #888383;
    }
  }
}
</style>
