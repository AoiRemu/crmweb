<template>
  <div class="follow_warp">
    <el-timeline :reverse="true">
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
    },
    max: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      queryForm: {
        pageSize: 10,
        pageIndex: 1
      },
      tableData: []
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
      GetFollowTableData(this.customerid).then(res => {
        if (this.max) {
          this.tableData = res.slice(0, this.max)
        } else {
          this.tableData = res
        }
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
