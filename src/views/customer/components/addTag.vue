<template>
  <div>
    <div class="add_tag_warp">
      <el-checkbox
        v-for="item in tableData"
        :key="item.id"
        v-model="item.isChecked"
        border
        size="small"
        @change="handleChange"
      >{{ item.name }}</el-checkbox>
    </div>
    <div class="btn_warp">
      <el-button type="primary" @click="save">确定</el-button>
      <el-button @click="close">取消</el-button>

    </div>

  </div>
</template>

<script>
import { GetTableData } from '@/api/tag'
import { UpdateCustomerTags } from '@/api/customerTag'
export default {
  props: {
    customerTags: {
      type: Array,
      default: () => []
    },
    customerid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      GetTableData({}).then(res => {
        this.tableData = res.data

        // this.setTagChecked()
      })
    },
    setTagChecked() {
      this.tableData.forEach(ele => {
        if (this.customerTags.find(tag => ele.id === tag.id)) {
          ele.isChecked = true
        } else {
          ele.isChecked = false
        }
      })
    },
    save() {
      const selection = this.tableData.filter(ele => ele.isChecked === true)
      const idList = selection.map(ele => ele.id)
      const params = {
        customerId: this.customerid,
        tagIdList: idList
      }
      UpdateCustomerTags(params).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          return
        }

        this.$message.success(res.message)
        this.$emit('getTagList')
        this.close()
      })
    },
    close() {
      this.$emit('closeDialog')
    },
    handleChange() {
      console.log(this.tableData)
    }
  }
}
</script>

<style lang="scss" scoped>
.add_tag_warp{
  width: 100%;
}
.el-checkbox {
  margin-top: 10px;
  margin-left: 10px;
  width: 180px;
}
.btn_warp{
  margin-top:20px;
  text-align: right;
}
</style>
