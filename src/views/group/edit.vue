<template>
  <div class="form_warp">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
      <el-form-item label="分组名称">
        <el-input v-model="form.name" placeholder="请输入分组名称" />
      </el-form-item>

    </el-form>
    <div class="btn_warp">
      <el-button type="primary" size="default" @click="save">确定</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        name: ''
      },
      rules: {}
    }
  },
  methods: {
    save() {
      this.$message.success('保存成功')
      this.cancel()
    },
    cancel() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_warp{
  margin-top:20px;
}
</style>
