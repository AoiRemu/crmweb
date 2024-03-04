<template>
  <div class="app-container">
    <div class="form_warp">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
        <el-form-item label="金额" prop="amount">
          <el-input-number v-model="form.amount" :controls="false" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="签约日期" prop="signTime">
          <el-date-picker
            v-model="form.signTime"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

        </el-form-item>
      </el-form>
      <div class="btn_warp">
        <el-button type="primary" size="default" @click="save">确定</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Add, GetContractOptions, GetDetail, Update } from '@/api/contract'
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    customerid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        customerId: this.customerid,
        amount: '',
        signTime: '',
        state: '拟定'
      },
      rules: {},
      activeNames: ['1'],
      stateOptions: []
    }
  },
  created() {
    if (this.id > 0) {
      this.getInfo()
    }

    this.getStateOptions()
  },
  methods: {
    save() {
      if (this.id > 0) {
        this.update()
      } else {
        this.add()
      }
    },
    add() {
      Add(this.form).then(res => {
        if (res.isSuccess) {
          this.$message.success(res.message)
          this.cancel()
          this.$emit('getTable')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    update() {
      Update(this.form).then(res => {
        if (res.isSuccess) {
          this.$message.success(res.message)
          this.cancel()
          this.$emit('getTable')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cancel() {
      this.$emit('closeDialog')
    },
    getStateOptions() {
      GetContractOptions().then(res => {
        this.stateOptions = res
      })
    },
    getInfo() {
      GetDetail(this.id).then(res => {
        this.form = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_warp{
  margin-top:20px;
}

.app-container ::v-deep .el-input__inner{
  width: 220px;
}
</style>
