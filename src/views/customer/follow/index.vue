<template>
  <div class="follow_warp">
    <el-timeline :reverse="false">
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
              <div>{{ item.account }}</div>
              <div>发表了跟进记录</div>
            </div>
            <div class="message">{{ item.message }}</div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { GetFollowTableData } from '@/api/follow'
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
    noMore() {
      return this.tableData.length >= this.total
    },
    disabled() {
      return this.noMore || this.loading
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      this.loading = true
      GetFollowTableData(this.customerid).then(res => {
        this.tableData = res.data.data
        this.total = res.data.total
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.follow_warp{
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
