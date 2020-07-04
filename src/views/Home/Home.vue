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
            <el-card shadow="hover" style="height: 400px; margin-top: 20px">
                <el-table :data="tableData">
                    <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key"
                                     :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">

            <div class="graph">
                <el-card shadow="hover" style="background-color:#F5FFFA">
                    <echart :chartData="frontData" style="height: 260px" :isAxisChart="false"></echart>
                    <p style="text-align: center;color:#778899">前端项目结构</p>
                </el-card>
                <el-card shadow="hover" style="background-color:#F5FFFA">
                    <echart :chartData="frontData" style="height: 260px" :isAxisChart="false"></echart>
                    <p style="text-align: center;color:#778899">后端项目结构</p>
                </el-card>
            </div>
            <div class="num" style="margin-top: 50px">
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
import Echart from '../../components/ECharts'

export default {
  components: {
    Echart
  },
  data () {
    return {
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
          function: 'ES6',
          source: 1
        },
        {
          function: 'ES6',
          source: 1
        },
        {
          function: 'ES6',
          source: 1
        },
        {
          function: 'ES6',
          source: 1
        },
        {
          function: 'ES6',
          source: 1
        }
      ],
      tableLabel: {
        function: '模块',
        source: '参考资料'
      },
      frontData: {
        series: [
          {
            type: 'pie',
            // roseType: 'angle',
            data: [
              {
                value: 235,
                name: '视频广告'
              },
              {
                value: 274,
                name: '联盟广告'
              },
              {
                value: 310,
                name: '邮件营销'
              },
              {
                value: 335,
                name: '直接访问'
              },
              {
                value: 400,
                name: '搜索引擎'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import './src/assets/scss/home';
</style>
