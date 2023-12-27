<template>
  <div class="app-container">
    <div class="form_warp">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="normal">
        <el-collapse v-model="activeNames" :accordion="false">
          <el-collapse-item title="基础信息" name="1">
            <div>
              <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入客户名称" />
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio v-model="form.gender" label="male">男</el-radio>
                <el-radio v-model="form.gender" label="female">女</el-radio>
                <el-radio v-model="form.gender" label="unknown">未知</el-radio>
              </el-form-item>
              <el-form-item label="星级" prop="level">
                <el-input v-model="form.level" placeholder="请输入星级" />
              </el-form-item>

              <el-form-item label="来源" prop="source">
                <el-input v-model="form.source" placeholder="请输入来源" />
              </el-form-item>
              <el-form-item label="分组" prop="group">
                <el-input v-model="form.group" placeholder="请选择分组" />
              </el-form-item>

              <el-form-item label="微信" prop="wechat">
                <el-input v-model="form.wechat" placeholder="请输入微信" />
              </el-form-item>
              <el-form-item label="QQ" prop="qq">
                <el-input v-model="form.qq" placeholder="请输入QQ" />
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机" />
              </el-form-item>
              <el-form-item label="座机" prop="telphone">
                <el-input v-model="form.telphone" placeholder="请输入座机" />
              </el-form-item>
              <el-form-item label="地区" prop="county">
                <el-input v-model="form.county" placeholder="请输入地区" />
              </el-form-item>

              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入地址" />
              </el-form-item>
              <el-form-item label="资质" prop="qualification">
                <el-input v-model="form.qualification" type="textarea" placeholder="请输入资质" />
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="详细信息" name="2">
            <!-- content -->
            <div>
              <el-form-item label="生日" prop="birthday">
                <el-input v-model="form.birthday" placeholder="请输入生日" />
              </el-form-item>
              <el-form-item label="职务" prop="position">
                <el-input v-model="form.position" placeholder="请输入职务" />
              </el-form-item>
              <el-form-item label="行业" prop="industry">
                <el-input v-model="form.industry" placeholder="请输入行业" />
              </el-form-item>
              <el-form-item label="工作单位" prop="workAddress">
                <el-input v-model="form.workAddress" placeholder="请输入工作单位" />
              </el-form-item>
              <el-form-item label="网址" prop="netAddress">
                <el-input v-model="form.netAddress" placeholder="请输入网址" />
              </el-form-item>
              <el-form-item label="备注" prop="description">
                <el-input v-model="form.description" placeholder="请输入备注" />
              </el-form-item>
            </div>
          </el-collapse-item>
        </el-collapse>

      </el-form>
      <div class="btn_warp">
        <el-button type="primary" size="default" @click="save">确定</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { GetDetail } from '@/api/customer'
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
        name: '',
        gender: 'unknown',
        level: '',
        birthday: '',
        source: '',
        group: '',
        position: '',
        wechat: '',
        qq: '',
        phone: '',
        telphone: '',
        email: '',
        county: '',
        industry: '',
        workAddress: '',
        netAddress: '',
        address: '',
        description: '',
        qualification: ''
      },
      rules: {},
      activeNames: ['1']
    }
  },
  created() {
    if (this.id > 0) {
      this.getInfo()
    }
  },
  methods: {
    save() {

    },
    cancel() {
      this.$emit('closeDialog')
    },
    getInfo() {
      GetDetail(this.id).then(res => {
        this.form = res.data
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
