<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true" size="small">
      <el-form-item label="" prop="message">
        <el-input v-model="form.message" placeholder="添加跟进记录" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
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
        message: ''
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
    width: 360px;
}
</style>
