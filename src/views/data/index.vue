<template>
  <el-card>
    <div id="container" ref=p>
      <!-- 这是用来渲染 echars -->
    </div>
  </el-card>
</template>

<script>
// 导入 echarts
import echarts from 'echarts'

export default {
  data () {
    return {
      myChart: null
    }
  },
  methods: {
    initEcharts () {
      // 初始化
      this.myChart = echarts.init(this.$refs.p)
      // 设置 echarts 中的属性
      let option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: 'scatter'
          }
        ]
      }
      this.myChart.setOption(option)
    }
  },
  // 页面打开时初始化 echart
  mounted () {
    this.initEcharts()
  }
  // vue 的生命周期的问题；
  //  created: 没有生成 dom 初始化了 data & method
  //  mounted: 可以获取到 dom
}
</script>

<style>
#container {
  width: 100%;
  height: 500px;
  background-color: pink;
}
</style>
