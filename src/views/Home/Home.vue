<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover" style="background-color:#FFFFF0;">
                <div class="user">
                    <img :src="userImg"/>
                    <div class="userinfo">
                        <p class="name">图书借阅管理系统</p>
                        <p class="access">JavaEE实训项目</p>
                    </div>
                </div>
            </el-card>
            <el-card shadow="hover" style="height: 100%; margin-top: 20px">
                <el-table :data="tableData" height="100%" width="100%">
                    <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key"
                                     :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">

            <div class="graph">
                <el-card shadow="hover" style="background-color:#F5FFFA">
<!--                    <echart :chartData="frontData" style="height: 260px" :isAxisChart="false"></echart>-->
                    <div id="frontchartPie" style=" width:100%;height:400px;"></div>
                    <p style="text-align: center;color:#778899">前端项目结构</p>
                </el-card>
                <el-card shadow="hover" style="background-color:#F5FFFA">
                    <!--                    <echart :chartData="frontData" style="height: 260px" :isAxisChart="false"></echart>-->
                    <div id="backchartPie" style=" width:100%;height:400px;"></div>
                    <p style="text-align: center;color:#778899">后端项目结构</p>
                </el-card>
            </div>
            <div class="num" style="margin-top: 60px">
                <el-card shadow="hover" v-for="item in countData" :key="item.value"
                         :body-style="{ display: 'flex', padding: 0 }"
                         style="background-color:#FFFAFA">
                    <img class="icon" :src="item.icon"/>
                    <div class="detail">
                        <p class="txt">{{ item.value }}</p>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
// import Echart from '../../components/ECharts'
import * as echarts from 'echarts'

require('echarts/theme/macarons')
export default {
  components: {
    // Echart
  },
  data () {
    return {
      frontchartPie: null,
      backchartPie: null,
      userImg: require('../../assets/images/user.png'),
      countData: [
        {
          value: '前端开发：刘栋',
          icon: require('../../assets/images/vue.png')
        },
        {
          value: '后端开发：邓贵东',
          icon: require('../../assets/images/spring.png')
        },
        {
          value: '后端开发：余婉瑶',
          icon: require('../../assets/images/spring.png')
        }
      ],
      tableData: [
        {
          function: 'Vue.js',
          source: 'https://cn.vuejs.org/'
        },
        {
          function: 'ElementUI',
          source: 'https://element.eleme.cn/'
        },
        {
          function: 'npm & yarn',
          source: 'https://classic.yarnpkg.com/zh-Hans/docs/migrating-from-npm/'
        },
        {
          function: 'axios',
          source: 'http://www.axios-js.com/zh-cn/docs/'
        },
        {
          function: 'nginx',
          source: 'https://nginx.org/en/'
        },
        {
          function: 'vue-i18n',
          source: 'https://kazupon.github.io/vue-i18n/'
        },
        {
          function: 'Mock.js',
          source: 'http://mockjs.com/'
        },
        {
          function: 'Apache EChart',
          source: 'https://echarts.apache.org/zh/index.html'
        },
        {
          function: 'Vue Router',
          source: 'https://router.vuejs.org/zh/'
        },
        {
          function: 'vue-monoplasty-slide-verify',
          source: 'https://github.com/monoplasty/vue-monoplasty-slide-verify'
        }
      ],
      tableLabel: {
        function: '技术',
        source: '参考资料'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.drawPieChart()
    })
  },
  methods: {
    drawPieChart () {
      const mytextStyle = {
        color: '#333',
        fontSize: 12
      }
      const mylabel = {
        show: true,
        position: 'right',
        offset: [30, 40],
        formatter: '{b} : {c} ({d}%)',
        textStyle: mytextStyle
      }
      this.frontchartPie = echarts.init(document.getElementById('frontchartPie'), 'macarons')
      this.frontchartPie.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{d}%'
        },
        series: [
          {
            type: 'pie',
            // roseType: 'angle',
            data: [
              {
                name: 'Vue',
                value: 80.1
              },
              {
                name: 'JavaScript',
                value: 15.6
              },
              {
                name: 'CSS',
                value: 3.4
              },
              {
                name: 'HTML',
                value: 0.9
              }
            ],
            label: {
              emphasis: mylabel
            }
          }
        ]
      })
      this.backchartPie = echarts.init(document.getElementById('backchartPie'), 'macarons')
      this.backchartPie.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}:{d}%'
        },
        series: [
          {
            type: 'pie',
            roseType: 'angle',
            data: [
              {
                name: 'Java',
                value: 100
              }
              // {
              //   name: 'JavaScript',
              //   value: 14.2
              // },
              // {
              //   name: 'CSS',
              //   value: 0.9
              // }
            ],
            label: {
              emphasis: mylabel
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/home';
</style>
