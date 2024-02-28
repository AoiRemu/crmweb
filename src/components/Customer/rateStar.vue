<template>
  <div class="star_warp">
    <div v-for="(item,index) in starList" :key="key+index" class="star_item" @click="save(index)">
      <i :class="getClass(index)" />
    </div>

  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: Number || String,
      default: 0
    },
    count: {
      type: Number,
      default: 5
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      starList: [],
      lightClass: 'el-icon-star-on',
      darkClass: 'el-icon-star-off',
      key: new Date()
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    getClass(index) {
      if (index < this.value) {
        return this.lightClass
      } else {
        return this.darkClass
      }
    },
    save(index) {
      if (this.disabled) {
        return false
      }
      this.$emit('input', index + 1)
      this.key = new Date()
      if (this.$listeners.save) {
        this.$emit('save')
      }
    },
    init() {
      this.starList = new Array(this.count).fill(false)
      for (let index = 0; index < this.value; index++) {
        this.starList[index] = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.star_warp{
  display: flex;

  .star_item{
    font-size: 24px;
    color:#fadb14;
    cursor: pointer;
  }
}

</style>
