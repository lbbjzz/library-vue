import Mock from 'mockjs'

// 图表数据
const List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          vue: Mock.Random.float(100, 8000, 0, 2),
          wechat: Mock.Random.float(100, 8000, 0, 2),
          ES6: Mock.Random.float(100, 8000, 0, 2),
          Redis: Mock.Random.float(100, 8000, 0, 2),
          React: Mock.Random.float(100, 8000, 0, 2),
          springboot: Mock.Random.float(100, 8000, 0, 2)
        })
      )
    }
    return {
      code: 20000,
      data: {
        tableData: [
          {
            function: 'ES6',
            source: Mock.Random.float(100, 1000, 0, 2)
          },
          {
            function: 'ES6',
            source: Mock.Random.float(100, 1000, 0, 2)
          },
          {
            function: 'ES6',
            source: Mock.Random.float(100, 1000, 0, 2)
          },
          {
            function: 'ES6',
            source: Mock.Random.float(100, 1000, 0, 2)
          },
          {
            function: 'ES6',
            source: Mock.Random.float(100, 1000, 0, 2)
          }
        ],
        frontData: [
          {
            name: 'Vue',
            value: 74.9
          },
          {
            name: 'JavaScript',
            value: 17.5
          },
          {
            name: 'CSS',
            value: 5.2
          },
          {
            name: 'HTML',
            value: 2.4
          }
        ],
        backData: [
          {
            name: 'Vue',
            value: 74.9
          },
          {
            name: 'JavaScript',
            value: 17.5
          },
          {
            name: 'CSS',
            value: 5.2
          },
          {
            name: 'HTML',
            value: 2.4
          }
        ]
      }
    }
  }
}
