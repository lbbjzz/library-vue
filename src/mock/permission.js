export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (username === 'admin' || username === 'user') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                path: '/user',
                name: 'usermanage',
                label: '用户管理',
                icon: 'user',
                url: 'UserManage/Usermanage'
              },
              {
                label: '图书',
                icon: 'reading',
                children: [
                  {
                    path: '/bookmanage',
                    name: 'bookmanage',
                    label: '图书管理',
                    icon: 'reading',
                    url: 'Book/Bookmanage'
                  }
                ]
              }
            ],
            // token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (username === 'user' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                label: '图书',
                icon: 'reading',
                children: [
                  {
                    path: '/bookborrow',
                    name: 'bookborrow',
                    label: '图书借阅',
                    icon: 'setting',
                    url: 'Book/Bookborrow'
                  }
                ]
              },
              {
                path: '/userinfo',
                name: 'userinfo',
                label: '个人中心',
                icon: 'user',
                url: 'UserInfo/UserInfo'
              }
            ],
            // token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
