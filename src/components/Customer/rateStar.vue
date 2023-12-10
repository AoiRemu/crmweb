<template>
  <div class="star_warp">
    <div v-for="(item,index) in starList" :key="key+index" class="star_item" @click="save(index)">
      <i :key="key+item" :class="item == 1 ? lightClass : darkClass" />
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
  created() {
    this.init()
  },
  methods: {
    save(index) {
      if (this.disabled) {
        return
      }

      for (let i = 0; i < this.starList.length; i++) {
        const result = i <= index ? 1 : 0
        this.starList[i] = result
      }
      console.log('starList', this.starList)
      this.$emit('input', index)
      this.key = new Date()
    },
    init() {
      this.starList = new Array(this.count).fill(0)
      for (let index = 0; index < this.value; index++) {
        this.starList[index] = 1
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
    color:rgb(142, 145, 14);
  }
}

</style>
