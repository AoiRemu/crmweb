<template>
  <div class="card_warp">
    <div class="avatar_warp">
      <div class="card_left">
        <el-avatar icon="el-icon-user-solid" :size="72" shape="circle" fit="fill" />
      </div>
      <div class="card_right">
        <div class="avatar_middle">
          <div class="content_item">
            <div class="label">{{ value.name }}</div>
            <div class="content">
              <rate-star v-model="value.level" />
            </div>
          </div>
          <div class="content_item">
            <div class="label">
              <i class="el-icon-phone" />
            </div>
            <div class="content">
              {{ value.phone }}
            </div>
          </div>
        </div>
        <div class="avatar_right">
          <div class="content_item">
            <div class="label">
              <i class="el-icon-s-check" />
            </div>
            <div class="content">
              {{ value.follow_state }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-divider />

    <div class="detail_warp">
      <div class="content_item">
        <div class="label">
          <i class="el-icon-collection-tag" />
        </div>
        <div class="content">
          <el-tag v-for="item in value.tags" :key="item.id" size="mini" effect="dark">{{ item.name }}</el-tag>
        </div>
      </div>
      <div class="content_item">
        <div class="label">
          <i class="el-icon-s-management" />
        </div>
        <div class="content">
          {{ value.qualification }}
        </div>
      </div>
      <div class="content_item follow">
        <div class="label">
          <i class="el-icon-notebook-1" />
        </div>
        <div class="content">
          <Follow :customerid="value.id" :max="3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rateStar from './rateStar.vue'
import Follow from '@/views/customer/follow/index.vue'

export default {
  components: {
    rateStar,
    Follow
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.card_warp{
  opacity: 1;
  // border-radius: 10px;
  // background: rgba(252, 252, 252, 1);
  // box-shadow: 1px 5px 5px 5px rgba(0, 0, 0, 0.25);
  padding: 20px;

  .card_right{
    display: flex;
  }
  .content_item {
    display: flex;
  }

  .avatar_warp{
    display: flex;
    gap: 20px;

    .content_item {
      width: 240px;
      gap: 20px;
      .label{
        font-size: 24px;
        text-align: right;
        width:72px;
      }
    }

    .avatar_middle{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .avatar_right{
      display: flex;
      justify-content: center;
      flex-direction: column;

      .content_item{
        height: fit-content;

        .label{
          font-size: 36px;
          color:rgba(173, 240, 29, 1);
        }

        .content{
          height:fit-content;
          line-height: 3;
        }
      }
    }
  }

  .detail_warp{
    display: flex;
    flex-direction: column;
    gap:20px;

    .content_item{
      gap: 20px;
    }
    .label{
      width: 72px;
      text-align: center;
      font-size: 24px;
      color:#303133;
      flex-shrink:0;
    }

    .content_item.follow{
      .label{
      }
      .content{
        padding-left:10px;
      }
    }
  }
}
</style>
