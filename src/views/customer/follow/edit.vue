<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true" size="small">
      <el-form-item label="" prop="message">
        <el-date-picker
          v-model="form.next_follow_time"
          type="datetime"
          placeholder="下次跟进时间"
          align="right"
        />

      </el-form-item>
      <el-form-item label="" prop="message">
        <el-input v-model="form.message" placeholder="添加跟进记录" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确定</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
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
        next_follow_time: ''
      },
      rules: {}
    }
  },
  methods: {
    save() {

    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner{
}
</style>
