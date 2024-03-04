<template>
  <div class="form_warp">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
      <el-form-item label="分组名称" prop="name">
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
import { Add, Update } from '@/api/group'
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        id: this.id,
        name: this.name
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入分组名称' }]
      }
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return
        }

        if (this.form.id > 0) {
          this.update()
        } else {
          this.add()
        }
      })
    },
    cancel() {
      this.$emit('closeDialog')
    },
    add() {
      Add(this.form).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          return
        }

        this.$message.success(res.message)
        this.cancel()
        this.$emit('getTable')
      })
    },
    update() {
      Update(this.form).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          return
        }

        this.$message.success(res.message)
        this.cancel()
        this.$emit('getTable')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_warp{
  margin-top:20px;
}
</style>
