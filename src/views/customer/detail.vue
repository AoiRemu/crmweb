<template>
  <div class="app-container">
    <div class="avatar_warp">
      <el-avatar icon="el-icon-user-solid" :size="72" shape="circle" fit="fill" />
      <div class="avatar_right">
        <div class="customer_name">{{ customerForm.name }}</div>
        <div class="follow_account">
          <span>跟进人：</span>
          <span>{{ customerForm.follow_account }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" tab-position="top" @tab-click="tabChangeHandler">
      <el-tab-pane label="首页" name="home">
        <div class="tag_warp">
          <h5>标签</h5>
          <el-button class="add_tag" size="small" icon="el-icon-plus" @click="addTag" />
          <el-tag v-for="item in tagList" :key="item.id" type="" effect="dark">{{ item.name }}</el-tag>
        </div>
        <div class="follow_state_warp">
          <div class="title_warp">
            <h5>客户进展</h5>
            <div>
              <el-select v-model="customerForm.follow_state" size="small">
                <el-option
                  v-for="item in followStepData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>

            </div>
          </div>
          <el-steps :active="customerForm.follow_state" direction="horizontal" finish-status="success" process-status="wait">
            <el-step
              v-for="item in followStepData"
              :key="item.id"
              :title="item.name"
              @click="setStep(item.id)"
            />
          </el-steps>

        </div>
        <div class="follow_warp">
          <h5>跟进记录</h5>
          <EditFollow ref="EditFollow" :customerid="id" />
          <Follow ref="Follow" :customerid="id" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="客户资料" name="info">
        <Info :id="id" ref="Info" />
      </el-tab-pane>
      <el-tab-pane label="合同状况" name="contract">
        <Contract :customerid="id" />
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="选择标签"
      :visible.sync="tagVisible"
      width="30%"
      append-to-body
      @close="tagVisible = false"
    >
      <AddTag :customer-tags="tagList" @closeDialog="tagVisible = false" />
    </el-dialog>

  </div>
</template>

<script>
import { GetDetail } from '@/api/customer'
import { GetCustomerTags } from '@/api/tag'
import { GetFollowStep } from '@/api/follow'
import Follow from './follow/index.vue'
import EditFollow from './follow/edit.vue'
import Info from './info.vue'
import AddTag from './components/addTag'
import Contract from './components/contract.vue'
export default {
  components: {
    Follow,
    EditFollow,
    Info,
    AddTag,
    Contract
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      activeName: 'home',
      followStepData: [],
      customerForm: {
        name: '',
        gender: 'unknown',
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
        follow_account: '',
        follow_state: 0
      },
      followList: [],
      tagList: [],
      tagVisible: false
    }
  },
  created() {
    this.getDetail()
    this.getTags()
    this.getFollowStep()
  },
  methods: {
    getDetail() {
      GetDetail(this.id).then(res => {
        console.log(res)
        this.customerForm = res.data
      })
    },
    tabChangeHandler(val) {
      console.log(val)
    },
    getTags() {
      GetCustomerTags(this.id).then(res => {
        this.tagList = res.data
      })
    },
    getFollowStep() {
      GetFollowStep().then(res => {
        console.log('GetFollowStep', res.data)
        this.followStepData = res.data
      })
    },
    addTag() {
      this.tagVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
    ::v-deep .el-tabs__content{
        overflow: auto;
        height: calc(100vh - 280px);
        padding: 10px;
    }
}
.avatar_warp{
    display: flex;
    justify-content: left;
    gap: 10px;

    .avatar_right{
        .customer_name {
            font-size: 20px;
            font-weight: bold;
            height: 50%;
            line-height: 3;
        }

        .follow_account{
            font-size: 14px;
            color: #838383;
            line-height: 2;
        }
    }
}

.tag_warp {
    .add_tag{
        margin-right:10px;
        padding: 10px 30px;
    }
}

.follow_state_warp {
    margin-top: 20px;
    .title_warp{
        display: flex;
        justify-content: space-between;

        ::v-deep .el-input__inner{
            width: 160px;
        }
    }
}

.follow_warp{
    padding: 10px;
}

</style>
