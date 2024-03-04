<template>
  <div class="form_warp">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
      <el-form-item label="客户分组">
        <el-select v-model="form.groupId" placeholder="请选择分组" filterable>
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>

      </el-form-item>
    </el-form>
    <div class="btn_warp">
      <el-button type="primary" size="default" @click="save">确定</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { GetOptions } from '@/api/group'
import { BatchUpdateGroup } from '@/api/customer'
export default {
  props: {
    customerIdArray: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        groupId: 0

      },
      options: []
    }
  },
  created() {
    this.getOptions()
  },
  methods: {
    getOptions() {
      GetOptions({}).then(res => {
        this.options = res
      })
    },
    save() {
      const params = {
        groupId: this.form.groupId,
        customerIdList: this.customerIdArray
      }

      BatchUpdateGroup(params).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          return
        }

        this.$message.success(res.message)
        this.cancel()
        this.$emit('getTable')
      })
    },
    cancel() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
