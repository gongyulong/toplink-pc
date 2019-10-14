<template>
  <div>
    <!-- 单独封装一个频道组件 -->
    <el-select @change="optionChange" :value="channelId">
      <el-option
        v-for="(item, index) in channleList"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      channleList: [],
      value: ''
    }
  },
  // 子组件接收父组件参数
  props: ['channelId'],
  methods: {
    // 获取频道数据
    getChannlesList () {
      this.$http({
        url: 'channels',
        method: 'GET'
      }).then(res => {
        this.channleList = res.channels
      })
    },
    // value：改变后的 options 对应的 value
    optionChange (value) {
      // 将 value 交给父组件
      // console.log(value)
      this.$emit('sendMsg', value)
    }
  },
  created () {
    this.getChannlesList()
  }
}
</script>

<style>
</style>
