<template>
  <div class="app-container">
    <div class="form_warp">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
        <el-collapse v-model="activeNames" :accordion="false">
          <el-collapse-item title="基础信息" name="1">
            <div>
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.main.name" placeholder="请输入客户名称" />
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio v-model="form.main.gender" :label="1">男</el-radio>
                <el-radio v-model="form.main.gender" :label="2">女</el-radio>
                <el-radio v-model="form.main.gender" :label="0">未知</el-radio>
              </el-form-item>
              <el-form-item label="星级" prop="level">
                <RateStar v-model="form.main.level" :disabled="false" />
              </el-form-item>

              <el-form-item label="来源" prop="source">
                <el-input v-model="form.main.source" placeholder="请输入来源" />
              </el-form-item>
              <el-form-item label="分组" prop="groupId">
                <el-select v-model="form.main.groupId" placeholder="请选择客户分组" clearable filterable>
                  <el-option
                    v-for="item in groupOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="微信" prop="wechat">
                <el-input v-model="form.main.wechat" placeholder="请输入微信" />
              </el-form-item>
              <el-form-item label="QQ" prop="qq">
                <el-input v-model="form.main.qq" placeholder="请输入QQ" />
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input v-model="form.main.phone" placeholder="请输入手机" />
              </el-form-item>
              <el-form-item label="座机" prop="telphone">
                <el-input v-model="form.main.telphone" placeholder="请输入座机" />
              </el-form-item>
              <el-form-item label="地区" prop="county">
                <el-input v-model="form.main.county" placeholder="请输入地区" />
              </el-form-item>

              <el-form-item label="地址" prop="address">
                <el-input v-model="form.main.address" placeholder="请输入地址" />
              </el-form-item>
              <el-form-item label="资质" prop="qualification">
                <el-input v-model="form.main.qualification" type="textarea" placeholder="请输入资质" />
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="详细信息" name="2">
            <!-- content -->
            <div>
              <el-form-item label="生日" prop="birthday">
                <el-input v-model="form.info.birthday" placeholder="请输入生日" />
              </el-form-item>
              <el-form-item label="职务" prop="position">
                <el-input v-model="form.info.position" placeholder="请输入职务" />
              </el-form-item>
              <el-form-item label="行业" prop="industry">
                <el-input v-model="form.info.industry" placeholder="请输入行业" />
              </el-form-item>
              <el-form-item label="工作单位" prop="workAddress">
                <el-input v-model="form.info.workAddress" placeholder="请输入工作单位" />
              </el-form-item>
              <el-form-item label="网址" prop="netAddress">
                <el-input v-model="form.info.netAddress" placeholder="请输入网址" />
              </el-form-item>
              <el-form-item label="备注" prop="description">
                <el-input v-model="form.info.description" placeholder="请输入备注" />
              </el-form-item>
            </div>
          </el-collapse-item>
        </el-collapse>

      </el-form>
      <div class="btn_warp">
        <el-button type="primary" size="default" @click="save">确定</el-button>
        <el-button v-if="id === 0" size="default" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { GetDetail, Add, Update } from '@/api/customer'
import RateStar from '@/components/Customer/rateStar.vue'
import { GetOptions } from '@/api/group'
import { GetInfoDetail } from '@/api/customerInfo'
export default {
  components: {
    RateStar
  },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        main: {
          id: '',
          name: '',
          gender: 0,
          level: 0,
          source: '',
          groupId: '',
          wechat: '',
          qq: '',
          phone: '',
          telphone: '',
          email: '',
          county: '',
          address: '',
          qualification: ''
        },
        info: {
          id: '',
          customerId: '',
          birthday: '',
          position: '',
          industry: '',
          workAddress: '',
          netAddress: '',
          description: ''
        }
      },
      rules: {},
      activeNames: ['1'],
      groupOptions: []
    }
  },
  created() {
    this.getGroupOptions()
    if (this.id > 0) {
      this.getInfo()
    }
  },
  methods: {
    save() {
      // this.$refs.form.validate()
      if (this.id > 0) {
        this.update()
      } else {
        this.add()
      }
    },
    add() {
      Add(this.form).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          this.$emit('getTable')
          return
        }
        this.$message.success(res.message)
      })
    },
    update() {
      Update(this.form).then(res => {
        if (!res.isSuccess) {
          this.$message.error(res.message)
          this.$emit('getTable')
          return
        }
        this.$message.success(res.message)
      })
    },
    cancel() {
      this.$emit('closeDialog')
    },
    getInfo() {
      GetDetail(this.id).then(res => {
        this.form.main = res
      })
      GetInfoDetail(this.id).then(res => {
        this.form.info = res
      })
    },
    getGroupOptions() {
      GetOptions({}).then(res => {
        this.groupOptions = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_warp{
  margin-top:20px;
}

::v-deep  .el-select {
  width: 100%;
  .el-input__inner {
    width: 100%;
  }
}

</style>
