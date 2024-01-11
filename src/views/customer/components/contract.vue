<template>
  <div class="contract_warp">
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
  </div>
</template>

<script>
import { GetCustomerContract } from '@/api/contract'
export default {
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
      total: 0
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
    }
  }
}
</script>

<style lang="scss" scoped>
.contract_warp{
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
