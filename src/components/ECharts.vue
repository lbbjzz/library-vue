<template>
    <div style="height: 100%" ref="echart">
    </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: {
    chartData: {
      type: Object,
      default () {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options () {
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
    // isCollapse () {
    //   return this.$store.state.tab.isCollapse
    // }
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart()
      },
      deep: true
    }
    // isCollapse () {
    //   setTimeout(() => {
    //     this.resizeChart()
    //   }, 300)
    // }
  },
  data () {
    return {
      echart: null,
      // 有坐标轴
      axisOption: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      },

      // 无坐标轴
      normalOption: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    }
  },
  methods: {
    // 初始化图表
    initChart () {
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    // 信息处理
    initChartData () {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },
    resizeChart () {
      // eslint-disable-next-line no-unused-expressions
      this.echart ? this.echart.resize() : ''
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeChart)
  }
}

</script>

<style lang="scss" scoped></style>
