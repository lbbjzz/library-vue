import Mock from 'mockjs'
import homeApi from './home'

// 设置延时请求数据
Mock.setup({
  timeout: '200-2000'
})

// 首页相关
// 拦截的是 /home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData())
