<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true" size="small">
      <el-form-item label="" prop="message">
        <el-date-picker
          v-model="form.nextFollowTime"
          type="datetime"
          placeholder="下次跟进时间"
          align="right"
        />

      </el-form-item>
      <el-form-item label="" prop="message">
        <el-input v-model="form.message" :rows="4" type="textarea" placeholder="添加跟进记录" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确定</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { Add } from '@/api/follow'
export default {
  props: {
    customerid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        message: '',
        nextFollowTime: '',
        customerId: this.customerid
      },
      rules: {}
    }
  },
  methods: {
    save() {
      Add(this.form).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          return
        }

        this.$message.success(res.message)
        this.resetForm()
        this.$emit('getFollowTable')
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
      this.form.message = ''
      this.form.nextFollowTime = ''
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner{
}

::v-deep .el-textarea__inner{
  width: 280px;
}
</style>
