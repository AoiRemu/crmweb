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
              :key="item"
              :label="item"
              :value="item"
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
import { Add } from '@/api/contract'
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
        amount: '',
        signTime: '',
        state: '拟定'
      },
      rules: {},
      activeNames: ['1'],
      stateOptions: ['拟定', '谈判', '已签约', '签约失败', '已放款', '审批未通过', '客户退单']
    }
  },
  created() {
    if (this.id > 0) {
      // this.getInfo()
    }
  },
  methods: {
    save() {
      const param = {
        id: this.customerid,
        ...this.form
      }
      Add(param).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          this.cancel()
        }
      })
    },
    cancel() {
      this.$emit('closeDialog')
    }
    // getInfo() {
    //   GetDetail(this.id).then(res => {
    //     this.form = res.data
    //   })
    // }
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
